const express = require('express')
const router = express.Router()
const historyController = require('../controllers/history.controller')

router.get('/', historyController.getAllHistory)
router.get('/stats', historyController.getStats)
router.post('/', historyController.createHistory)

module.exports = router