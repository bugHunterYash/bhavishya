
import { Database, Search } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">Audit Logs</h1><p className="text-muted">Immutable system action records</p></div>
      <div className="card">
        <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--line)', marginBottom:'16px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-lighter)' }} />
            <input type="text" placeholder="Search logs or trace IDs..." className="input" style={{ paddingLeft: '40px' }} />
          </div>
        </div>
        <div className="flex-col gap-2" style={{display:'flex'}}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{padding:'12px', background:'var(--bg)', borderRadius:'6px', display:'flex', justifyContent:'space-between', fontFamily:'monospace', fontSize:'13px'}}>
              <div><span style={{color:'var(--primary)'}}>[{new Date().toISOString()}]</span> ACTION: AUTH_LOGIN_SUCCESS | USER: superadmin@bhavishya.demo | IP: 192.168.1.1</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}