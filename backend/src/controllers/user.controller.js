const { User } = require('../models');
const recommendation = require('../services/recommendation.service');

// POST /api/users
exports.createUser = async (req, res) => {
  try {
    const { name, age, weight, height, gender, equipment, experience_level, workout_frequency } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const bmi         = recommendation.calculateBMI(weight, height);
    const bmiCategory = recommendation.getBMICategory(bmi);
    const dailyTarget = gender === 'Male' ? 600 : 450;

    await user.update({
      name, age, weight, height, gender, equipment, bmi,
      daily_target_calories: dailyTarget,
      experience_level : experience_level  ?? 1,  // ✅
      workout_frequency: workout_frequency ?? 3,  // ✅
    });

    res.status(200).json({
      user,
      bmiCategory,
      recommended: recommendation.recommendWorkout(bmiCategory, equipment)
    });

  } catch (error) {
    console.error('❌ createUser error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User belum setup profil' });
    }

    res.json(user);
  } catch (error) {
    console.error('❌ getUser error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { name, age, weight, height, gender, equipment, experience_level, workout_frequency } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const newName      = name               ?? user.name;
    const newWeight    = weight             ?? user.weight;
    const newHeight    = height             ?? user.height;
    const newGender    = gender             ?? user.gender;
    const newAge       = age                ?? user.age;
    const newExpLevel  = experience_level   ?? user.experience_level;   // ✅
    const newFrequency = workout_frequency  ?? user.workout_frequency;  // ✅

    const bmi         = recommendation.calculateBMI(newWeight, newHeight);
    const bmiCategory = recommendation.getBMICategory(bmi);
    const dailyTarget = newGender === 'Male' ? 600 : 450;

    await user.update({
      name     : newName,
      age      : newAge,
      weight   : newWeight,
      height   : newHeight,
      gender   : newGender,
      equipment: equipment ?? user.equipment,
      bmi,
      daily_target_calories: dailyTarget,
      experience_level : newExpLevel,   // ✅
      workout_frequency: newFrequency,  // ✅
    });

    res.json({
      user,
      bmiCategory,
      recommended: recommendation.recommendWorkout(bmiCategory, equipment ?? user.equipment)
    });

  } catch (error) {
    console.error('❌ updateUser error:', error.message);
    res.status(500).json({ message: error.message });
  }
};