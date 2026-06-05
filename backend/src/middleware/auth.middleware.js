const jwt  = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'calsio_secret_key'

module.exports = (req, res, next) => {
  const header = req.headers['authorization']
  if (!header)
    return res.status(401).json({ message: 'Token tidak ditemukan' })

  const token = header.split(' ')[1]
  if (!token)
    return res.status(401).json({ message: 'Format token salah' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token tidak valid atau sudah expired' })
  }
}