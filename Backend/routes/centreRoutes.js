const express = require('express');
const { addCentreAndSport, getSportsByCentre,getAllCentres } = require('../controllers/centreController');
const { protect, admin } = require('../middleware/Authentication');
const router = express.Router();

// Route to add a new centre and sports (admin only)
router.post('/add', protect, admin, addCentreAndSport);
router.get('/all', protect, getAllCentres);
router.get('/:centreName/sports', protect, getSportsByCentre);

module.exports = router;