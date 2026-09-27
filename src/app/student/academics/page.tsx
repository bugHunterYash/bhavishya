import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { BookOpen, Award, CheckCircle } from 'lucide-react'

export default async function AcademicsPage() {
  const session = await getSession()
  const student = await prisma.student.findFirst({
    where: { userId: session?.userId },
    include: {
      class: true
    }
  })

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div>
        <h1 className="text-h1">Academics & Results</h1>
        <p className="text-muted">Your performance in {student?.class?.name}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="card card-colorful">
          <div className="text-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Current Term GPA</div>
          <div className="text-h1" style={{ color: 'white', marginTop: '8px' }}>3.8</div>
        </div>
        <div className="card">
          <div className="flex justify-between items-center">
            <div className="text-label">Credits Earned</div>
            <Award size={18} className="nav-icon" />
          </div>
          <div className="text-h1" style={{ marginTop: '8px' }}>24</div>
        </div>
        <div className="card">
          <div className="flex justify-between items-center">
            <div className="text-label">Attendance Rate</div>
            <CheckCircle size={18} className="nav-icon" color="var(--success)" />
          </div>
          <div className="text-h1" style={{ marginTop: '8px' }}>96%</div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-h3" style={{ marginBottom: '16px' }}>Recent Assessments</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500 }}>Subject</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500 }}>Assessment</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '12px 0', color: 'var(--ink-light)', fontWeight: 500, textAlign: 'right' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '16px 0', fontWeight: 500 }}>Mathematics</td>
              <td style={{ padding: '16px 0' }}>Mid-Term Exam</td>
              <td style={{ padding: '16px 0', color: 'var(--ink-light)' }}>Oct 12, 2026</td>
              <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 600, color: 'var(--success)' }}>92/100</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <td style={{ padding: '16px 0', fontWeight: 500 }}>Science</td>
              <td style={{ padding: '16px 0' }}>Lab Project</td>
              <td style={{ padding: '16px 0', color: 'var(--ink-light)' }}>Oct 15, 2026</td>
              <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 600 }}>88/100</td>
            </tr>
            <tr>
              <td style={{ padding: '16px 0', fontWeight: 500 }}>English</td>
              <td style={{ padding: '16px 0' }}>Essay Submissions</td>
              <td style={{ padding: '16px 0', color: 'var(--ink-light)' }}>Oct 18, 2026</td>
              <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 600, color: 'var(--warning)' }}>78/100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
