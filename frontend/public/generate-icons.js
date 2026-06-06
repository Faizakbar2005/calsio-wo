// Jalankan: node generate-icons.js
// Butuh: npm install canvas
// Letakkan di root project, lalu hasilnya pindah ke public/icons/

const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'public', 'icons')
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

function drawIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')
  const s = size

  // Background
  ctx.fillStyle = '#0d1117'
  ctx.beginPath()
  ctx.roundRect(0, 0, s, s, s * 0.18)
  ctx.fill()

  // Hexagon
  ctx.strokeStyle = '#eab308'
  ctx.lineWidth = s * 0.04
  ctx.lineJoin = 'round'
  ctx.beginPath()
  const cx = s / 2, cy = s / 2, r = s * 0.42
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()

  // Lightning bolt
  ctx.fillStyle = '#eab308'
  ctx.beginPath()
  const scale = s / 32
  // M19 8L13 17H17.5L13 24L22 14H17L19 8Z scaled
  ctx.moveTo(19 * scale, 8  * scale)
  ctx.lineTo(13 * scale, 17 * scale)
  ctx.lineTo(17.5 * scale, 17 * scale)
  ctx.lineTo(13 * scale, 24 * scale)
  ctx.lineTo(22 * scale, 14 * scale)
  ctx.lineTo(17 * scale, 14 * scale)
  ctx.closePath()
  ctx.fill()

  return canvas.toBuffer('image/png')
}

;[192, 512].forEach(size => {
  const buf = drawIcon(size)
  const out = path.join(dir, `icon-${size}.png`)
  fs.writeFileSync(out, buf)
  console.log(`✓ Generated ${out}`)
})
