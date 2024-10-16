const Booking = require('../models/bookingModel');
const Court = require('../models/courtModel');
const Centre = require('../models/centerModel');
const Sport = require('../models/sportModel');
const User = require('../models/userModel');

// @desc    Get all bookings with optional filtering by court and sport
// @route   GET /api/bookings
const getAllBookings = async (req, res) => {
    try {
      // Get optional filters from query params
      const { centre, sport } = req.query;
      
      // Create a filter object
      let filter = {};
  
      // Filter by centre if provided
      if (centre) {
        const centreObj = await Centre.findOne({ name: centre });
        if (centreObj) {
          const courtsForCentre = await Court.find({ centre: centreObj._id });
          const courtIds = courtsForCentre.map((court) => court._id);
          filter.court = { $in: courtIds };
        } else {
          return res.status(404).json({ message: 'Centre not found' });
        }
      }
  
      // Filter by sport if provided
      if (sport) {
        const sportObj = await Sport.findOne({ name: sport });
        if (sportObj) {
          const courtsForSport = await Court.find({ sport: sportObj._id });
          const courtIds = courtsForSport.map((court) => court._id);
          filter.court = { $in: courtIds };
        } else {
          return res.status(404).json({ message: 'Sport not found' });
        }
      }
  
      // Fetch bookings based on the filters
      const bookings = await Booking.find(filter)
        .populate({
          path: 'court',
          populate: [
            { path: 'sport', select: 'name' },
            { path: 'centre', select: 'name' },
          ],
        })
        .populate('customer', 'name email');
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
      }
  
      res.status(200).json(
        bookings.map((booking) => ({
          _id: booking._id,
          user: {
            name: booking.customer.name,
            email: booking.customer.email,
          },
          centre: booking.court.centre.name,
          sport: booking.court.sport.name,
          court: booking.court.name,
          startTime: booking.startTime,
          endTime: booking.endTime,
          date: booking.date,
          price: booking.court.price,
        }))
      );
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    
    try {
      const booking = await Booking.findById(bookingId);
     
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      await booking.deleteOne();
      console.log(booking);
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  const getUserBookings = async (req, res) => {
    try {
      // Find bookings made by the logged-in user
      const bookings = await Booking.find({ customer: req.user._id })
        .populate({
          path: 'court',
          populate: [
            { path: 'sport', select: 'name' },
            { path: 'centre', select: 'name' },
          ],
        })
        .populate('customer', 'name email');
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      // Return the bookings with all the necessary details
      res.status(200).json(
        bookings.map((booking) => ({
          _id: booking._id,
          user: {
            name: booking.customer.name,
            email: booking.customer.email,
          },
          centre: booking.court.centre.name,
          sport: booking.court.sport.name,
          court: booking.court.name,
          startTime: booking.startTime,
          endTime: booking.endTime,
          date: booking.date,
          price: booking.court.price,
        }))
      );
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  const createBooking = async (req, res) => {
    const { courtId, date, startTime, endTime, centre, city, price } = req.body;
  
    try {
      // Check if the court exists
      const court = await Court.findById(courtId);
      if (!court) {
        return res.status(404).json({ message: 'Court not found' });
      }
  
      // Check for conflicting bookings
      const conflictingBooking = await Booking.findOne({
        court: court._id,
        date: new Date(date),
        $or: [
          { startTime: { $lt: endTime, $gte: startTime } }, // Conflicting booking with overlapping times
          { endTime: { $gt: startTime, $lte: endTime } },   // Conflicting booking with overlapping times
        ],
      });
  
      if (conflictingBooking) {
        return res.status(400).json({ message: 'Court is already booked for the selected time' });
      }
  
      // Create the new booking
      const booking = new Booking({
        court: court._id,
        customer: req.user._id, // Assuming customer is the logged-in user
        date: new Date(date),
        startTime,
        endTime,
        price,
      });
  
      await booking.save();
  
      res.status(201).json({
        message: 'Booking created successfully',
        booking: {
          _id: booking._id,
          court: court.name,
          centre,
          city,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          price: booking.price,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
module.exports = {
  getAllBookings,deleteBooking,getUserBookings,createBooking
};