const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('user', 'username email'); // Populate user details
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.createCar = async (req, res) => {
    // First check if user exists
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { title, description, image, specs, details, price } = req.body;
  const userId = req.user.id; // Get the user ID from the request object

  try {
    const car = await Car.create({
      title,
      description,
      image,
      specs,
      details,
      price,
      user: userId // Associate the car with the logged-in user
    });
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getUserCars = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    
    const userId = req.user.id; // Get the user ID from the request object
    
    try {
        const cars = await Car.find({ user: userId }).populate('user', 'username email'); // Populate user details
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateCar = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    
    const carId = req.params.id;
    const userId = req.user.id;
    
    try {
        // First check if the car exists and belongs to the user
        const car = await Car.findById(carId);
        
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }
        
        if (car.user.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to update this car" });
        }
        
        // Update car fields
        const { title, description, image, specs, details, price } = req.body;
        
        car.title = title;
        car.description = description;
        car.image = image;
        car.specs = specs;
        car.details = details;
        car.price = price;
        
        await car.save();
        
        // Return the updated car with populated user
        const updatedCar = await Car.findById(carId).populate('user', 'username email');
        res.status(200).json(updatedCar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteCar = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    
    const carId = req.params.id;
    const userId = req.user.id;
    
    try {
        // First check if the car exists and belongs to the user
        const car = await Car.findById(carId);
        
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }
        
        if (car.user.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to delete this car" });
        }
        
        // Delete the car
        await Car.findByIdAndDelete(carId);
        
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}