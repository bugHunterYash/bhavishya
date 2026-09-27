import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import SidebarClient from './SidebarClient'

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session || session.role !== 'SUPER_ADMIN') redirect('/login')

  return (
    <div className="app-layout">
      <SidebarClient email={session.email} />
      <main className="app-main">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  )
}
