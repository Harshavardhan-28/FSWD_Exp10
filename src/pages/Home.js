import React from 'react';
import Carousel from '../components/Carousel';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Add custom styles to fix the spacing issue
const styles = {
  homePage: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 56px - 60px)', // Adjust based on navbar and footer height
  },
  ctaSection: {
    padding: '40px 0',
    marginTop: 'auto', // This pushes the CTA section to the bottom
    marginBottom: 0, // Ensure no margin at the bottom
  }
};

function Home() {
  return (
    <div className="home-page" style={styles.homePage}>
      <div className="hero-section">
        <Carousel />
        <div className="hero-overlay">
          <Container>
            <div className="hero-content">
              <h1>Premium Car Showroom</h1>
              <p>Discover our exclusive collection of luxury and performance vehicles</p>
              <div className="hero-buttons">
                <Button as={Link} to="/cars" variant="primary" size="lg" className="me-3">
                  Browse Cars
                </Button>
                <Button as={Link} to="/mycars" variant="outline-light" size="lg">
                  My Inventory
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <Container className="features-section">
        <Row className="text-center my-5">
          <Col md={4} className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <h3>Quality Guaranteed</h3>
            <p>Every car in our showroom is thoroughly inspected and certified for quality.</p>
          </Col>
          <Col md={4} className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-tag"></i>
            </div>
            <h3>Best Price Promise</h3>
            <p>We offer competitive pricing and flexible financing options for your dream car.</p>
          </Col>
          <Col md={4} className="feature-card">
            <div className="feature-icon">
              <i className="bi bi-headset"></i>
            </div>
            <h3>Dedicated Support</h3>
            <p>Our team of experts is always ready to help with any questions or concerns.</p>
          </Col>
        </Row>
      </Container>
      
      <div className="cta-section" style={styles.ctaSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <h2>Ready to find your perfect car?</h2>
              <p>Browse our extensive collection of premium vehicles or create your own personalized inventory.</p>
            </Col>
            <Col md={5} className="text-center text-md-end">
              <Button as={Link} to="/cars" variant="light" size="lg" className="me-3">
                Browse Collection
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;