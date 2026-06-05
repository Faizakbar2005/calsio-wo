const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const { User } = require('../models')

const JWT_SECRET = process.env.JWT_SECRET || 'calsio_secret_key'

// ── Helper: buat token ─────────────────────────────────────
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// ── Helper: hitung BMI ─────────────────────────────────────
function calcBmi(weight, height) {
  if (!weight || !height) return null
  const h = height > 10 ? height / 100 : height   // terima cm atau meter
  return parseFloat((weight / (h * h)).toFixed(2))
}

// ── Register ───────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Semua field wajib diisi' })

    const existing = await User.findOne({ where: { email } })
    if (existing)
      return res.status(409).json({ message: 'Email sudah terdaftar' })

    const hashed = await bcrypt.hash(password, 10)
    const user   = await User.create({ name, email, password: hashed })

    const token = generateToken(user)

    return res.status(201).json({
      message: 'Akun berhasil dibuat',
      token,
      user: {
        id    : user.id,
        name  : user.name,
        email : user.email,
        age   : user.age,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        bmi   : user.bmi,
        daily_target_calories: user.daily_target_calories,
      }
    })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// ── Login ──────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Email dan password wajib diisi' })

    const user = await User.findOne({ where: { email } })
    if (!user)
      return res.status(404).json({ message: 'Akun tidak ditemukan' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
      return res.status(401).json({ message: 'Email atau password salah' })

    const token = generateToken(user)

    return res.json({
      message: 'Login berhasil',
      token,
      user: {
        id    : user.id,
        name  : user.name,
        email : user.email,
        age   : user.age,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        bmi   : user.bmi,
        daily_target_calories: user.daily_target_calories,
      }
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}