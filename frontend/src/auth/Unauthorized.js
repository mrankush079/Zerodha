// src/auth/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚫 Access Denied</h1>
      <p style={styles.message}>You do not have permission to view this page.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    color: '#d32f2f',
  },
  message: {
    fontSize: '1.2rem',
    margin: '20px 0',
  },
  link: {
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 'bold',
  },
};

export default Unauthorized;