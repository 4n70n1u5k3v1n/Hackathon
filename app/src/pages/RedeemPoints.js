import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedeemPoints = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Wireless Mouse', points: 1000, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Mechanical Keyboard', points: 2000, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Gaming Monitor', points: 5000, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Gift Card', points: 100, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      {/* Points Display */}
      <div style={styles.pointsContainer}>
        <div style={styles.pointsCard}>
          <h2>4900 Points</h2>
        </div>
        <div style={styles.warningCard}>
          <p>Your points will expire on 31 Dec 2025 23:59 SGT</p>
        </div>
      </div>

      {/* Product Listing */}
      <div style={styles.productList}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <img src={product.image} alt={product.name} style={styles.productImage} />
            <h3>{product.name}</h3>
            <p>{product.points} Points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  pointsContainer: {
    position: 'sticky',
    top: '0',
    backgroundColor: '#fff',
    zIndex: 1000,
    paddingBottom: '10px',
  },
  pointsCard: {
    backgroundColor: '#e9ecef',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  warningCard: {
    backgroundColor: '#fff3cd',
    borderRadius: '10px',
    padding: '10px',
    textAlign: 'center',
    color: '#856404',
  },
  productList: {
    marginTop: '20px',
  },
  productCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
};

export default RedeemPoints;