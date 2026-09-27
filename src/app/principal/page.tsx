import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { Users, UserCheck, AlertTriangle, Wallet, MessageCircle, Bus } from 'lucide-react'
import Link from 'next/link'

export default async function PrincipalDashboard() {
  const session = await getSession()
  if (!session?.schoolId) return <div>School context missing</div>

  const school = await prisma.school.findUnique({
    where: { id: session.schoolId }
  })

  // Fetch real counts based on DB seeded data
  const totalStudents = await prisma.student.count({ where: { schoolId: session.schoolId } })
  const totalTeachers = await prisma.teacher.count({ where: { schoolId: session.schoolId } })

  // Attendance for today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const presentStudents = await prisma.attendance.count({
    where: { schoolId: session.schoolId, date: { gte: today }, status: 'PRESENT' }
  })

  // Fees
  const allInvoices = await prisma.feeInvoice.findMany({
    where: { schoolId: session.schoolId }
  })
  const totalExpected = allInvoices.reduce((sum, i) => sum + i.amount, 0)
  const pendingInvoices = allInvoices.filter(i => i.status === 'PENDING')
  const totalPending = pendingInvoices.reduce((sum, i) => sum + i.amount, 0)

  // Community Issues
  const unresolvedIssues = await prisma.communityPost.findMany({
    where: { community: { schoolId: session.schoolId }, type: 'ISSUE', status: { in: ['OPEN', 'UNDER_REVIEW'] } },
    include: { author: true },
    take: 3
  })

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      
      <div>
        <h1 className="text-h1">School Operations</h1>
        <p className="text-muted">{school?.name} - {new Date().toLocaleDateString()}</p>
      </div>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Student Attendance</div>
            <UserCheck size={16} color="var(--success)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            {presentStudents} <span className="text-muted" style={{ fontSize: '14px', fontWeight: 400 }}>/ {totalStudents}</span>
          </div>
          <div className="text-small text-muted">{Math.round((presentStudents/totalStudents)*100 || 0)}% Present Today</div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Staff Attendance</div>
            <Users size={16} color="var(--ink)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            {totalTeachers} <span className="text-muted" style={{ fontSize: '14px', fontWeight: 400 }}>/ {totalTeachers}</span>
          </div>
          <div className="text-small text-muted">100% Present Today</div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Fee Collection</div>
            <Wallet size={16} color="var(--accent)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            ₹{totalExpected - totalPending}
          </div>
          <div className="text-small text-muted">₹{totalPending} Pending</div>
        </div>

        <div className="card">
          <div className="flex justify-between items-center" style={{ marginBottom: '12px' }}>
            <div className="text-label">Active Transport</div>
            <Bus size={16} color="var(--warning)" />
          </div>
          <div className="text-h2" style={{ marginBottom: '4px' }}>
            3
          </div>
          <div className="text-small text-muted">Buses on Route</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column */}
        <div className="flex-col gap-6" style={{ display: 'flex' }}>
          
          <div className="card">
            <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
              <h3 className="text-h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} color="var(--warning)" /> Recent Operational Alerts
              </h3>
            </div>
            
            <div className="flex-col gap-4" style={{ display: 'flex' }}>
              <div style={{ padding: '12px', background: 'var(--warning-bg)', borderRadius: '8px', borderLeft: '3px solid var(--warning)' }}>
                <div style={{ fontWeight: 600, color: 'var(--warning)', fontSize: '13px' }}>Unusual Absence Rate - Class 9-A</div>
                <div className="text-small" style={{ color: 'var(--warning)' }}>4 students marked absent today. Usually 0-1.</div>
              </div>
              <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', borderLeft: '3px solid var(--ink-light)' }}>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Bus 02 Delayed</div>
                <div className="text-small text-muted">Estimated 10 minutes delay due to traffic on Route B.</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="flex-col gap-4" style={{ display: 'flex' }}>
          
          <div className="card">
            <h3 className="text-h3" style={{ marginBottom: '16px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={16} /> Open Community Issues
            </h3>
            
            {unresolvedIssues.length > 0 ? (
              <div className="flex-col gap-3" style={{ display: 'flex' }}>
                {unresolvedIssues.map(issue => (
                  <div key={issue.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                    <div style={{ fontWeight: 500, fontSize: '13px' }}>{issue.title}</div>
                    <div className="flex justify-between items-center" style={{ marginTop: '4px' }}>
                      <span className="text-small text-muted">By {issue.author.email}</span>
                      <span className={`badge ${issue.status === 'OPEN' ? 'badge-error' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                        {issue.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-small text-muted">No open issues reported.</div>
            )}
          </div>
          
        </div>

      </div>
    </div>
  )
}
