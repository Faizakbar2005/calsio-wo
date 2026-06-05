// routes/ragRoutes.js
const express             = require('express')
const router              = express.Router()
const { Op }              = require('sequelize')
const authMiddleware      = require('../middleware/auth.middleware') // sesuaikan path
const { History, User }   = require('../models')
const { ask, askPersonal, isPersonalQuery } = require('../services/ragService')  // sesuaikan path

// ─────────────────────────────────────────
// POST /api/rag/chat
// ─────────────────────────────────────────
router.post('/chat', authMiddleware, async (req, res) => {
    console.log('req.user:', req.user)
  const { query } = req.body
  const userId    = req.user.id
  console.log('userId:', userId)

  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Query tidak boleh kosong.' })
  }

  try {
    // Ambil profil user untuk konteks kalori personal
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'weight', 'height', 'age', 'gender', 'equipment']
    })

    const userProfile = user ? {
      weight: user.weight,
      height: user.height,
      age   : user.age,
      goal  : user.equipment || 'umum'
    } : null

    let result

    if (isPersonalQuery(query.trim())) {
      // ── Personal query: sertakan history 30 hari ─────
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      const histories = await History.findAll({
        where: {
          UserId   : userId,
          createdAt: { [Op.gte]: thirtyDaysAgo }
        },
        order     : [['createdAt', 'DESC']],
        limit     : 200,
        attributes: ['id', 'calories', 'duration', 'exercise_name', 'muscle_group', 'workout_type', 'createdAt']
      })

      result = await askPersonal(query.trim(), histories.map(h => h.toJSON()), { userProfile })

    } else {
      // ── Query umum: dokumen fitness saja ─────────────
      result = await ask(query.trim(), { userProfile })
    }

    return res.json(result)

  } catch (err) {
    console.error('[RAG Chat Error]', err.message)
    return res.status(500).json({ error: 'Gagal memproses pertanyaan. Coba lagi.' })
  }
})

module.exports = router