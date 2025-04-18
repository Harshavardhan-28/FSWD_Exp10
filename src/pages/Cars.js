import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import BasicExample from '../components/Card';
import '../styles/RecipePages.css';
import { useFavorites } from '../contexts/FavoritesContext';

function Cars() {
  // Sample car data with image URLs
  const cars = [
    { 
      id: 1, 
      title: 'Audi A4', 
      description: 'Luxury sedan with advanced technology and elegant design.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=60',
      specs: ['2.0L Turbo Engine', '248 Horsepower', 'Automatic Transmission', 'Leather Interior', 'Premium Sound System', 'Navigation System'],
      details: 'The Audi A4 is a premium compact executive car that balances performance and luxury. It offers a refined driving experience with responsive handling and a comfortable ride. The interior features high-quality materials and cutting-edge technology.'
    },
    { 
      id: 2, 
      title: 'BMW 5 Series', 
      description: 'Executive sedan with powerful engine options and luxurious interior.',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=500&q=60',
      specs: ['3.0L Inline-6 Engine', '335 Horsepower', '8-Speed Automatic', 'Premium Leather', 'Harman Kardon Audio', 'Advanced Driver Assistance'],
      details: 'The BMW 5 Series combines elegant styling with impressive performance. It features a spacious cabin with premium materials and the latest technology. The 5 Series delivers a balanced driving experience with sporty handling and a smooth ride.'
    },
    { 
      id: 3, 
      title: 'Tesla Model 3', 
      description: 'Electric sedan with long range and cutting-edge technology.',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=60',
      specs: ['Dual Motor AWD', '0-60 mph in 3.1s', '358 Mile Range', '15" Touchscreen', 'Autopilot', 'Glass Roof'],
      details: 'The Tesla Model 3 is a fully electric sedan that offers impressive range and performance. It features minimalist interior design centered around a large touchscreen display. The Model 3 includes Tesla\'s advanced Autopilot system and regular over-the-air software updates.'
    },
    { 
      id: 4, 
      title: 'Mercedes-Benz GLE', 
      description: 'Luxury SUV with spacious interior and advanced safety features.',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=500&q=60',
      specs: ['3.0L Turbocharged V6', '362 Horsepower', '9-Speed Automatic', 'Nappa Leather', 'Burmester Sound System', 'MBUX Infotainment'],
      details: 'The Mercedes-Benz GLE is a mid-size luxury SUV with a blend of style, technology, and capability. It offers a smooth and quiet ride with excellent handling for its size. The interior is spacious and features high-quality materials throughout.'
    },
    { 
      id: 5, 
      title: 'Toyota RAV4', 
      description: 'Popular compact SUV with reliability and versatility.',
      image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=500&q=60',
      specs: ['2.5L 4-Cylinder Engine', '203 Horsepower', 'CVT Transmission', 'Cloth Seats', 'Apple CarPlay/Android Auto', 'Toyota Safety Sense'],
      details: 'The Toyota RAV4 is a versatile and practical compact SUV known for its reliability and value. It provides a comfortable ride with plenty of cargo space and modern technology features. The RAV4 also offers good fuel economy and a range of safety features as standard.'
    },
    { 
      id: 6, 
      title: 'Porsche 911', 
      description: 'Iconic sports car with exceptional performance and handling.',
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=500&q=60',
      specs: ['3.0L Twin-Turbo Flat-Six', '443 Horsepower', '8-Speed PDK', 'Sport Seats', 'Bose Sound System', 'Sport Chrono Package'],
      details: 'The Porsche 911 is an iconic sports car known for its distinctive design and exceptional performance. It offers precise handling, rapid acceleration, and everyday usability. The 911 features a driver-focused interior with premium materials and advanced technology.'
    }
  ];

  // Use favorites context
  const { addToFavorites } = useFavorites();

  // State for view modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  // Handle view car
  const handleViewCar = (id) => {
    const car = cars.find(car => car.id === id);
    if (car) {
      setCurrentCar(car);
      setShowViewModal(true);
    }
  };

  // Helper to format specs as a list if it's an array
  const formatSpecs = (specs) => {
    if (Array.isArray(specs)) {
      return (
        <ul>
          {specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      );
    }
    return <p>{specs}</p>;
  };

  return (
    <div className="car-container">
      <h1>All Cars</h1>
      <div className="car-grid">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <BasicExample 
              id={car.id}
              title={car.title} 
              description={car.description} 
              image={car.image}
              onViewCar={handleViewCar}
            />
          </div>
        ))}
      </div>

      {/* View Car Modal */}
      {currentCar && (
        <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {currentCar.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="car-view">
              {currentCar.image && (
                <div className="car-image mb-4">
                  <img src={currentCar.image} alt={currentCar.title} className="img-fluid rounded" />
                </div>
              )}
              <div className="car-description mb-4">
                <h5>Description</h5>
                <p>{currentCar.description}</p>
              </div>
              <div className="car-specs mb-4">
                <h5>Specifications</h5>
                {formatSpecs(currentCar.specs)}
              </div>
              <div className="car-details">
                <h5>Details</h5>
                <p style={{ whiteSpace: 'pre-line' }}>{currentCar.details}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="outline-danger" 
              className="me-auto"
              onClick={() => {
                addToFavorites({
                  id: currentCar.id,
                  title: currentCar.title,
                  description: currentCar.description,
                  image: currentCar.image,
                  specs: currentCar.specs,
                  details: currentCar.details
                });
              }}
            >
              <i className="bi bi-heart me-2"></i> Add to Favorites
            </Button>
            <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Cars;