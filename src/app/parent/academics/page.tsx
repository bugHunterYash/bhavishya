'use client'
import { Construction } from 'lucide-react'

export default function Page() {
  return (
    <div className="animate-fade-in flex-col items-center justify-center" style={{ display: 'flex', minHeight: '60vh', textAlign: 'center' }}>
      <div style={{ background: 'var(--primary-light)', padding: '24px', borderRadius: '50%', marginBottom: '24px' }}>
        <Construction size={48} color="var(--primary)" />
      </div>
      <h1 className="text-h1" style={{ marginBottom: '12px' }}>Module Coming Soon</h1>
      <p className="text-muted" style={{ maxWidth: '400px', lineHeight: '1.6' }}>
        This module is currently in development for the full release of Bhavishya. 
        It will feature advanced analytics and real-time syncing.
      </p>
      <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  )
}
