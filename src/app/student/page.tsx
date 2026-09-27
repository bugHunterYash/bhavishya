import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { Calendar, User, Clock, Award } from 'lucide-react'
import Link from 'next/link'

export default async function StudentDashboard() {
  const session = await getSession()
  if (!session?.userId) return <div>Auth error</div>

  const student = await prisma.student.findFirst({
    where: { userId: session.userId },
    include: {
      class: true,
      attendance: {
        where: { date: { gte: new Date(new Date().setHours(0,0,0,0)) } }
      }
    }
  })

  if (!student) return <div>Student profile not found.</div>

  const isPresent = student.attendance[0]?.status === 'PRESENT'

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h1">Hi, {student.name.split(' ')[0]}</h1>
          <p className="text-muted">Here's your school overview for today.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Today's Status</div>
            <Calendar size={16} color="var(--accent)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            {isPresent ? 'Present' : 'Not marked yet'}
          </div>
          <div className="text-small text-muted">{new Date().toLocaleDateString()}</div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Class</div>
            <User size={16} color="var(--ink)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            {student.class?.name}
          </div>
          <div className="text-small text-muted">Roll No: {student.admissionNo}</div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Next Class</div>
            <Clock size={16} color="var(--warning)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            Science
          </div>
          <div className="text-small text-muted">10:40 AM - Room 302</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Digital ID */}
        <div className="card card-colorful" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={48} color="white" />
          </div>
          <div>
            <h3 className="text-h3" style={{ marginBottom: '4px', color: 'white' }}>{student.name}</h3>
            <div className="text-muted" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.8)' }}>{student.class?.name}</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div className="text-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Admission No</div>
                <div style={{ fontWeight: 500, color: 'white' }}>{student.admissionNo}</div>
              </div>
              <div>
                <div className="text-label" style={{ color: 'rgba(255,255,255,0.8)' }}>DOB</div>
                <div style={{ fontWeight: 500, color: 'white' }}>{student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Widgets */}
        <div className="card">
          <h3 className="text-h3" style={{ marginBottom: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} /> Latest Results
          </h3>
          <p className="text-small" style={{ marginBottom: '12px' }}>Check your recent test scores and report cards.</p>
          <Link href="/student/academics" className="btn btn-secondary" style={{ width: '100%', fontSize: '13px', padding: '6px' }}>View Academics</Link>
        </div>

      </div>

    </div>
  )
}
