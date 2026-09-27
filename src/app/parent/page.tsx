import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { AlertCircle, Clock, MapPin, Coffee, CheckCircle, Wallet, FileText, Activity, Users, Bus, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default async function ParentDashboard({ searchParams }: { searchParams: { child?: string } }) {
  const session = await getSession()
  
  const parentUser = await prisma.user.findUnique({
    where: { id: session?.userId },
    include: {
      parents: {
        include: {
          parentStudents: {
            include: {
              student: {
                include: {
                  class: true,
                  attendance: {
                    where: { date: { gte: new Date(new Date().setHours(0,0,0,0)) } }
                  },
                  feeInvoices: {
                    where: { status: 'PENDING' }
                  },
                  cafeteriaTransactions: {
                    take: 1,
                    orderBy: { timestamp: 'desc' }
                  },
                  schoolEvents: {
                    take: 5,
                    orderBy: { occurredAt: 'desc' }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  const parentRecord = parentUser?.parents[0]
  const children = parentRecord?.parentStudents.map(ps => ps.student) || []
  
  const selectedChildId = (await searchParams).child || children[0]?.id
  const child = children.find(c => c.id === selectedChildId)

  if (!child) {
    return <div>No child records found.</div>
  }

  const attendanceToday = child.attendance[0]?.status || 'Not Recorded'
  const isPresent = attendanceToday === 'PRESENT'

  return (
    <div className="animate-fade-in flex-col gap-8" style={{ display: 'flex' }}>
      
      {/* 1. Header & Child Selector */}
      <div className="flex justify-between items-end" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
        <div>
          <div className="text-label font-pixel" style={{ color: 'var(--bh-teal)', fontSize: '13px', marginBottom: '8px' }}>GOOD MORNING, {parentRecord?.name.split(' ')[0].toUpperCase()}</div>
          <h1 className="text-h1" style={{ margin: 0 }}>Dashboard</h1>
        </div>
        
        {children.length > 1 && (
          <div className="flex gap-2">
            {children.map(c => (
              <Link 
                key={c.id} 
                href={`/parent?child=${c.id}`} 
                className={`btn ${c.id === selectedChildId ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '13px' }}
              >
                {c.name.split(' ')[0]}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Important Alerts */}
      {!isPresent && attendanceToday !== 'Not Recorded' && (
        <div style={{ background: 'var(--error-bg)', border: '1px solid var(--error)', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
          <AlertCircle color="var(--error)" size={20} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--error)' }}>Absence Notice</div>
            <div className="text-small" style={{ color: 'var(--error)' }}>{child.name} was marked absent today. Please contact the school if this is unexpected.</div>
          </div>
        </div>
      )}

      {/* Top Status Indicators (No Gradient Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="text-label">Child Status</div>
          <div className="flex items-center gap-2">
            {isPresent ? <CheckCircle size={20} color="var(--success)" /> : <Activity size={20} color="var(--bh-muted)" />}
            <span className="font-pixel" style={{ fontSize: '24px', color: 'var(--ink)' }}>{isPresent ? 'INSIDE SCHOOL' : attendanceToday.toUpperCase()}</span>
          </div>
          <div className="text-small">Last verified: 08:18 AM</div>
        </div>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="text-label">Current Class</div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} color="var(--bh-teal)" />
            <span className="font-pixel" style={{ fontSize: '24px', color: 'var(--ink)' }}>SCIENCE</span>
          </div>
          <div className="text-small">Room 302 • 10:20 – 11:00 AM</div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="card">
        <h3 className="font-pixel" style={{ fontSize: '18px', color: 'var(--bh-navy)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} /> TODAY'S SCHOOL JOURNEY
        </h3>
        
        {child.schoolEvents.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Example of timeline items, replacing the standard map with hardcoded realistic examples for the journey look */}
            
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ width: '60px', textAlign: 'right', fontWeight: 600, color: 'var(--ink)' }}>07:42</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--bh-teal)' }}></div>
                <div style={{ width: '2px', height: '40px', background: 'var(--line)' }}></div>
              </div>
              <div style={{ paddingBottom: '24px' }}>
                <div style={{ fontWeight: 600 }}>Bus boarded</div>
                <div className="text-small text-muted">Route 12 • Home Stop</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ width: '60px', textAlign: 'right', fontWeight: 600, color: 'var(--ink)' }}>08:18</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--bh-teal)' }}></div>
                <div style={{ width: '2px', height: '40px', background: 'var(--line)' }}></div>
              </div>
              <div style={{ paddingBottom: '24px' }}>
                <div style={{ fontWeight: 600 }}>Entered school</div>
                <div className="text-small text-muted">Main Gate • ID verified</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ width: '60px', textAlign: 'right', fontWeight: 600, color: 'var(--ink)' }}>10:40</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'white', border: '2px solid var(--bh-teal)' }}></div>
                <div style={{ width: '2px', height: '40px', background: 'transparent' }}></div>
              </div>
              <div style={{ paddingBottom: '0' }}>
                <div style={{ fontWeight: 600, color: 'var(--bh-teal)' }}>In Class: Science</div>
                <div className="text-small text-muted">Room 302 • Mr. Sharma</div>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="text-muted" style={{ padding: '24px 0' }}>No timeline events recorded yet today.</div>
        )}
      </div>

      {/* Grid of operational panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="text-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Academics</span>
            <FileText size={14} color="var(--bh-muted)" />
          </div>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>Term 1 Results Published</div>
          <Link href="/parent/academics" className="text-small" style={{ color: 'var(--bh-teal)', fontWeight: 600 }}>View Report →</Link>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="text-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Attendance</span>
            <CheckCircle size={14} color="var(--bh-muted)" />
          </div>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>94.2% This Month</div>
          <Link href="/parent/attendance" className="text-small" style={{ color: 'var(--bh-teal)', fontWeight: 600 }}>View Calendar →</Link>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="text-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Transport</span>
            <Bus size={14} color="var(--bh-muted)" />
          </div>
          <div style={{ fontWeight: 600, fontSize: '15px' }}>Route B - In Transit</div>
          <Link href="/parent/transport" className="text-small" style={{ color: 'var(--bh-teal)', fontWeight: 600 }}>Track Bus →</Link>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="text-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Fees</span>
            <Wallet size={14} color="var(--bh-muted)" />
          </div>
          <div style={{ fontWeight: 600, fontSize: '15px', color: child.feeInvoices.length > 0 ? 'var(--bh-gold)' : 'var(--ink)' }}>
            {child.feeInvoices.length > 0 ? `₹${child.feeInvoices.reduce((sum, inv) => sum + inv.amount, 0)} Pending` : 'All caught up'}
          </div>
          <Link href="/parent/fees" className="text-small" style={{ color: 'var(--bh-teal)', fontWeight: 600 }}>View Invoices →</Link>
        </div>
      </div>

    </div>
  )
}
