const express = require('express');
const { addCourt,showAvailableCourts } = require('../controllers/courtController');
const { protect, admin } = require('../middleware/Authentication');
const router = express.Router();

// Route to add a new court (admin only)
router.post('/add', protect, admin, addCourt);
router.post('/showcourt', protect, showAvailableCourts);

module.exports = router;