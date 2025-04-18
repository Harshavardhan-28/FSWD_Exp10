import React, { useState } from 'react';
import { Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import BasicExample from '../components/Card';
import '../styles/RecipePages.css';
import { useFavorites } from '../contexts/FavoritesContext';

function Mycars() {
  // Initial cars data
  const initialCars = [
    { 
      id: 1, 
      title: 'Honda Civic', 
      description: 'Reliable compact sedan with excellent fuel economy.',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=500&q=60',
      specs: ['1.5L Turbo Engine', '180 Horsepower', 'CVT Transmission', 'Cloth Seats', 'Apple CarPlay Integration', 'Honda Sensing Suite'],
      details: 'The Honda Civic is a compact car known for its reliability, fuel efficiency, and practicality. It offers a comfortable ride, responsive handling, and a spacious interior for its class. The Civic comes with a range of modern features and has excellent resale value.'
    },
    { 
      id: 2, 
      title: 'Ford Mustang', 
      description: 'Iconic American muscle car with powerful engine options.',
      image: 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?auto=format&fit=crop&w=500&q=60',
      specs: ['5.0L V8 Engine', '460 Horsepower', '6-Speed Manual', 'Leather Seats', 'SYNC 3 Infotainment', 'Active Valve Performance Exhaust'],
      details: 'The Ford Mustang is a legendary American muscle car that combines powerful performance with iconic styling. It features a driver-focused cockpit with modern technology and comfortable seating. The Mustang offers thrilling acceleration and a distinctive engine note from its V8 engine.'
    },
    { 
      id: 3, 
      title: 'Jeep Wrangler', 
      description: 'Rugged off-road SUV with removable top and doors.',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=500&q=60',
      specs: ['3.6L V6 Engine', '285 Horsepower', '8-Speed Automatic', 'Water Resistant Interior', '4x4 System', 'Removable Top and Doors'],
      details: 'The Jeep Wrangler is an iconic off-road vehicle known for its exceptional capability in rough terrain. It features a unique design with removable doors and roof for an open-air experience. The Wrangler combines rugged utility with modern comfort features for both daily driving and weekend adventures.'
    },
    { 
      id: 4, 
      title: 'Lexus ES', 
      description: 'Luxury sedan with smooth ride and elegant interior.',
      image: 'https://images.unsplash.com/photo-1583870908951-71149f42bcf9?auto=format&fit=crop&w=500&q=60',
      specs: ['3.5L V6 Engine', '302 Horsepower', '8-Speed Automatic', 'Semi-Aniline Leather', 'Mark Levinson Audio', 'Lexus Safety System+'],
      details: 'The Lexus ES is a luxury midsize sedan that offers a refined driving experience with a focus on comfort. It features a whisper-quiet cabin with premium materials and excellent build quality. The ES provides a smooth ride, efficient performance, and a comprehensive suite of safety features.'
    }
  ];

  // States
  const [cars, setCars] = useState(initialCars);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentCar, setCurrentCar] = useState({ id: null, title: '', description: '', image: '', specs: [], details: '' });

  // Use favorites context
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCar({ ...currentCar, [name]: value });
  };

  // CRUD Operations
  // Create
  const handleAddCar = () => {
    const newCar = {
      ...currentCar,
      id: cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1,
      specs: currentCar.specs || []
    };
    
    setCars([...cars, newCar]);
    setCurrentCar({ id: null, title: '', description: '', image: '', specs: [], details: '' });
    setShowAddModal(false);
  };

  // Read - already implemented with the mapping in the JSX
  const handleViewCar = (id) => {
    const car = cars.find(car => car.id === id);
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

  const handleUpdateCar = () => {
    setCars(cars.map(car => 
      car.id === currentCar.id ? currentCar : car
    ));
    setShowEditModal(false);
  };

  // Delete
  const handleDeleteClick = (car) => {
    setCurrentCar(car);
    setShowDeleteModal(true);
  };

  const handleDeleteCar = () => {
    setCars(cars.filter(car => car.id !== currentCar.id));
    setShowDeleteModal(false);
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

  // Handle favorite toggle in modal
  const handleToggleFavorite = () => {
    if (isFavorite(currentCar.id)) {
      removeFromFavorites(currentCar.id);
    } else {
      addToFavorites({
        id: currentCar.id,
        title: currentCar.title,
        description: currentCar.description,
        image: currentCar.image,
        specs: currentCar.specs,
        details: currentCar.details
      });
    }
  };

  return (
    <Container className="car-container">
      <div className="cars-header">
        <h1>My Inventory</h1>
        <Button 
          variant="success" 
          onClick={() => {
            setCurrentCar({ id: null, title: '', description: '', image: '', specs: [], details: '' });
            setShowAddModal(true);
          }}
        >
          <i className="bi bi-plus-lg me-1"></i> Add New Car
        </Button>
      </div>

      <div className="car-grid">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            <div className="car-card-wrapper">
              <BasicExample 
                id={car.id}
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

      {/* Add Car Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="image"
                value={currentCar.image} 
                onChange={handleInputChange} 
                placeholder="https://example.com/image.jpg" 
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
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                name="image"
                value={currentCar.image} 
                onChange={handleInputChange} 
                placeholder="https://example.com/image.jpg" 
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
                <div className="car-specs mb-4">
                  <h5>Specifications</h5>
                  {formatSpecs(currentCar.specs)}
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant={isFavorite(currentCar.id) ? "danger" : "outline-danger"} 
            className="me-auto"
            onClick={handleToggleFavorite}
          >
            <i className={`bi ${isFavorite(currentCar.id) ? "bi-heart-fill" : "bi-heart"} me-2`}></i>
            {isFavorite(currentCar.id) ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Mycars;