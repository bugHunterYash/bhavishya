
import { Bus, AlertCircle } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">Transport Fleet</h1><p className="text-muted">Live bus tracking and compliance</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="card"><div className="text-label">Active Buses</div><div className="text-h2">12 / 14</div></div>
        <div className="card"><div className="text-label">Delayed</div><div className="text-h2" style={{color:'var(--warning)'}}>1</div></div>
        <div className="card"><div className="text-label">Maintenance</div><div className="text-h2">2</div></div>
        <div className="card"><div className="text-label">RTO Compliance</div><div className="text-h2" style={{color:'var(--success)'}}>100%</div></div>
      </div>
      <div className="card">
        <h3 className="text-h3" style={{marginBottom:'16px'}}>Live Route Status</h3>
        <div className="flex-col gap-3" style={{display:'flex'}}>
          <div className="flex justify-between items-center" style={{padding:'16px', background:'var(--warning-bg)', borderRadius:'8px'}}>
            <div><div style={{fontWeight:600, color:'var(--warning)'}}>Route 4 - City Center (WB04)</div><div className="text-small" style={{color:'var(--warning)'}}>Delayed by 15 mins (Heavy Traffic)</div></div>
            <button className="btn" style={{background:'white', color:'var(--warning)', border:'1px solid var(--warning)'}}>Notify Parents</button>
          </div>
          <div className="flex justify-between items-center" style={{padding:'16px', border:'1px solid var(--line)', borderRadius:'8px'}}>
            <div><div style={{fontWeight:600}}>Route 1 - North Park (WB01)</div><div className="text-small text-muted">On Time • Approaching Stop 3</div></div>
            <span className="badge badge-success">Healthy</span>
          </div>
        </div>
      </div>
    </div>
  )
}