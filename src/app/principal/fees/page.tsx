
import { Wallet, TrendingUp } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">Finance & Fees</h1><p className="text-muted">Term 2 Collection Overview</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card card-colorful"><div className="text-label" style={{color: 'rgba(255,255,255,0.8)'}}>Collected (Term 2)</div><div className="text-h1" style={{color:'white'}}>₹4.2 Cr</div></div>
        <div className="card"><div className="text-label">Pending Dues</div><div className="text-h1" style={{color:'var(--error)'}}>₹85 L</div></div>
        <div className="card"><div className="text-label">Overdue &gt; 30 Days</div><div className="text-h1" style={{color:'var(--warning)'}}>42 Accounts</div></div>
      </div>
      <div className="card">
        <div className="flex justify-between items-center" style={{marginBottom:'16px'}}>
          <h3 className="text-h3">Recent Transactions</h3>
          <button className="btn btn-secondary">Export CSV</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)' }}>Transaction ID</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)' }}>Student</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)' }}>Amount</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4].map(i => (
              <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px 0', fontWeight: 500 }}>TXN-9{i}28{i}1</td>
                <td style={{ padding: '16px 0' }}>Student {i} (Class 8-A)</td>
                <td style={{ padding: '16px 0', fontWeight: 600 }}>₹15,000</td>
                <td style={{ padding: '16px 0' }}><span className="badge badge-success">Paid</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}