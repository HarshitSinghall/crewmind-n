import fs from 'node:fs/promises'

await fs.mkdir('dist', { recursive: true })
await fs.cp('src', 'dist', { recursive: true })
for (const page of ['index.html', 'privacy.html', 'terms.html']) {
  const html = await fs.readFile(`dist/${page}`, 'utf8')
  if (/https:\/\/(framerusercontent\.com|fonts\.gstatic\.com|events\.framer\.com)/.test(html)) throw new Error(`Remote dependency in ${page}`)
  if (!html.includes('<main')) throw new Error(`Missing page content in ${page}`)
  let output = html
  if (process.env.SITE_URL) {
    const origin = new URL(process.env.SITE_URL).origin
    const route = page === 'index.html' ? '/' : '/' + page.replace('.html', '')
    output = output.replace('</head>', `<link rel="canonical" href="${origin}${route}"><meta property="og:url" content="${origin}${route}"></head>`)
    output = output.replace(/(property="og:image"|name="twitter:image") content="(\/assets\/[^\"]+)"/g, `$1 content="${origin}$2"`)
  }
  if (process.env.PUBLIC_INDEXING === 'true') output = output.replace(/<meta name="robots"[^>]*>/g, '')
  await fs.writeFile(`dist/${page}`, output)
}
console.log('Built CrewMind: /, /privacy, /terms. All fonts, artwork and scripts are local.')
