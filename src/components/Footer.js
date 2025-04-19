import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          <Col lg={4} md={6} className="footer-section">
            <h4 className="footer-heading">Harshowroom</h4>
            <p className="footer-description">
              Your ultimate destination for discovering and showcasing premium vehicles from around the world.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Visit our Facebook page">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Visit our Twitter page">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Visit our Instagram page">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon" aria-label="Visit our YouTube channel">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </Col>

          <Col lg={3} md={6} className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cars">Cars</Link></li>
              <li><Link to="/mycars">My Inventory</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-info">
              <li>
                <i className="bi bi-geo-alt-fill"></i> 
                <span>Seawoods, Sector-48</span>
              </li>
              <li>
                <i className="bi bi-telephone-fill"></i>
                <span>+91 99999 99999</span>
              </li>
              <li>
                <i className="bi bi-envelope-fill"></i>
                <span>support@carshowroom.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Harshowroom. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <span className="separator">|</span>
            <a href="#">Terms</a>
            <span className="separator">|</span>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;