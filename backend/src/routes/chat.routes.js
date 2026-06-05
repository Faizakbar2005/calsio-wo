/**
 * chatRoutes.js
 * 
 * Daftarkan di app.js:
 *   const chatRoutes = require('./routes/chatRoutes')
 *   app.use('/api/chat', chatRoutes)
 *
 * Endpoint:
 *   POST /api/chat       → tanya chatbot (dengan/tanpa auth)
 */

const express        = require('express')
const router         = express.Router()
const { chat }       = require('../controllers/chat.controller')

// Middleware auth opsional — sesuaikan dengan sistem JWT kamu
// Kalau belum ada auth, hapus baris optionalAuth dan pakai langsung
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null
      return next()
    }
    const token = authHeader.split(' ')[1]
    const jwt   = require('jsonwebtoken')
    req.user    = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    req.user = null  // token invalid → lanjut tanpa user ctx
  }
  next()
}

// POST /api/chat
// Body: { query: string, history?: [{role, text}], userId?: number }
router.post('/', optionalAuth, chat)

module.exports = router