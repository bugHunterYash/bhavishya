
import { Calendar, CheckCircle, Clock } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">Attendance Record</h1><p className="text-muted">Monthly overview for your child</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card card-colorful"><div className="text-label" style={{color: 'rgba(255,255,255,0.8)'}}>Overall Attendance</div><div className="text-h1" style={{color:'white'}}>94%</div></div>
        <div className="card"><div className="flex justify-between"><div className="text-label">Days Present</div><CheckCircle size={18} color="var(--success)"/></div><div className="text-h1">42</div></div>
        <div className="card"><div className="flex justify-between"><div className="text-label">Late Arrivals</div><Clock size={18} color="var(--warning)"/></div><div className="text-h1">1</div></div>
      </div>
      <div className="card">
        <h3 className="text-h3" style={{marginBottom:'16px'}}>Recent History</h3>
        <div className="flex-col gap-3" style={{display:'flex'}}>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex justify-between items-center" style={{padding:'12px', borderBottom:'1px solid var(--line)'}}>
              <div><div style={{fontWeight:500}}>Oct {10 - i}, 2026</div><div className="text-small text-muted">Checked in at 07:55 AM</div></div>
              <span className="badge badge-success">Present</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}