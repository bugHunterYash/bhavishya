import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { CheckCircle2, XCircle, Clock, Calendar as CalendarIcon, Info } from 'lucide-react'

export default async function StudentAttendancePage() {
  const session = await getSession()
  const student = await prisma.student.findFirst({
    where: { userId: session?.userId },
  })

  // We will generate a mock attendance calendar for the current month
  // Since we might not have a full month of data seeded, a generated array is best for demo.
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  const currentDay = new Date().getDate()
  
  const calendarData = Array.from({ length: daysInMonth }).map((_, i) => {
    const day = i + 1
    if (day > currentDay) return { day, status: 'FUTURE' }
    
    // Randomize some absences for the demo, but mostly present
    const isWeekend = (new Date(new Date().getFullYear(), new Date().getMonth(), day).getDay() % 6 === 0)
    if (isWeekend) return { day, status: 'HOLIDAY' }
    
    const isAbsent = Math.random() > 0.9
    const isLate = Math.random() > 0.85 && !isAbsent
    
    return { day, status: isAbsent ? 'ABSENT' : isLate ? 'LATE' : 'PRESENT' }
  })

  const totalPresent = calendarData.filter(d => d.status === 'PRESENT' || d.status === 'LATE').length
  const totalDays = calendarData.filter(d => d.status !== 'FUTURE' && d.status !== 'HOLIDAY').length
  const percentage = Math.round((totalPresent / (totalDays || 1)) * 100)

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div>
        <h1 className="text-h1">My Attendance</h1>
        <p className="text-muted">Track your daily presence for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '12px' }}>
            <CalendarIcon size={24} color="var(--primary)" />
          </div>
          <div>
            <div className="text-small">Overall Attendance</div>
            <h2 className="text-h1" style={{ fontSize: '28px' }}>{percentage}%</h2>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--success)' }}>
          <div style={{ background: 'var(--success-bg)', padding: '12px', borderRadius: '12px' }}>
            <CheckCircle2 size={24} color="var(--success)" />
          </div>
          <div>
            <div className="text-small">Days Present</div>
            <h2 className="text-h1" style={{ fontSize: '28px' }}>{totalPresent}</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--error)' }}>
          <div style={{ background: 'var(--error-bg)', padding: '12px', borderRadius: '12px' }}>
            <XCircle size={24} color="var(--error)" />
          </div>
          <div>
            <div className="text-small">Days Absent</div>
            <h2 className="text-h1" style={{ fontSize: '28px' }}>{calendarData.filter(d => d.status === 'ABSENT').length}</h2>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-h3" style={{ marginBottom: '24px' }}>Monthly Calendar</h3>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--success)' }}></div><span className="text-small">Present</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--error)' }}></div><span className="text-small">Absent</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--warning)' }}></div><span className="text-small">Late</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--bg-hover)', border: '1px solid var(--line)' }}></div><span className="text-small">Holiday</span></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '8px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-label" style={{ padding: '8px' }}>{d}</div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {/* Empty cells for padding start of month */}
          {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }).map((_, i) => (
            <div key={`empty-\${i}`} style={{ padding: '24px 8px', background: 'transparent' }}></div>
          ))}
          
          {calendarData.map(d => {
            let bg = 'var(--bg-hover)'
            let color = 'var(--ink)'
            let border = '1px solid var(--line)'
            
            if (d.status === 'PRESENT') { bg = 'var(--success-bg)'; color = 'var(--success)'; border = '1px solid var(--success-bg)' }
            else if (d.status === 'ABSENT') { bg = 'var(--error-bg)'; color = 'var(--error)'; border = '1px solid var(--error-bg)' }
            else if (d.status === 'LATE') { bg = 'var(--warning-bg)'; color = 'var(--warning)'; border = '1px solid var(--warning-bg)' }
            else if (d.status === 'HOLIDAY') { bg = 'var(--bg-hover)'; color = 'var(--ink-lighter)'; border = '1px dashed var(--line)' }
            else if (d.status === 'FUTURE') { bg = 'transparent'; color = 'var(--ink-lighter)'; border = '1px dashed var(--line)' }
            
            return (
              <div key={d.day} style={{ 
                padding: '16px 8px', 
                background: bg, 
                color: color, 
                border: border,
                borderRadius: '8px', 
                fontWeight: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60px',
                opacity: d.status === 'FUTURE' ? 0.3 : 1
              }}>
                {d.day}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}