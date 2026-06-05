const express           = require('express')
const router            = express.Router()
const historyController = require('../controllers/history.controller')
const authMiddleware    = require('../middleware/auth.middleware')  // ← tambah ini

// ← tambah authMiddleware di setiap route
router.get('/',       authMiddleware, historyController.getAllHistory)
router.get('/stats',  authMiddleware, historyController.getStats)
router.post('/',      authMiddleware, historyController.createHistory)

module.exports = router