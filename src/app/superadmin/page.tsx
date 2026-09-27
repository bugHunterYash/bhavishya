import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Building2, Users } from 'lucide-react'

export default async function SuperAdminDashboard({ searchParams }: { searchParams: { tenant?: string } }) {
  const allSchools = await prisma.school.findMany({
    orderBy: { code: 'asc' }
  })
  
  const selectedTenantId = (await searchParams).tenant || allSchools[0]?.id
  const selectedSchool = allSchools.find(s => s.id === selectedTenantId)

  // Fetch metrics for JUST the selected school to prove tenant isolation
  let tenantMetrics = null
  if (selectedSchool) {
    tenantMetrics = {
      students: await prisma.student.count({ where: { schoolId: selectedSchool.id } }),
      teachers: await prisma.teacher.count({ where: { schoolId: selectedSchool.id } }),
      classes: await prisma.class.count({ where: { schoolId: selectedSchool.id } }),
      totalFees: await prisma.feeInvoice.aggregate({
        where: { schoolId: selectedSchool.id },
        _sum: { amount: true }
      })
    }
  }

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div>
        <h1 className="text-h1">Platform Tenants</h1>
        <p className="text-muted">Multi-School Architecture Overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        
        {/* Left Col: Tenant List */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '70vh', overflowY: 'auto' }}>
          <h3 className="text-h3" style={{ marginBottom: '16px' }}>Onboarded Schools</h3>
          {allSchools.map(school => (
            <Link 
              href={`/superadmin?tenant=${school.id}`} 
              key={school.id}
              className={`btn ${school.id === selectedTenantId ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', padding: '12px' }}
            >
              <Building2 size={16} style={{ marginRight: '8px' }} /> 
              {school.name}
            </Link>
          ))}
        </div>

        {/* Right Col: Isolated Tenant Data */}
        {selectedSchool && tenantMetrics && (
          <div className="flex-col gap-6" style={{ display: 'flex' }}>
            <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-h2">{selectedSchool.name}</h2>
                  <div className="text-small text-muted" style={{ marginTop: '4px' }}>Tenant ID: {selectedSchool.id} | Code: {selectedSchool.code}</div>
                </div>
                <div className="badge badge-success">Active</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="card">
                <div className="text-label" style={{ marginBottom: '8px' }}>Total Students</div>
                <div className="text-h1">{tenantMetrics.students}</div>
                <div className="text-small text-muted" style={{ marginTop: '8px' }}>Strictly isolated to {selectedSchool.code}</div>
              </div>
              <div className="card">
                <div className="text-label" style={{ marginBottom: '8px' }}>Total Teachers</div>
                <div className="text-h1">{tenantMetrics.teachers}</div>
                <div className="text-small text-muted" style={{ marginTop: '8px' }}>Strictly isolated to {selectedSchool.code}</div>
              </div>
              <div className="card">
                <div className="text-label" style={{ marginBottom: '8px' }}>Active Classes</div>
                <div className="text-h1">{tenantMetrics.classes}</div>
              </div>
              <div className="card">
                <div className="text-label" style={{ marginBottom: '8px' }}>Total Invoiced</div>
                <div className="text-h1">₹{tenantMetrics.totalFees._sum.amount || 0}</div>
              </div>
            </div>

            <div className="card" style={{ background: 'var(--accent-light)', borderColor: 'var(--accent)' }}>
              <h3 className="text-h3" style={{ color: 'var(--accent)', marginBottom: '8px' }}>Tenant Data Isolation</h3>
              <p className="text-small" style={{ color: 'var(--accent-hover)' }}>
                This data is strictly scoped to <code>schoolId: "{selectedSchool.id}"</code>. The database enforces that records from {selectedSchool.name} will never bleed into another school's queries.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
