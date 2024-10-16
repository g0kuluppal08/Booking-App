const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  centre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true,
  },
});

const Court = mongoose.model('Court', courtSchema);
module.exports = Court;