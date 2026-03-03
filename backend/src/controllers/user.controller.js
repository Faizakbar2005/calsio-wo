const { User } = require('../models');
const recommendation = require('../services/recommendation.service');

exports.createUser = async (req, res) => {
  try {
    const { weight, height, gender, equipment } = req.body;

    const bmi = recommendation.calculateBMI(weight, height);
    const bmiCategory = recommendation.getBMICategory(bmi);
    const dailyTarget = gender === "Male" ? 600 : 450;

    const user = await User.create({
      weight,
      height,
      gender,
      equipment,
      bmi,
      daily_target_calories: dailyTarget
    });

    res.status(201).json({
      user,
      bmiCategory,
      recommended: recommendation.recommendWorkout(bmiCategory, equipment)
    });

  } catch (error) {
    console.error('❌ createUser error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      order: [['createdAt', 'DESC']]
    });

    if (!user) {
      return res.status(404).json({ message: 'User belum setup profil' });
    }

    res.json(user);
  } catch (error) {
    console.error('❌ getUser error:', error.message);
    res.status(500).json({ message: error.message });
  }
};