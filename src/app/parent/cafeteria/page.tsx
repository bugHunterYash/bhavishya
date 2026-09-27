
import { Coffee, CreditCard } from 'lucide-react'
export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div><h1 className="text-h1">Cafeteria Card</h1><p className="text-muted">Manage daily meal limits and transactions</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        <div className="card card-colorful">
          <div className="text-label" style={{color: 'rgba(255,255,255,0.8)'}}>Card Balance</div>
          <div className="text-h1" style={{color:'white'}}>₹1,250</div>
          <button className="btn" style={{background:'rgba(255,255,255,0.2)', color:'white', marginTop:'16px'}}>Top Up Balance</button>
        </div>
        <div className="card">
          <div className="text-label text-muted">Daily Limit</div>
          <div className="text-h1">₹150</div>
          <div className="text-small text-muted" style={{marginTop:'16px'}}>Remaining today: ₹90</div>
        </div>
      </div>
      <div className="card">
        <h3 className="text-h3" style={{marginBottom:'16px'}}>Recent Purchases</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {['Veg Sandwich (₹60)', 'Apple Juice (₹40)', 'Pasta Bowl (₹120)', 'Muffin (₹30)'].map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '16px 0', fontWeight: 500 }}><Coffee size={14} style={{marginRight:'8px', display:'inline', opacity:0.5}}/>{item}</td>
                <td style={{ padding: '16px 0', color: 'var(--ink-light)', textAlign:'right' }}>Oct {9 - i}, 2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}