const Court = require('../models/courtModel');
const Centre = require('../models/centerModel');
const Sport = require('../models/sportModel');
const Booking = require('../models/bookingModel');

const addCourt = async (req, res) => {
    const { centre, sport, name, price } = req.body;
  
    try {
      // Validate that the centre exists
      const centreObj = await Centre.findOne({ name: centre });
      if (!centreObj) {
        return res.status(404).json({ message: 'Centre not found' });
      }
  
      // Validate that the sport exists for the specified centre
      const sportObj = await Sport.findOne({ name: sport, center: centreObj._id });
      if (!sportObj) {
        return res.status(404).json({ message: 'Sport not found for this centre' });
      }
  
      // Ensure that a court with the same name does not already exist for the centre and sport
      const existingCourt = await Court.findOne({ name, sport: sportObj._id, centre: centreObj._id });
      if (existingCourt) {
        return res.status(400).json({ message: 'Court with this name already exists for the specified centre and sport' });
      }
  
      // Create and save the new court
      const court = await Court.create({
        name,
        sport: sportObj._id,
        centre: centreObj._id,
        price,
      });
  
      // Push the new court's ID into the Sport model's courts array
      sportObj.courts.push(court._id);
      await sportObj.save(); // Save the updated Sport model
  
      res.status(201).json({
        message: 'Court added successfully',
        court: {
          _id: court._id,
          name: court.name,
          centre: centreObj.name,
          sport: sportObj.name,
          price: court.price,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  const showAvailableCourts = async (req, res) => {
    const { centre, sport, date, startTime, endTime } = req.body;
  
    try {
      // Check if the centre exists
      const centreObj = await Centre.findOne({ name: centre });
      if (!centreObj) {
        return res.status(404).json({ message: 'Centre not found' });
      }
  
      // Check if the sport exists for the specified centre
      const sportObj = await Sport.findOne({ name: sport, center: centreObj._id });
      if (!sportObj) {
        return res.status(404).json({ message: 'Sport not found for this centre' });
      }
  
      // Find all courts for the given centre and sport
      const courts = await Court.find({ sport: sportObj._id, centre: centreObj._id });
  
      // Filter out courts that are already booked for the given date, start time, and end time
      const availableCourts = [];
      for (let court of courts) {
        const conflictingBooking = await Booking.findOne({
          court: court._id,
          date: new Date(date), // Ensure the date matches
          $or: [
            { startTime: { $lt: endTime, $gte: startTime } }, // Conflicting booking with overlapping times
            { endTime: { $gt: startTime, $lte: endTime } },   // Conflicting booking with overlapping times
          ],
        });
  
        if (!conflictingBooking) {
          // Add the court to the available list if no conflicting bookings are found
          availableCourts.push({
            _id: court._id,
            name: court.name,
            price: court.price,
          });
        }
      }
  
      if (availableCourts.length === 0) {
        return res.status(404).json({ message: 'No courts available for the specified time' });
      }
  
      // Return available courts
      res.status(200).json(availableCourts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  module.exports = { addCourt,showAvailableCourts };