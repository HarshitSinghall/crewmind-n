import http from 'node:http'
import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(process.argv.includes('--dist') ? 'dist' : 'src')
const port = Number(process.env.PORT || 3000)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' }
const server = http.createServer(async (request, response) => {
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (pathname === '/') pathname = '/index.html'
    if (pathname === '/privacy' || pathname === '/terms') pathname += '.html'
    const file = path.resolve(root, '.' + pathname)
    if (!file.startsWith(root + path.sep)) { response.writeHead(403); response.end('Forbidden'); return }
    const content = await fs.readFile(file)
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' })
    response.end(content)
  } catch { response.writeHead(404); response.end('Page not found') }
})
server.listen(port, '127.0.0.1', () => console.log(`CrewMind: http://localhost:${port}`))
