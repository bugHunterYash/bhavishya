import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { Clock, User, Calendar as CalendarIcon, PlayCircle, Users } from 'lucide-react'

export default async function TeacherTimetablePage() {
  const session = await getSession()
  if (!session?.schoolId) return <div>Auth Error</div>
  
  const teacher = await prisma.teacher.findFirst({
    where: { userId: session?.userId },
  })

  // Get current day name (e.g. "Monday")
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const displayDay = ['Saturday', 'Sunday'].includes(today) ? 'Monday' : today

  const dbSchedule = await prisma.timetableEntry.findMany({
    where: { 
      schoolId: session.schoolId,
      teacherId: teacher?.id as string,
      day: displayDay
    },
    include: {
      subject: true,
      class: true
    },
    orderBy: {
      startTime: 'asc'
    }
  }) as any[]

  let schedule: any[] = []
  
  if (dbSchedule.length > 0) {
    let idCounter = 1;
    // Map DB schedule to UI format, inserting breaks manually for demo
    schedule = dbSchedule.map((entry, index) => {
      let status = 'UPCOMING'
      if (index === 0 || index === 1) status = 'COMPLETED'
      if (index === 2) status = 'ONGOING'
      
      let periodName = `${index + 1}th Period`
      if (index === 0) periodName = '1st Period'
      if (index === 1) periodName = '2nd Period'
      if (index === 2) periodName = '3rd Period'

      return {
        id: idCounter++,
        period: periodName,
        time: `${entry.startTime} - ${entry.endTime}`,
        subject: entry.subject.name,
        class: entry.class.name,
        room: `Room 30${index + 1}`, // mock room
        status: status
      }
    })
    
    // Insert breaks for visual completeness if there are enough classes
    if (schedule.length > 2) {
      schedule.splice(2, 0, { id: 99, period: 'Break', time: '09:30 AM - 09:45 AM', subject: 'Staff Room Break', class: '-', room: 'Staff Room', status: 'COMPLETED' })
    }
    if (schedule.length > 5) {
      schedule.splice(5, 0, { id: 100, period: 'Lunch Break', time: '11:15 AM - 12:00 PM', subject: 'Lunch', class: '-', room: 'Cafeteria', status: 'UPCOMING' })
    }
  } else {
    // Fallback Mocking timetable data for the demo
    schedule = [
      { id: 1, period: '1st Period', time: '08:00 AM - 08:45 AM', subject: 'Mathematics', class: 'Class 8-A', room: 'Room 302', status: 'COMPLETED' },
      { id: 2, period: '2nd Period', time: '08:45 AM - 09:30 AM', subject: 'Mathematics', class: 'Class 9-B', room: 'Room 305', status: 'COMPLETED' },
      { id: 3, period: 'Break', time: '09:30 AM - 09:45 AM', subject: 'Staff Room Break', class: '-', room: 'Staff Room', status: 'COMPLETED' },
      { id: 4, period: '3rd Period', time: '09:45 AM - 10:30 AM', subject: 'Advanced Math', class: 'Class 10-A', room: 'Room 401', status: 'ONGOING' },
      { id: 5, period: '4th Period', time: '10:30 AM - 11:15 AM', subject: 'Free Period', class: '-', room: 'Staff Room', status: 'UPCOMING' },
      { id: 6, period: 'Lunch Break', time: '11:15 AM - 12:00 PM', subject: 'Lunch', class: '-', room: 'Cafeteria', status: 'UPCOMING' },
      { id: 7, period: '5th Period', time: '12:00 PM - 12:45 PM', subject: 'Mathematics', class: 'Class 8-C', room: 'Room 308', status: 'UPCOMING' }
    ]
  }

  const currentClass = schedule.find(s => s.status === 'ONGOING')

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div>
        <h1 className="text-h1">Teaching Schedule</h1>
        <p className="text-muted">Your classes for today</p>
      </div>

      {currentClass && (
        <div className="card card-colorful" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}>
            <PlayCircle size={150} />
          </div>
          
          <div className="text-label" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%', marginRight: '8px', animation: 'pulse 2s infinite' }} />
            Happening Now
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', position: 'relative', zIndex: 1 }}>
            <div>
              <div className="text-small" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>Subject</div>
              <h2 className="text-h1" style={{ color: 'white', marginBottom: '12px' }}>{currentClass.subject}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
                <Users size={16} />
                <span style={{ fontWeight: 500 }}>{currentClass.class} • {currentClass.room}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '24px' }}>
              <div className="text-small" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>{currentClass.period}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '16px' }}>
                <Clock size={16} />
                <span style={{ fontWeight: 600, fontSize: '18px' }}>{currentClass.time}</span>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                  <span>Time Elapsed</span>
                  <span>15 mins left</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '65%', background: 'white', borderRadius: '10px' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
              100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
            }
          `}} />
        </div>
      )}

      <div className="card">
        <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
          <h3 className="text-h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon size={18} /> Full Day Schedule
          </h3>
          <div className="text-small text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        </div>

        <div className="flex-col" style={{ display: 'flex' }}>
          {schedule.map((item, index) => (
            <div key={item.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '16px', 
              borderBottom: index === schedule.length - 1 ? 'none' : '1px solid var(--line)',
              background: item.status === 'ONGOING' ? 'var(--primary-light)' : 'transparent',
              borderRadius: item.status === 'ONGOING' ? '8px' : '0'
            }}>
              <div style={{ width: '120px', flexShrink: 0 }}>
                <div style={{ fontWeight: 600, color: item.status === 'ONGOING' ? 'var(--primary)' : 'var(--ink)' }}>{item.time.split(' - ')[0]}</div>
                <div className="text-small" style={{ color: 'var(--ink-light)' }}>{item.time.split(' - ')[1]}</div>
              </div>
              
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '4px', 
                  height: '40px', 
                  background: item.status === 'COMPLETED' ? 'var(--success)' : item.status === 'ONGOING' ? 'var(--primary)' : 'var(--line)',
                  borderRadius: '4px'
                }} />
                
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: item.status === 'ONGOING' ? 'var(--primary)' : 'var(--ink)' }}>{item.subject}</div>
                  <div className="text-small" style={{ color: 'var(--ink-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.class !== '-' && <Users size={12} />} {item.class} • {item.room}
                  </div>
                </div>
                
                <div style={{ textAlign: 'right', width: '100px' }}>
                  <div className="text-small" style={{ fontWeight: 500, color: 'var(--ink-lighter)' }}>{item.period}</div>
                  {item.status === 'ONGOING' && (
                    <span className="badge badge-primary" style={{ marginTop: '4px', fontSize: '11px', padding: '2px 8px' }}>NOW</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}