import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { Search, UserPlus } from 'lucide-react'

export default async function StudentsPage() {
  const session = await getSession()
  if (!session?.schoolId) return <div>Auth Error</div>
  
  const students = await prisma.student.findMany({
    where: { schoolId: session.schoolId },
    include: {
      class: true
    },
    take: 10
  })

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h1">Students & Staff</h1>
          <p className="text-muted">Manage school directory and profiles</p>
        </div>
        <button className="btn btn-primary"><UserPlus size={18} style={{ marginRight: '8px' }}/> Add New</button>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-lighter)' }} />
            <input type="text" placeholder="Search by name or admission no..." className="input" style={{ paddingLeft: '40px' }} />
          </div>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left', background: 'var(--bg-hover)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--ink-light)', fontWeight: 600, fontSize: '13px' }}>Student Name</th>
              <th style={{ padding: '16px 24px', color: 'var(--ink-light)', fontWeight: 600, fontSize: '13px' }}>Admission No</th>
              <th style={{ padding: '16px 24px', color: 'var(--ink-light)', fontWeight: 600, fontSize: '13px' }}>Class</th>
              <th style={{ padding: '16px 24px', color: 'var(--ink-light)', fontWeight: 600, fontSize: '13px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(st => (
              <tr key={st.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{st.name}</td>
                <td style={{ padding: '16px 24px', color: 'var(--ink-light)' }}>{st.admissionNo}</td>
                <td style={{ padding: '16px 24px' }}>{st.class?.name || 'N/A'}</td>
                <td style={{ padding: '16px 24px' }}><span className="badge badge-success">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
