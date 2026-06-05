const { History } = require('../models')

// GET ALL HISTORY — hanya milik user yang login
exports.getAllHistory = async (req, res) => {
  try {
    const userId = req.user?.id  // dari JWT middleware
    if (!userId)
      return res.status(401).json({ message: 'Unauthorized' })

    const history = await History.findAll({
      where: { UserId: userId },        // ← filter per user
      order: [['createdAt', 'ASC']]
    })

    res.json(history)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET STATS — hanya milik user yang login
exports.getStats = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId)
      return res.status(401).json({ message: 'Unauthorized' })

    const totalCalories = await History.sum('calories', {
      where: { UserId: userId }         // ← filter per user
    }) || 0

    const totalSessions = await History.count({
      where: { UserId: userId }         // ← filter per user
    })

    const dailyTarget = 600

    res.json({
      total_calories     : totalCalories,
      total_sessions     : totalSessions,
      daily_target       : dailyTarget,
      progress_percentage: dailyTarget > 0
        ? Math.min((totalCalories / dailyTarget) * 100, 100)
        : 0
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// CREATE HISTORY — simpan dengan UserId + data gerakan
exports.createHistory = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId)
      return res.status(401).json({ message: 'Unauthorized' })

    const { calories, duration, exercise_name, muscle_group, workout_type } = req.body

    const newHistory = await History.create({
      calories,
      duration,
      exercise_name : exercise_name || null,
      muscle_group  : muscle_group  || null,
      workout_type  : workout_type  || null,
      UserId        : userId
    })

    res.status(201).json(newHistory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}