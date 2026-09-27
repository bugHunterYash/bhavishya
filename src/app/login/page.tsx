'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Building, BookOpen, GraduationCap, Shield, ChevronRight, EyeOff, Book, ShieldCheck, Heart, Sparkles, CalendarCheck, MapPin, Coffee, Lock, Bus } from 'lucide-react'

const demoAccounts = [
  { role: 'Parent', email: 'parent1.school01@bhavishya.demo', icon: Users, desc: "View your child's complete school journey", color: 'var(--bh-teal)' },
  { role: 'Student', email: 'student1.school01@bhavishya.demo', icon: GraduationCap, desc: "Access your classes, timetable and more", color: 'var(--bh-navy)' },
  { role: 'Teacher', email: 'teacher1.school01@bhavishya.demo', icon: BookOpen, desc: "Manage your classes and students", color: 'var(--bh-gold)' },
  { role: 'Principal', email: 'principal.school01@bhavishya.demo', icon: Building, desc: "School administration and oversight", color: '#0ea5e9' },
  { role: 'Super Admin', email: 'superadmin@bhavishya.demo', icon: Shield, desc: "Manage multiple schools", color: '#ef4444' }
]

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleLogin = async (email: string) => {
    setLoading(email)
    setError('')
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        if (data.role === 'PARENT') router.push('/parent')
        else if (data.role === 'PRINCIPAL') router.push('/principal')
        else if (data.role === 'TEACHER') router.push('/teacher')
        else if (data.role === 'STUDENT') router.push('/student')
        else if (data.role === 'SUPER_ADMIN') router.push('/superadmin')
        else router.push('/')
      } else {
        setError(data.error || 'Login failed')
        setLoading(null)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(null)
    }
  }

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', background: 'var(--bh-paper)', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* LEFT SIDE: School Experience (60%) */}
      <div 
        className="hidden-mobile"
        style={{ 
          flex: '6', 
          position: 'relative', 
          overflow: 'hidden',
          backgroundImage: 'url(/login-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRight: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Subtle gradient overlay to ensure text readability */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)', pointerEvents: 'none' }}></div>
        
        {/* Branding & Value Prop */}
        <div style={{ position: 'absolute', top: '48px', left: '64px', zIndex: 10, maxWidth: '420px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <img src="/logo.png" alt="Bhavishya Logo" style={{ height: '48px', objectFit: 'contain' }} />
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, margin: 0, color: 'var(--bh-navy)', letterSpacing: '-0.5px' }}>Bhavishya</h1>
              <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', color: 'var(--bh-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
                Unified School Experience Platform
              </div>
            </div>
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--bh-navy)', lineHeight: 1.3, marginBottom: '24px' }}>
            A calmer way for schools<br/>and families to stay connected.
          </h2>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Book size={20} color="var(--bh-teal)" />
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--bh-navy)', textAlign: 'center', lineHeight: 1.2 }}>Academics<br/>in focus</span>
            </div>
            <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--bh-teal)" />
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--bh-navy)', textAlign: 'center', lineHeight: 1.2 }}>Safer<br/>Journeys</span>
            </div>
            <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Heart size={20} color="var(--bh-teal)" />
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--bh-navy)', textAlign: 'center', lineHeight: 1.2 }}>Happier<br/>Communities</span>
            </div>
            <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--bh-green)" />
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--bh-navy)', textAlign: 'center', lineHeight: 1.2 }}>Brighter<br/>Futures</span>
            </div>
          </div>
        </div>

        {/* Bottom Left: Architectural Typography */}
        <div style={{ position: 'absolute', bottom: '48px', left: '64px', zIndex: 10 }}>
          <div style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: 'rgba(15, 23, 42, 0.7)', fontFamily: 'serif', lineHeight: 1.4 }}>
            Every<br/>Child's<br/>Brighter<br/>Tomorrow
          </div>
        </div>
        
        {/* Subtle Wall Text (simulated via absolute positioning in the top right of the scene) */}
        <div style={{ position: 'absolute', top: '15%', right: '15%', zIndex: 1, opacity: 0.4 }}>
          <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '4px', color: 'var(--bh-navy)', textAlign: 'center', lineHeight: 1.8 }}>
            LEARN<br/>GROW<br/>BELONG
          </div>
        </div>

        {/* FLOATING INFORMATION CARDS */}
        {/* Card 1: Attendance */}
        <div style={{ position: 'absolute', top: '24%', left: '46%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.5)', zIndex: 5 }}>
          <CalendarCheck size={24} color="var(--bh-green)" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--bh-navy)' }}>Attendance</div>
            <div style={{ fontSize: '11px', color: 'var(--bh-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--bh-green)' }}></div> Present today
            </div>
            <div style={{ fontSize: '10px', color: 'var(--bh-muted)' }}>8:18 AM</div>
          </div>
        </div>

        {/* Card 2: Today's Class */}
        <div style={{ position: 'absolute', top: '28%', right: '15%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.5)', zIndex: 5 }}>
          <BookOpen size={20} color="var(--bh-teal)" style={{ marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--bh-navy)' }}>Today's Class</div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--bh-navy)' }}>Science</div>
            <div style={{ fontSize: '10px', color: 'var(--bh-muted)' }}>10:40 AM - 11:20 AM</div>
            <div style={{ fontSize: '10px', color: 'var(--bh-muted)' }}>Room 302</div>
          </div>
        </div>

        {/* Card 3: Safe Journey */}
        <div style={{ position: 'absolute', bottom: '45%', left: '10%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.5)', zIndex: 5 }}>
          <div style={{ background: '#fef3c7', padding: '6px', borderRadius: '8px' }}>
            <Bus size={18} color="var(--bh-gold)" />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--bh-navy)' }}>Safe Journey</div>
            <div style={{ fontSize: '11px', color: 'var(--bh-muted)' }}>Bus on time</div>
            <div style={{ fontSize: '10px', color: 'var(--bh-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={10} color="var(--bh-green)" /> Route 12
            </div>
          </div>
        </div>

        {/* Card 4: Cafeteria */}
        <div style={{ position: 'absolute', bottom: '25%', right: '25%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.5)', zIndex: 5 }}>
          <Coffee size={24} color="var(--bh-gold)" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--bh-navy)' }}>Cafeteria</div>
            <div style={{ fontSize: '11px', color: 'var(--bh-muted)' }}>Healthy choices</div>
            <div style={{ fontSize: '10px', color: 'var(--bh-muted)' }}>Happier students</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form (40%) */}
      <div 
        style={{ 
          flex: '4', 
          minWidth: '450px',
          maxWidth: '600px', 
          background: '#ffffff', 
          display: 'flex', 
          flexDirection: 'column', 
          position: 'relative'
        }}
      >
        {/* Header Options */}
        <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: '12px', color: 'var(--bh-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            India <ChevronRight size={12} style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div style={{ padding: '0 64px 48px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '40px', margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--bh-navy)', marginBottom: '8px', letterSpacing: '-0.5px' }}>Welcome to Bhavishya</h2>
            <p style={{ fontSize: '15px', color: 'var(--bh-muted)' }}>Your school, your child, one connected place.</p>
          </div>

          {error && (
            <div style={{ background: 'var(--error-bg)', color: 'var(--error)', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', marginBottom: '24px', border: '1px solid rgba(220,38,38,0.2)', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin('parent1.school01@bhavishya.demo'); }} style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--bh-navy)', marginBottom: '8px' }}>Email or Institutional ID</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '12px', left: '16px', color: 'var(--bh-muted)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect><polyline points="3 7 12 13 21 7"></polyline></svg>
                </div>
                <input 
                  type="email" 
                  defaultValue="parent1.school01@bhavishya.demo" 
                  disabled 
                  style={{ width: '100%', padding: '12px 16px 12px 44px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '15px', background: '#ffffff', color: 'var(--bh-muted)', outline: 'none' }} 
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--bh-navy)', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '12px', left: '16px', color: 'var(--bh-muted)' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  defaultValue="password" 
                  disabled 
                  style={{ width: '100%', padding: '12px 44px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '15px', background: '#ffffff', color: 'var(--bh-muted)', outline: 'none' }} 
                />
                <div style={{ position: 'absolute', top: '12px', right: '16px', color: 'var(--bh-muted)', cursor: 'not-allowed' }}>
                  <EyeOff size={18} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--bh-navy)' }}>
                <input type="checkbox" defaultChecked style={{ width: '16px', height: '16px', accentColor: 'var(--bh-navy)' }} />
                Remember me
              </label>
              <a href="#" style={{ fontSize: '13px', color: 'var(--bh-navy)', fontWeight: 600 }}>Forgot password?</a>
            </div>

            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: 'var(--bh-navy)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '15px', 
                fontWeight: 600, 
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s',
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
              }} 
              disabled={loading !== null}
            >
              {loading ? 'Authenticating...' : 'Sign in securely'} <ChevronRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
            <div style={{ fontSize: '11px', color: 'var(--bh-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Or Explore Demo Accounts</div>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }}></div>
          </div>
          
          {/* Demo Roles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
            {demoAccounts.map(acc => {
              const Icon = acc.icon
              const isLoading = loading === acc.email
              return (
                <button
                  key={acc.email}
                  onClick={() => handleLogin(acc.email)}
                  disabled={loading !== null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: '#ffffff',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                    opacity: loading && !isLoading ? 0.5 : 1,
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.borderColor = 'var(--bh-navy)'
                      e.currentTarget.style.background = '#f8fafc'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.borderColor = 'var(--line)'
                      e.currentTarget.style.background = '#ffffff'
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ color: acc.color }}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--bh-navy)', fontSize: '14px' }}>{acc.role}</div>
                      <div style={{ fontSize: '12px', color: 'var(--bh-muted)' }}>{acc.desc}</div>
                    </div>
                  </div>
                  {isLoading ? (
                    <span className="font-pixel" style={{ fontSize: '12px', color: 'var(--bh-teal)' }}>...</span>
                  ) : (
                    <ChevronRight size={16} color="var(--bh-muted)" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '12px', color: 'var(--bh-muted)' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ margin: '0 12px', color: 'var(--line)' }}>|</span>
            <span style={{ cursor: 'pointer' }}>Help & Support</span>
            <span style={{ margin: '0 12px', color: 'var(--line)' }}>|</span>
            <span style={{ cursor: 'pointer' }}>Contact Us</span>
          </div>

        </div>

        {/* Decorative corner pixels (Subtle Bhavishya identity) */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '4px', flexWrap: 'wrap', width: '24px', opacity: 0.2 }}>
          <div style={{ width: '6px', height: '6px', background: 'var(--bh-teal)' }}></div>
          <div style={{ width: '6px', height: '6px', background: 'transparent' }}></div>
          <div style={{ width: '6px', height: '6px', background: 'var(--bh-navy)' }}></div>
          <div style={{ width: '6px', height: '6px', background: 'var(--bh-gold)' }}></div>
        </div>
      </div>
      
      {/* Mobile hidden class */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
        }
      `}} />
    </div>
  )
}
