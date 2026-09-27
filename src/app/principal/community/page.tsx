
import { MessageSquare, ShieldAlert } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">Communities & Moderation</h1><p className="text-muted">Oversee school-wide communication</p></div>
      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <h3 className="text-h3">Pending Approvals</h3>
        </div>
        <div className="flex-col gap-4" style={{display:'flex'}}>
          <div style={{padding:'16px', border:'1px solid var(--line)', borderRadius:'8px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:600, marginBottom:'4px'}}>New Post: "Science Fair Project Partner Needed"</div>
              <div className="text-small text-muted">Submitted by Student 5 (Class 9-A) to "Science Club"</div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary" style={{color:'var(--error)'}}>Reject</button>
              <button className="btn btn-primary">Approve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}