
import { Shield, Key } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div><h1 className="text-h1">Platform Admins</h1><p className="text-muted">Global role management</p></div>
        <button className="btn btn-primary">Invite Admin</button>
      </div>
      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)' }}>User</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)' }}>Global Role</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)' }}>MFA Status</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', textAlign:'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '16px 0', fontWeight: 500 }}>superadmin@bhavishya.demo</td>
              <td style={{ padding: '16px 0' }}><span className="badge badge-accent">SUPER_ADMIN</span></td>
              <td style={{ padding: '16px 0' }}><span className="badge badge-success">Enabled</span></td>
              <td style={{ padding: '16px 0', textAlign:'right' }}><button className="btn btn-secondary" style={{padding:'6px 12px', fontSize:'12px'}}>Edit Access</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}