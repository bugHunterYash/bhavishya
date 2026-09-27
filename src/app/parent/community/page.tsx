
import { MessageSquare, Bell } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">School Community</h1><p className="text-muted">Announcements and discussions</p></div>
      <div className="card">
        <div className="flex justify-between items-center" style={{borderBottom:'1px solid var(--line)', paddingBottom:'16px', marginBottom:'16px'}}>
          <h3 className="text-h3">Official Announcements</h3>
          <span className="badge badge-primary">2 Unread</span>
        </div>
        <div className="flex-col gap-4" style={{display:'flex'}}>
          <div style={{padding:'16px', background:'var(--primary-light)', borderRadius:'8px'}}>
            <div style={{fontWeight:600, color:'var(--primary)', marginBottom:'4px'}}>Annual Sports Day 2026</div>
            <div className="text-small">Dear Parents, the Annual Sports Day is scheduled for Nov 15th. Please ensure students arrive in their house uniforms.</div>
          </div>
          <div style={{padding:'16px', border:'1px solid var(--line)', borderRadius:'8px'}}>
            <div style={{fontWeight:600, marginBottom:'4px'}}>PTM Schedule Released</div>
            <div className="text-small text-muted">Parent-Teacher meetings will be held virtually this term...</div>
          </div>
        </div>
      </div>
    </div>
  )
}