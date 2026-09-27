import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { Calendar, Users, BookOpen, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

export default async function TeacherDashboard() {
  const session = await getSession()
  if (!session?.userId) return <div>Auth error</div>

  const teacher = await prisma.teacher.findFirst({
    where: { userId: session.userId },
    include: {
      assignments: {
        include: { class: true, subject: true }
      },
      lessonLogs: {
        take: 3,
        orderBy: { date: 'desc' },
        include: { class: true, subject: true }
      }
    }
  })

  if (!teacher) return <div>Teacher profile not found.</div>

  // Generate a mock timetable based on assignments (since we didn't seed strict timetable entries for every slot)
  const todayClasses = teacher.assignments.map((assign, i) => ({
    id: assign.id,
    period: i + 1,
    time: `10:${i * 40} AM`, // Dummy scheduling logic
    class: assign.class.name,
    subject: assign.subject.name,
    classId: assign.classId
  }))

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      
      <div>
        <h1 className="text-h1">Teacher Dashboard</h1>
        <p className="text-muted">Welcome, {teacher.name}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Assigned Classes</div>
            <Users size={16} color="var(--accent)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            {teacher.assignments.length}
          </div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Next Class</div>
            <Clock size={16} color="var(--warning)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            {todayClasses[0]?.class || 'None'}
          </div>
          <div className="text-small text-muted">{todayClasses[0]?.subject} at {todayClasses[0]?.time}</div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Attendance Pending</div>
            <Calendar size={16} color="var(--error)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px', color: 'var(--error)' }}>
            1 Class
          </div>
          <div className="text-small text-error">Please mark attendance for {todayClasses[0]?.class}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Today's Schedule */}
        <div className="card">
          <h3 className="text-h3" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} /> Today's Schedule
          </h3>
          
          <div className="flex-col gap-3" style={{ display: 'flex' }}>
            {todayClasses.map(tc => (
              <div key={tc.id} className="flex justify-between items-center" style={{ padding: '16px', border: '1px solid var(--line)', borderRadius: '8px' }}>
                <div>
                  <div className="text-label" style={{ marginBottom: '4px' }}>Period {tc.period} • {tc.time}</div>
                  <div style={{ fontWeight: 600 }}>{tc.class} — {tc.subject}</div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Mark Attendance</button>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Add Lesson Log</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Lesson Logs */}
        <div className="card" style={{ alignSelf: 'flex-start' }}>
          <h3 className="text-h3" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} /> Recent Lesson Logs
          </h3>
          
          {teacher.lessonLogs.length > 0 ? (
            <div className="flex-col gap-3" style={{ display: 'flex' }}>
              {teacher.lessonLogs.map(log => (
                <div key={log.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                  <div className="text-small text-muted">{new Date(log.date).toLocaleDateString()} • {log.class.name}</div>
                  <div style={{ fontWeight: 500, fontSize: '14px', marginTop: '4px' }}>{log.subject.name}: {log.topic}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-small text-muted">No recent logs.</div>
          )}
        </div>

      </div>
    </div>
  )
}
