const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'src/app')

const roles = ['student', 'teacher', 'parent', 'principal', 'superadmin']

for (const role of roles) {
  const file = path.join(dir, role, 'SidebarClient.tsx')
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8')
    const target = `<h1 className="text-h2" style={{ marginBottom: '32px', color: 'var(--primary)' }}>BHAVISHYA</h1>`
    const replacement = `
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <img src="/logo.png" alt="Logo" style={{ height: '32px', objectFit: 'contain' }} />
        <h1 className="text-h2" style={{ color: 'var(--primary)', margin: 0 }}>BHAVISHYA</h1>
      </div>
    `
    content = content.replace(target, replacement)
    fs.writeFileSync(file, content)
    console.log('Updated ' + file)
  }
}
