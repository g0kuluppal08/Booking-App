const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/authControllers');
const { protect } = require('../middleware/Authentication');
const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getMe);

module.exports = router;