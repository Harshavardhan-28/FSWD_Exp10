const express = require('express');
const router = express.Router();
const { getAllCars, createCar, getUserCars, updateCar, deleteCar } = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllCars);

router.post('/', protect, createCar);

router.get('/user-cars', protect, getUserCars); // Get cars for the logged-in user

router.put('/:id', protect, updateCar); // Update a car

router.delete('/:id', protect, deleteCar); // Delete a car

module.exports = router;