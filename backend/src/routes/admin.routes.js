/**
 * admin.routes.js
 * Taruh di: backend/src/routes/admin.routes.js
 */

const express  = require('express')
const router   = express.Router()
const jwt      = require('jsonwebtoken')
const bcrypt   = require('bcryptjs')
const { User, History, Admin } = require('../models')

const JWT_SECRET = process.env.JWT_SECRET || 'calsio_secret'

// ─── Middleware: verifikasi admin token ──────────────────────────────────────
function adminAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan' })
  }
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET)
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Bukan admin' })
    req.admin = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token tidak valid atau kadaluarsa' })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/login
// ─────────────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' })
  }

  try {
    const admin = await Admin.findOne({ where: { email } })
    if (!admin) {
      return res.status(401).json({ message: 'Email atau password salah' })
    }

    const match = await bcrypt.compare(password, admin.password)
    if (!match) {
      return res.status(401).json({ message: 'Email atau password salah' })
    }

    const token = jwt.sign(
      { id: admin.id, name: admin.name, email: admin.email, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '8h' }
    )

    return res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role }
    })
  } catch (err) {
    console.error('[Admin] POST /login error:', err.message)
    return res.status(500).json({ message: 'Server error' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/users
// ─────────────────────────────────────────────────────────────────────────────
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { fn, col } = require('sequelize')

    const users = await User.findAll({
      attributes: [
        'id', 'name', 'email',
        [fn('COUNT', col('Histories.id')), 'session_count']
      ],
      include: [{
        model    : History,
        attributes: [],
        required : false,
      }],
      group: ['User.id'],
      order: [['id', 'DESC']],
    })

    return res.json(users)
  } catch (err) {
    console.error('[Admin] GET /users error:', err.message)
    return res.status(500).json({ message: 'Gagal mengambil data user' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/admin/users/:id
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' })

    // Hapus history dulu karena ada foreign key
    await History.destroy({ where: { UserId: id } })
    await User.destroy({ where: { id } })

    return res.json({ message: 'User berhasil dihapus' })
  } catch (err) {
    console.error('[Admin] DELETE /users error:', err.message)
    return res.status(500).json({ message: 'Gagal menghapus user' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/history
// ─────────────────────────────────────────────────────────────────────────────
router.get('/history', adminAuth, async (req, res) => {
  try {
    const history = await History.findAll({
      include: [{
        model     : User,
        attributes: ['email', 'name'],
        required  : false,
      }],
      order: [['createdAt', 'DESC']],
      limit: 500,
    })

    const formatted = history.map(h => ({
      id          : h.id,
      calories    : h.calories,
      duration    : h.duration,
      muscle_group: h.muscle_group || null,
      workout_type: h.workout_type || null,
      UserId      : h.UserId,
      user_email  : h.User?.email || null,
      createdAt   : h.createdAt,
    }))

    return res.json(formatted)
  } catch (err) {
    console.error('[Admin] GET /history error:', err.message)
    return res.status(500).json({ message: 'Gagal mengambil riwayat' })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/admin/history/:id
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/history/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params

    const h = await History.findByPk(id)
    if (!h) return res.status(404).json({ message: 'Riwayat tidak ditemukan' })

    await History.destroy({ where: { id } })
    return res.json({ message: 'Riwayat berhasil dihapus' })
  } catch (err) {
    console.error('[Admin] DELETE /history error:', err.message)
    return res.status(500).json({ message: 'Gagal menghapus riwayat' })
  }
})

module.exports = { router, adminAuth }