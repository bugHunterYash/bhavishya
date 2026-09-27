'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Book, CalendarCheck, Users, Clock, MessageSquare } from 'lucide-react'

export default function SidebarClient({ email }: { email: string }) {
  const pathname = usePathname()
  
  return (
    <aside className="sidebar-light sidebar">
      <div style={{ marginBottom: '40px', paddingLeft: '8px' }}>
        
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.png" alt="Bhavishya" style={{ height: '28px', objectFit: 'contain' }} />
        <h2 className="text-h2 font-pixel" style={{ color: 'var(--bh-navy)', margin: 0, letterSpacing: '1px', fontSize: '22px' }}>BHAVISHYA</h2>
      </div>
    
        <div className="text-small" style={{ marginTop: '6px', color: 'var(--ink-light)', fontWeight: 500 }}>Teacher Portal</div>
      </div>

      <nav className="flex-col" style={{ flex: 1, gap: '4px' }}>
        <Link href="/teacher" className={`nav-link ${pathname === '/teacher' ? 'active' : ''}`}>
          <Book size={18} className="nav-icon" /> Dashboard
        </Link>
        <Link href="/teacher/classes" className={`nav-link ${pathname === '/teacher/classes' ? 'active' : ''}`}>
          <Users size={18} className="nav-icon" /> My Classes
        </Link>
        <Link href="/teacher/attendance" className={`nav-link ${pathname === '/teacher/attendance' ? 'active' : ''}`}>
          <CalendarCheck size={18} className="nav-icon" /> Attendance
        </Link>
        <Link href="/teacher/timetable" className={`nav-link ${pathname === '/teacher/timetable' ? 'active' : ''}`}>
          <Clock size={18} className="nav-icon" /> Timetable
        </Link>
        <Link href="/teacher/community" className={`nav-link ${pathname === '/teacher/community' ? 'active' : ''}`}>
          <MessageSquare size={18} className="nav-icon" /> Communities
        </Link>
      </nav>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: '24px', marginTop: '24px' }}>
        <div className="text-small" style={{ marginBottom: '16px', paddingLeft: '8px' }}>{email}</div>
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
          </button>
        </form>
      </div>
    </aside>
  )
}
