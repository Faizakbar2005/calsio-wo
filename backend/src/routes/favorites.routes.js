const express = require('express')
const router  = express.Router()
const { Favorite } = require('../models')

// GET /api/favorites
router.get('/', async (req, res) => {
  try {
    const rows = await Favorite.findAll({
      order: [['created_at', 'DESC']],
    })
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/favorites
router.post('/', async (req, res) => {
  const { exercise_name } = req.body
  if (!exercise_name) return res.status(400).json({ error: 'exercise_name required' })
  try {
    const [row] = await Favorite.findOrCreate({
      where: { exercise_name },
    })
    res.status(201).json(row)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/favorites/:name
router.delete('/:name', async (req, res) => {
  const exercise_name = decodeURIComponent(req.params.name)
  try {
    await Favorite.destroy({ where: { exercise_name } })
    res.json({ deleted: true, exercise_name })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router