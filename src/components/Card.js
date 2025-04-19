import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useFavorites } from '../contexts/FavoritesContext';

function BasicExample({ id, title, description, image, specs, onViewCar, userName, showFavoriteButton = true }) {
  // Default placeholder image if none provided
  const imageUrl = image || 'https://via.placeholder.com/300x180?text=Car+Image';
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  // Check if this car is a favorite
  const favorite = isFavorite(id);
  
  // Toggle favorite status
  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Prevent triggering the view car function
    
    if (favorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, title, description, image, specs });
    }
  };

  // Display first 2 specs as badges if available
  const displayBadges = specs && Array.isArray(specs) && specs.length > 0;
  const limitedSpecs = displayBadges ? specs.slice(0, 2) : [];
  
  // User name display style
  const userStyle = {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  };
  
  return (
    <Card className="car-card-container h-100">
      <div className="card-img-wrapper">
        <Card.Img variant="top" src={imageUrl} alt={title} className="car-card-img" />
        {showFavoriteButton && (
          <Button 
            variant="link" 
            className="favorite-btn"
            onClick={handleFavoriteToggle}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <i className={`bi ${favorite ? "bi-heart-fill" : "bi-heart"}`}></i>
          </Button>
        )}
        <div className="card-overlay">
          <Button 
            variant="primary" 
            className="view-details-btn"
            onClick={() => onViewCar && onViewCar(id)}
          >
            View Details
          </Button>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="car-card-title">{title || 'Car Title'}</Card.Title>
        <Card.Text className="car-card-description">
          {description || 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'}
        </Card.Text>
        {displayBadges && (
          <div className="car-card-badges">
            {limitedSpecs.map((spec, index) => (
              <Badge bg="light" text="dark" key={index} className="car-spec-badge">
                {spec}
              </Badge>
            ))}
            {specs.length > 2 && (
              <Badge bg="secondary" className="car-spec-badge">
                +{specs.length - 2} more
              </Badge>
            )}
          </div>
        )}
        {userName && (
          <div style={userStyle}>
            <i className="bi bi-person-circle"></i>
            <span style={{ marginLeft: '5px' }}>{userName}</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default BasicExample;