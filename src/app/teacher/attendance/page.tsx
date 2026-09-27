
import { CalendarCheck, Save } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div><h1 className="text-h1">Mark Attendance</h1><p className="text-muted">Class 8-A • {new Date().toLocaleDateString()}</p></div>
        <button className="btn btn-primary"><Save size={18} style={{marginRight:'8px'}}/> Submit Attendance</button>
      </div>
      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left', background:'var(--bg)' }}>
              <th style={{ padding: '12px 16px', color: 'var(--ink-light)' }}>Roll No</th>
              <th style={{ padding: '12px 16px', color: 'var(--ink-light)' }}>Student Name</th>
              <th style={{ padding: '12px 16px', color: 'var(--ink-light)', textAlign:'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map(i => (
              <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '12px 16px' }}>ADM{i}</td>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>Student {i}</td>
                <td style={{ padding: '12px 16px', textAlign:'right' }}>
                  <div className="flex justify-end gap-2">
                    <span className="badge badge-success" style={{cursor:'pointer'}}>Present</span>
                    <span className="badge badge-neutral" style={{cursor:'pointer', opacity:0.5}}>Absent</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}