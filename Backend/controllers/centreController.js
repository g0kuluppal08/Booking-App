const Centre = require('../models/centerModel');
const Sport = require('../models/sportModel');

// @desc    Add a new centre and sports (admin only)
// @route   POST /api/centres/add
const addCentreAndSport = async (req, res) => {
  const { centreName, sports } = req.body; // "sports" will be an array of sport names

  try {
    // Check if the centre exists
    let centre = await Centre.findOne({ name: centreName });

    if (centre) {
      // If the centre exists, add new sports to the existing centre
      for (let sportName of sports) {
        // Check if the sport already exists for this centre
        let existingSport = await Sport.findOne({ name: sportName, center: centre._id });
        if (!existingSport) {
          // If the sport doesn't exist, create it and associate it with the centre
          const newSport = await Sport.create({ name: sportName, center: centre._id });
          centre.sports.push(newSport._id); // Add sport to centre's sports array
        }
      }
      await centre.save(); // Save the updated centre with new sports
      return res.status(200).json({ message: 'Sports added to existing centre', centre });
    } else {
      // If the centre doesn't exist, create a new centre and associate the sports
      centre = await Centre.create({ name: centreName });
      let sportIds = [];
      for (let sportName of sports) {
        const newSport = await Sport.create({ name: sportName, center: centre._id });
        sportIds.push(newSport._id);
      }
      centre.sports = sportIds; // Add all sports to the new centre
      await centre.save(); // Save the new centre
      return res.status(201).json({ message: 'New centre created with sports', centre });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const getAllCentres = async (req, res) => {
    try {
      // Fetch all centers, selecting only the name field
      const centres = await Centre.find({}, 'name');
  
      if (!centres || centres.length === 0) {
        return res.status(404).json({ message: 'No centres found' });
      }
  
      // Return an array of centre names
      res.status(200).json(centres.map(centre => centre.name));
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  const getSportsByCentre = async (req, res) => {
    const { centreName } = req.params;
  
    try {
      // Find the centre by name
      const centre = await Centre.findOne({ name: centreName }).populate('sports', 'name');
  
      if (!centre) {
        return res.status(404).json({ message: 'Centre not found' });
      }
  
      // Return the names of sports linked to the centre
      const sports = centre.sports.map(sport => sport.name);
      res.status(200).json(sports);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports = { addCentreAndSport ,getAllCentres,getSportsByCentre};