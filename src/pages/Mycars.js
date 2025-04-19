import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BasicExample from '../components/Card';
import '../styles/RecipePages.css';
import { useAuth } from '../contexts/AuthContext';

function Mycars() {
  // States
  const [cars, setCars] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentCar, setCurrentCar] = useState({ 
    title: '', 
    description: '', 
    image: '', 
    specs: [], 
    details: '',
    price: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  // Get authentication context
  const { user } = useAuth();

  // Fetch user's cars from API on component mount
  useEffect(() => {
    // Only fetch cars if user is logged in
    if (!user) {
      setLoading(false);
      return;
    }
    
    const fetchUserCars = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/cars/user-cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // Important to include cookies for authentication
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }

        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserCars();
  }, [user]);

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      // Convert price to number
      setCurrentCar({ ...currentCar, [name]: parseFloat(value) || 0 });
    } else {
      setCurrentCar({ ...currentCar, [name]: value });
    }
  };

  // CRUD Operations
  // Create
  const handleAddCar = async () => {
    try {
      setFormError('');
      setFormSuccess('');

      // Validate form data
      if (!currentCar.title || !currentCar.description || !currentCar.image || !currentCar.price) {
        setFormError('Please fill in all required fields');
        return;
      }
      
      // Prepare car data
      const carData = {
        ...currentCar,
        specs: Array.isArray(currentCar.specs) ? currentCar.specs : currentCar.specs.split('\n')
      };

      // Send POST request to create car
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add car');
      }

      const newCar = await response.json();
      
      // Update cars state with new car
      setCars([...cars, newCar]);
      
      // Reset form and close modal
      setCurrentCar({ title: '', description: '', image: '', specs: [], details: '', price: 0 });
      setShowAddModal(false);
      setFormSuccess('Car added successfully!');
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Read - already implemented with the mapping in the JSX
  const handleViewCar = (id) => {
    const car = cars.find(car => car._id === id);
    if (car) {
      setCurrentCar(car);
      setShowViewModal(true);
    }
  };

  // Update
  const handleEditClick = (car) => {
    setCurrentCar(car);
    setShowEditModal(true);
  };

  const handleUpdateCar = async () => {
    try {
      setFormError('');
      
      // Validate form data
      if (!currentCar.title || !currentCar.description || !currentCar.image || !currentCar.price) {
        setFormError('Please fill in all required fields');
        return;
      }
      
      // Prepare car data
      const carData = {
        ...currentCar,
        specs: Array.isArray(currentCar.specs) ? currentCar.specs : currentCar.specs.split('\n')
      };

      // Send PUT request to update car
      const response = await fetch(`/api/cars/${currentCar._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update car');
      }

      const updatedCar = await response.json();
      
      // Update cars state with updated car
      setCars(cars.map(car => car._id === updatedCar._id ? updatedCar : car));
      
      // Close modal
      setShowEditModal(false);
      setFormSuccess('Car updated successfully!');
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Delete
  const handleDeleteClick = (car) => {
    setCurrentCar(car);
    setShowDeleteModal(true);
  };

  const handleDeleteCar = async () => {
    try {
      // Send DELETE request
      const response = await fetch(`/api/cars/${currentCar._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete car');
      }

      // Update cars state by removing the deleted car
      setCars(cars.filter(car => car._id !== currentCar._id));
      
      // Close modal
      setShowDeleteModal(false);
      setFormSuccess('Car deleted successfully!');
    } catch (err) {
      setFormError(err.message);
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

  // If user is not logged in, show login message
  if (!user) {
    return (
      <Container className="text-center p-5">
        <div className="my-5">
          <h2>Please Log In</h2>
          <p className="mb-4">You need to be logged in to view and manage your car inventory.</p>
          <Button as={Link} to="/login" variant="primary" size="lg">
            Go to Login
          </Button>
        </div>
      </Container>
    );
  }

  if (loading) return <div className="text-center p-5"><h3>Loading your car inventory...</h3></div>;
  if (error) return <Alert variant="danger" className="m-3">Error: {error}</Alert>;

  return (
    <Container className="car-container">
      <div className="cars-header">
        <h1>My Inventory</h1>
        <Button 
          variant="success" 
          onClick={() => {
            setCurrentCar({ title: '', description: '', image: '', specs: [], details: '', price: 0 });
            setShowAddModal(true);
          }}
        >
          <i className="bi bi-plus-lg me-1"></i> Add New Car
        </Button>
      </div>

      {formSuccess && <Alert variant="success" className="mt-3" dismissible onClose={() => setFormSuccess('')}>{formSuccess}</Alert>}

      {cars.length === 0 ? (
        <div className="text-center p-5">
          <h3>You don't have any cars in your inventory yet.</h3>
          <p>Click the "Add New Car" button to get started!</p>
        </div>
      ) : (
        <div className="car-grid">
          {cars.map(car => (
            <div key={car._id} className="car-card">
              <div className="car-card-wrapper">
                <div className="price-badge">${car.price}</div>
                <BasicExample 
                  id={car._id}
                  title={car.title} 
                  description={car.description} 
                  image={car.image}
                  specs={car.specs}
                  onViewCar={handleViewCar}
                />
                <div className="car-actions">
                  <Button variant="info" size="sm" onClick={() => handleEditClick(car)}>
                    <i className="bi bi-pencil-fill me-1"></i> Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(car)}>
                    <i className="bi bi-trash-fill me-1"></i> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Car Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={currentCar.title} 
                onChange={handleInputChange} 
                placeholder="Car make and model" 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description"
                value={currentCar.description} 
                onChange={handleInputChange} 
                placeholder="Brief car description" 
                rows={3} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (in USD)</Form.Label>
              <Form.Control 
                type="number" 
                name="price"
                value={currentCar.price} 
                onChange={handleInputChange} 
                placeholder="Car price" 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="image"
                value={currentCar.image} 
                onChange={handleInputChange} 
                placeholder="https://example.com/image.jpg" 
                required
              />
              <Form.Text className="text-muted">
                Enter a URL for the car image
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specifications</Form.Label>
              <Form.Control 
                as="textarea" 
                name="specs"
                value={Array.isArray(currentCar.specs) ? currentCar.specs.join('\n') : currentCar.specs} 
                onChange={(e) => setCurrentCar({...currentCar, specs: e.target.value.split('\n')})} 
                placeholder="Enter specifications (one per line)" 
                rows={4} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control 
                as="textarea" 
                name="details"
                value={currentCar.details} 
                onChange={handleInputChange} 
                placeholder="Enter detailed information about the car" 
                rows={4} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddCar}>Add Car</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Car Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={currentCar.title} 
                onChange={handleInputChange} 
                placeholder="Car make and model" 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description"
                value={currentCar.description} 
                onChange={handleInputChange} 
                placeholder="Brief car description" 
                rows={3} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (in USD)</Form.Label>
              <Form.Control 
                type="number" 
                name="price"
                value={currentCar.price} 
                onChange={handleInputChange} 
                placeholder="Car price" 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="image"
                value={currentCar.image} 
                onChange={handleInputChange} 
                placeholder="https://example.com/image.jpg" 
                required
              />
              <Form.Text className="text-muted">
                Enter a URL for the car image
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specifications</Form.Label>
              <Form.Control 
                as="textarea" 
                name="specs"
                value={Array.isArray(currentCar.specs) ? currentCar.specs.join('\n') : currentCar.specs} 
                onChange={(e) => setCurrentCar({...currentCar, specs: e.target.value.split('\n')})} 
                placeholder="Enter specifications (one per line)" 
                rows={4} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control 
                as="textarea" 
                name="details"
                value={currentCar.details} 
                onChange={handleInputChange} 
                placeholder="Enter detailed information about the car" 
                rows={4} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateCar}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Car Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{currentCar.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteCar}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* View Car Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg" centered>
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
                <div className="car-specs mb-4">
                  <h5>Specifications</h5>
                  {formatSpecs(currentCar.specs)}
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Mycars;