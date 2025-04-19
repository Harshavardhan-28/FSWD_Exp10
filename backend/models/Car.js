const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL to car image
  specs: [{ type: String, required: true }], // List of car specs
  details: { type: String, required: true }, // Detailed description
  price: { type: Number, required: true }, // Price of the car
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user who added the car
}, {
  timestamps: true,
  collection: 'cars' // Explicit collection name
});

module.exports = mongoose.model('Car', carSchema);
