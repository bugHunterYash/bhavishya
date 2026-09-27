'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Globe, Shield, Database } from 'lucide-react'

export default function SidebarClient({ email }: { email: string }) {
  const pathname = usePathname()
  
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '40px', paddingLeft: '8px' }}>
        
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.png" alt="Bhavishya" style={{ height: '28px', objectFit: 'contain' }} />
        <h2 className="text-h2 font-pixel" style={{ color: 'var(--bh-navy)', margin: 0, letterSpacing: '1px', fontSize: '22px' }}>BHAVISHYA</h2>
      </div>
    
        <div className="text-small" style={{ marginTop: '6px', color: 'var(--ink-lighter)', fontWeight: 500 }}>Super Admin Console</div>
      </div>

      <nav className="flex-col" style={{ flex: 1, gap: '4px' }}>
        <Link href="/superadmin" className={`nav-link ${pathname === '/superadmin' ? 'active' : ''}`}>
          <Globe size={18} className="nav-icon" /> Tenants (Schools)
        </Link>
        <Link href="/superadmin/users" className={`nav-link ${pathname === '/superadmin/users' ? 'active' : ''}`}>
          <Shield size={18} className="nav-icon" /> Platform Admins
        </Link>
        <Link href="/superadmin/audit" className={`nav-link ${pathname === '/superadmin/audit' ? 'active' : ''}`}>
          <Database size={18} className="nav-icon" /> Audit Logs
        </Link>
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '24px' }}>
        <div className="text-small" style={{ marginBottom: '16px', paddingLeft: '8px', color: 'var(--ink-lighter)' }}>{email}</div>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
          </button>
        </form>
      </div>
    </aside>
  )
}
