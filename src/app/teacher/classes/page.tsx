
import { Users, FileText } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">My Classes</h1><p className="text-muted">Manage your assigned sections</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {['Class 8-A (Mathematics)', 'Class 9-A (Mathematics)'].map((cls, i) => (
          <div key={i} className="card">
            <h3 className="text-h3" style={{marginBottom:'4px'}}>{cls}</h3>
            <div className="text-small text-muted" style={{marginBottom:'16px'}}>42 Students Enrolled</div>
            <div className="flex gap-2">
              <button className="btn btn-primary" style={{flex:1}}>View Students</button>
              <button className="btn btn-secondary" style={{flex:1}}>Assignments</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}