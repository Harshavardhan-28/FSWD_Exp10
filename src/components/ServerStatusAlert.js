import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const ServerStatusAlert = () => {
  const { serverStatus } = useAuth();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('warning');
  
  useEffect(() => {
    if (serverStatus === 'offline') {
      setMessage('Server connection lost. You have been logged out.');
      setVariant('danger');
      setShow(true);
    } else if (serverStatus === 'online' && show && variant === 'danger') {
      // If we were showing an offline alert and server is back online
      setMessage('Server connection restored.');
      setVariant('success');
      setShow(true);
      
      // Auto-hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [serverStatus, show, variant]);
  
  if (!show) return null;
  
  return (
    <Alert 
      variant={variant} 
      onClose={() => setShow(false)} 
      dismissible
      className="server-status-alert"
      style={{
        position: 'fixed',
        top: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1050,
        width: 'auto',
        maxWidth: '90%',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <div className="d-flex align-items-center">
        {variant === 'danger' && <i className="bi bi-exclamation-triangle-fill me-2"></i>}
        {variant === 'success' && <i className="bi bi-check-circle-fill me-2"></i>}
        {message}
      </div>
    </Alert>
  );
};

export default ServerStatusAlert;