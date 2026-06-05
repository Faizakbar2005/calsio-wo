const express = require('express');
const router = express.Router();

// Placeholder — tambahkan controller nanti
router.get('/', (req, res) => {
  res.json({ message: 'Workout route aktif' });
});

module.exports = router;