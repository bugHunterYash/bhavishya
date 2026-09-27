const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'src/app')
const roles = ['student', 'teacher', 'parent', 'principal', 'superadmin']

for (const role of roles) {
  const file = path.join(dir, role, 'SidebarClient.tsx')
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8')
    // We will use regex to replace the BHAVISHYA h2 element completely
    content = content.replace(/<h2 className="text-h2"[^>]*>BHAVISHYA<\/h2>/g, `
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.png" alt="Bhavishya" style={{ height: '28px', objectFit: 'contain' }} />
        <h2 className="text-h2" style={{ color: 'var(--primary)', margin: 0, letterSpacing: '-0.5px' }}>BHAVISHYA</h2>
      </div>
    `)
    fs.writeFileSync(file, content)
    console.log('Fixed logo in ' + file)
  }
}
