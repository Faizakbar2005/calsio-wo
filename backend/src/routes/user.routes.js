const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware'); // sesuaikan path-nya

router.post('/',   authMiddleware, createUser);
router.get('/',    authMiddleware, getUser);
router.put('/:id', authMiddleware, updateUser);

module.exports = router;