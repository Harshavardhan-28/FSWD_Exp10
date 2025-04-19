import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import BasicExample from '../components/Card';
import '../styles/RecipePages.css';

// Add custom CSS for better styling
const styles = {
  priceTag: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0, 123, 255, 0.8)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 'bold',
    zIndex: '1',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardWrapperHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
  },
  userInfoBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #eaeaea',
    fontSize: '0.9rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    color: '#666',
  },
  userIcon: {
    marginRight: '5px',
    fontSize: '0.9rem',
  },
  dateInfo: {
    color: '#888',
    fontSize: '0.8rem',
  },
  carGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px',
    padding: '25px',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '1.5rem',
  },
  pageHeader: {
    textAlign: 'center',
    margin: '30px 0 10px',
    fontWeight: '600',
    color: '#333',
  },
};

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch cars.');
        }
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // State for view modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  // Handle view car
  const handleViewCar = (id) => {
    const car = cars.find(car => car._id === id);
    if (car) {
      setCurrentCar(car);
      setShowViewModal(true);
    }
  };

  // New state for hover effect
  const [hoveredCardId, setHoveredCardId] = useState(null);

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

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) return <div style={styles.loadingContainer}>Loading cars...</div>;
  if (error) return <div style={styles.loadingContainer}>{error}</div>;

  return (
    <div className="car-container">
      <h1 style={styles.pageHeader}>Explore Available Cars</h1>
      <div style={styles.carGrid}>
        {cars.map(car => (
          <div 
            key={car._id} 
            style={{
              ...styles.cardWrapper,
              ...(hoveredCardId === car._id ? styles.cardWrapperHover : {})
            }}
            onMouseEnter={() => setHoveredCardId(car._id)}
            onMouseLeave={() => setHoveredCardId(null)}
          >
            <div style={styles.priceTag}>${car.price}</div>
            <BasicExample 
              id={car._id}
              title={car.title} 
              description={car.description}
              image={car.image}
              onViewCar={() => handleViewCar(car._id)}
              userName={car.user ? car.user.username : 'Unknown user'}
              showFavoriteButton={false}
            />
            <div style={styles.userInfoBar}>
              <div style={styles.userInfo}>
                <i className="bi bi-person-circle" style={styles.userIcon}></i>
                {car.user ? car.user.username : 'Unknown user'}
              </div>
              {car.createdAt && (
                <div style={styles.dateInfo}>
                  {formatDate(car.createdAt)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View Car Modal */}
      {currentCar && (
        <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {currentCar.title}
              {currentCar.price && (
                <span className="ms-2 badge bg-primary">${currentCar.price}</span>
              )}
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
                {currentCar.user && (
                  <div style={{
                    ...styles.userInfo,
                    padding: '8px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    marginTop: '10px'
                  }}>
                    <i className="bi bi-person-circle me-2"></i>
                    Posted by: <strong>{currentCar.user.username}</strong>
                    {currentCar.createdAt && (
                      <span style={{marginLeft: 'auto'}}>
                        {formatDate(currentCar.createdAt)}
                      </span>
                    )}
                  </div>
                )}
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
            <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Cars;