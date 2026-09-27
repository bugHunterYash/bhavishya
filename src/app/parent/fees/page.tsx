import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { Receipt, Wallet, AlertCircle } from 'lucide-react'

export default async function FeesPage() {
  const session = await getSession()
  
  const parent = await prisma.parent.findFirst({
    where: { userId: session?.userId },
    include: {
      parentStudents: {
        include: {
          student: {
            include: {
              feeInvoices: true
            }
          }
        }
      }
    }
  })

  const child = parent?.parentStudents[0]?.student
  const invoices = child?.feeInvoices || []

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div>
        <h1 className="text-h1">Fee Management</h1>
        <p className="text-muted">Invoices and payment history for {child?.name}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card">
          <div className="text-label">Total Outstanding</div>
          <div className="text-h1" style={{ color: 'var(--error)', marginTop: '8px' }}>
            ₹{invoices.filter(i => i.status === 'PENDING').reduce((acc, i) => acc + i.amount, 0)}
          </div>
        </div>
        <div className="card card-colorful">
          <div className="text-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Next Due Date</div>
          <div className="text-h1" style={{ color: 'white', marginTop: '8px' }}>Oct 31, 2026</div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ width: '100%' }}><Wallet size={18} style={{ marginRight: '8px' }}/> Pay Now</button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-h3" style={{ marginBottom: '16px' }}>Invoice History</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500 }}>Invoice ID</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500 }}>Amount</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500, textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px 0', fontWeight: 500 }}>INV-{inv.id.substring(0,6).toUpperCase()}</td>
                <td style={{ padding: '16px 0', color: 'var(--ink-light)' }}>{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td style={{ padding: '16px 0', fontWeight: 500 }}>₹{inv.amount}</td>
                <td style={{ padding: '16px 0', textAlign: 'right' }}>
                  <span className={`badge ${inv.status === 'PENDING' ? 'badge-error' : 'badge-success'}`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
