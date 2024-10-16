const express = require('express');
const { getAllBookings, deleteBooking,getUserBookings,createBooking } = require('../controllers/bookingControllers');
const { protect, admin } = require('../middleware/Authentication');
const router = express.Router();

// Route to get all bookings (accessible to both customers and admin)
router.get('/', protect,admin, getAllBookings);
router.delete('/:id', protect, admin, deleteBooking);
router.get('/mybookings', protect, getUserBookings);
router.post('/create', protect, createBooking);

module.exports = router;