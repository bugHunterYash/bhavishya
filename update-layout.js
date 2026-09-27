const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'src/app')
const roles = ['student', 'teacher', 'parent', 'principal', 'superadmin']

for (const role of roles) {
  const file = path.join(dir, role, 'layout.tsx')
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8')
    content = content.replace(/<div style=\{\{ display: 'flex', minHeight: '100vh' \}\}>/g, '<div className="app-layout">')
    content = content.replace(/<main style=\{\{ flex: 1, padding: '40px', overflowY: 'auto' \}\}>/g, '<main className="app-main">')
    fs.writeFileSync(file, content)
    console.log('Updated ' + file)
  }
}
