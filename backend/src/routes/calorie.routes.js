const express = require('express');
const router  = express.Router();
const { predictCalories } = require('../controllers/calorie.controller');

// POST /api/calories/predict
router.post('/predict', predictCalories);

module.exports = router;