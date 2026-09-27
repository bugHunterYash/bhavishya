'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, LayoutDashboard, Users, BookOpen, Wallet, Bus, MessageSquare } from 'lucide-react'

export default function SidebarClient({ email }: { email: string }) {
  const pathname = usePathname()
  
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '40px', paddingLeft: '8px' }}>
        
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.png" alt="Bhavishya" style={{ height: '28px', objectFit: 'contain' }} />
        <h2 className="text-h2 font-pixel" style={{ color: 'var(--bh-navy)', margin: 0, letterSpacing: '1px', fontSize: '22px' }}>BHAVISHYA</h2>
      </div>
    
        <div className="text-small" style={{ marginTop: '6px', color: 'var(--ink-lighter)', fontWeight: 500 }}>Principal Operations</div>
      </div>

      <nav className="flex-col" style={{ flex: 1, gap: '4px' }}>
        <Link href="/principal" className={`nav-link ${pathname === '/principal' ? 'active' : ''}`}>
          <LayoutDashboard size={18} className="nav-icon" /> Overview
        </Link>
        <Link href="/principal/students" className={`nav-link ${pathname === '/principal/students' ? 'active' : ''}`}>
          <Users size={18} className="nav-icon" /> Students & Staff
        </Link>
        <Link href="/principal/attendance" className={`nav-link ${pathname === '/principal/attendance' ? 'active' : ''}`}>
          <BookOpen size={18} className="nav-icon" /> Attendance
        </Link>
        <Link href="/principal/fees" className={`nav-link ${pathname === '/principal/fees' ? 'active' : ''}`}>
          <Wallet size={18} className="nav-icon" /> Fees & Finance
        </Link>
        <Link href="/principal/transport" className={`nav-link ${pathname === '/principal/transport' ? 'active' : ''}`}>
          <Bus size={18} className="nav-icon" /> Transport
        </Link>
        <Link href="/principal/community" className={`nav-link ${pathname === '/principal/community' ? 'active' : ''}`}>
          <MessageSquare size={18} className="nav-icon" /> Communities
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
