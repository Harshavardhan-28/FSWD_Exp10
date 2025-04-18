import React, { useState } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import BasicExample from '../components/Card';
import '../styles/RecipePages.css';
import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';

function Favorites() {
  // Get favorites from context
  const { favorites, removeFromFavorites } = useFavorites();

  // State for view modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  // Handle view car
  const handleViewCar = (id) => {
    const car = favorites.find(car => car.id === id);
    if (car) {
      setCurrentCar(car);
      setShowViewModal(true);
    }
  };

  // Helper to format specs as a list if it's an array
  const formatSpecs = (specs) => {
    if (Array.isArray(specs)) {
      return (
        <ul className="specs-list">
          {specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      );
    }
    return <p>{specs}</p>;
  };

  // Handle remove from favorites
  const handleRemoveFromFavorites = () => {
    if (currentCar) {
      removeFromFavorites(currentCar.id);
      setShowViewModal(false);
    }
  };

  return (
    <Container className="car-container">
      <h1>My Favorite Cars</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="icon">
            <i className="bi bi-heart"></i>
          </div>
          <h3>You haven't added any favorites yet</h3>
          <p className="text-muted">Browse our collection and click the heart icon on any car to add it to your favorites.</p>
          <Button as={Link} to="/cars" variant="primary" className="mt-3">
            Browse Cars
          </Button>
        </div>
      ) : (
        <div className="car-grid">
          {favorites.map(car => (
            <div key={car.id} className="car-card">
              <BasicExample 
                id={car.id}
                title={car.title} 
                description={car.description} 
                image={car.image}
                specs={car.specs}
                onViewCar={handleViewCar}
                showFavoriteButton={true}
              />
            </div>
          ))}
        </div>
      )}

      {/* View Car Modal */}
      {currentCar && (
        <Modal 
          show={showViewModal} 
          onHide={() => setShowViewModal(false)} 
          size="lg"
          centered
          className="car-detail-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{currentCar.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="car-view">
              {currentCar.image && (
                <div className="car-image mb-4">
                  <img src={currentCar.image} alt={currentCar.title} className="img-fluid rounded" />
                </div>
              )}
              <Row>
                <Col md={8}>
                  <div className="car-description mb-4">
                    <h5>Description</h5>
                    <p>{currentCar.description}</p>
                  </div>
                  {currentCar.details && (
                    <div className="car-details">
                      <h5>Details</h5>
                      <p style={{ whiteSpace: 'pre-line' }}>{currentCar.details}</p>
                    </div>
                  )}
                </Col>
                <Col md={4}>
                  {currentCar.specs && (
                    <div className="car-specs mb-4">
                      <h5>Specifications</h5>
                      {formatSpecs(currentCar.specs)}
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="danger" 
              className="me-auto"
              onClick={handleRemoveFromFavorites}
            >
              <i className="bi bi-heart-fill me-2"></i>
              Remove from Favorites
            </Button>
            <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default Favorites;