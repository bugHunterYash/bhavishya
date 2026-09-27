
import { Users, AlertTriangle } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">School Attendance</h1><p className="text-muted">Live daily campus check-ins</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card card-colorful"><div className="text-label" style={{color: 'rgba(255,255,255,0.8)'}}>Overall Rate</div><div className="text-h1" style={{color:'white'}}>92%</div></div>
        <div className="card"><div className="text-label">Absent Students</div><div className="text-h1" style={{color:'var(--error)'}}>48</div></div>
        <div className="card"><div className="text-label">Teachers on Leave</div><div className="text-h1" style={{color:'var(--warning)'}}>3</div></div>
      </div>
      <div className="card">
        <h3 className="text-h3" style={{marginBottom:'16px'}}><AlertTriangle size={18} style={{display:'inline', marginRight:'8px'}} color="var(--error)"/> Classes below 85% attendance</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {['Class 9-B (81%)', 'Class 10-A (84%)'].map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px 0', fontWeight: 600, color:'var(--error)' }}>{item}</td>
                <td style={{ padding: '16px 0', textAlign:'right' }}><button className="btn btn-secondary" style={{padding:'6px 12px', fontSize:'12px'}}>Notify Teacher</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}