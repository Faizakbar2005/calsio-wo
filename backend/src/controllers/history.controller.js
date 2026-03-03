const { History } = require('../models')

/*
  GET ALL HISTORY
*/
exports.getAllHistory = async (req, res) => {
  try {
    const history = await History.findAll({
      order: [['createdAt', 'ASC']]
    })

    res.json(history)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


/*
  GET STATS FOR DASHBOARD
*/
exports.getStats = async (req, res) => {
  try {

    const totalCalories = await History.sum('calories') || 0
    const totalSessions = await History.count()

    // Default target harian (nanti bisa ambil dari User)
    const dailyTarget = 600

    res.json({
      total_calories: totalCalories,
      total_sessions: totalSessions,
      daily_target: dailyTarget,
      progress_percentage:
        dailyTarget > 0
          ? Math.min((totalCalories / dailyTarget) * 100, 100)
          : 0
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


/*
  CREATE HISTORY (Simpan Workout)
*/
exports.createHistory = async (req, res) => {
  try {
    const { calories, duration } = req.body

    const newHistory = await History.create({
      calories,
      duration
    })

    res.status(201).json(newHistory)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}