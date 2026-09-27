'use client'

import { Bus, MapPin, Clock, Phone } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the map component with SSR disabled
const LiveMap = dynamic(() => import('@/components/LiveMap'), { 
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--line)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' }}></div>
        Loading interactive map...
      </div>
    </div>
  )
})

export default function Page() {
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div>
        <h1 className="text-h1">Live Transport</h1>
        <p className="text-muted">Real-time GPS tracking for your child's school bus</p>
      </div>
      
      <div className="card card-colorful" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="text-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Current Status</div>
          <h2 className="text-h2" style={{ color: 'white' }}>In Transit (Morning Pickup)</h2>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: '50%' }}>
          <Bus size={32} color="white" />
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden', height: '450px', display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, background: 'white', position: 'relative' }}>
            <h3 className="text-h3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={20} color="var(--primary)" /> Live GPS Map
            </h3>
            <div className="badge badge-success">GPS Active</div>
          </div>
          
          <div style={{ flex: 1, position: 'relative', background: '#f8fafc', zIndex: 1 }}>
            {/* The actual leaflet map */}
            <LiveMap />
          </div>
        </div>

        <div className="card">
          <h3 className="text-h3" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bus size={20} color="var(--primary)" /> Route Details
          </h3>
          <div className="flex-col gap-6" style={{ display: 'flex' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ background: 'var(--primary-light)', padding: '10px', borderRadius: '8px' }}>
                <Clock size={20} color="var(--primary)" />
              </div>
              <div>
                <div className="text-small text-muted">Estimated Arrival (Home)</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>07:45 AM</div>
                <div className="text-small" style={{ color: 'var(--success)' }}>On Time</div>
              </div>
            </div>
            
            <div style={{ height: '1px', background: 'var(--line)' }}></div>
            
            <div>
              <div className="text-small text-muted" style={{ marginBottom: '4px' }}>Bus Registration</div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>Route B - WB-12-X-3456</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-hover)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--line)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" alt="Driver" style={{ width: '32px', height: '32px' }} />
                </div>
                <div>
                  <div className="text-small text-muted">Driver</div>
                  <div style={{ fontWeight: 600 }}>Rajesh Kumar</div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%' }}>
                <Phone size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  )
}