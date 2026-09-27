import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { UserCircle } from 'lucide-react'

export default async function Page() {
  const session = await getSession()
  const student = await prisma.student.findFirst({
    where: { userId: session?.userId },
    include: {
      school: true,
      class: true,
    }
  })

  if (!student) {
    return <div>No student profile found.</div>
  }

  // Create a payload for the QR code
  const qrData = encodeURIComponent(JSON.stringify({
    id: student.id,
    name: student.name,
    admissionNo: student.admissionNo,
    school: student.school.name
  }))

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}&color=0f172a`

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div>
        <h1 className="text-h1">Digital ID</h1>
        <p className="text-muted">Your official school identification</p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {/* Real-looking ID Card */}
        <div style={{
          width: '320px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          border: '1px solid var(--line)',
          position: 'relative'
        }}>
          
          {/* Lanyard Clip Hole at top */}
          <div style={{ position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '8px', background: 'var(--bg-hover)', borderRadius: '10px', border: '1px solid var(--line)' }}></div>

          {/* Header - School Branding */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            padding: '32px 20px 20px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <img src="/logo.png" alt="School Logo" style={{ height: '32px', filter: 'brightness(0) invert(1)' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
              {student.school.name}
            </h3>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>Student Identity Card</div>
          </div>

          {/* Body - Student Info */}
          <div style={{ padding: '24px', textAlign: 'center', position: 'relative' }}>
            {/* Profile Photo */}
            <div style={{
              width: '100px',
              height: '100px',
              background: '#f8fafc',
              borderRadius: '50%',
              margin: '-60px auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid white',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <UserCircle size={56} color="var(--ink-lighter)" />
            </div>

            <h2 className="text-h2" style={{ margin: '0 0 4px 0', fontSize: '22px' }}>{student.name}</h2>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '15px', marginBottom: '20px' }}>
              {student.class ? `Class ${student.class.name}` : 'No Class Assigned'}
            </div>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left', background: 'var(--bg-hover)', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--ink-lighter)', textTransform: 'uppercase', fontWeight: 600 }}>Admission No</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>{student.admissionNo}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--ink-lighter)', textTransform: 'uppercase', fontWeight: 600 }}>D.O.B</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)' }}>
                  {student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>

            {/* Real QR Code */}
            <div style={{ margin: '0 auto 12px', padding: '12px', background: 'white', border: '1px solid var(--line)', borderRadius: '12px', display: 'inline-block' }}>
              <img src={qrCodeUrl} alt="Student QR Code" style={{ width: '100px', height: '100px', display: 'block' }} />
            </div>
            
            <div style={{ fontSize: '11px', color: 'var(--ink-light)' }}>
              Scan to verify identity
            </div>
          </div>

          {/* Footer */}
          <div style={{ background: 'var(--ink)', color: 'white', textAlign: 'center', padding: '10px', fontSize: '11px', fontWeight: 500 }}>
            Valid for {student.class?.academicYear || 'Current Year'}
          </div>
        </div>
      </div>
    </div>
  )
}