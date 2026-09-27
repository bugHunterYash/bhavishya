
import { MessageSquare } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">Class Discussions</h1><p className="text-muted">Communicate with your students and parents</p></div>
      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <h3 className="text-h3">Class 8-A Group</h3>
          <button className="btn btn-primary">New Post</button>
        </div>
        <div style={{padding:'24px', textAlign:'center', background:'var(--bg)', borderRadius:'8px'}}>
          <p className="text-muted">No recent messages in this group.</p>
        </div>
      </div>
    </div>
  )
}