import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RedeemPoints.css'; // Import the CSS file

const RedeemPoints = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: 'Wireless Mouse', points: 1000, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Mechanical Keyboard', points: 2000, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Gaming Monitor', points: 5000, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Gift Card', points: 100, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="redeemPoints-container">
      {/* Back Button */}
      <button className="redeemPoints-backButton" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      {/* Points Display */}
      <div className="redeemPoints-pointsContainer">
        <div className="redeemPoints-pointsCard">
          <h2>4900 Points</h2>
        </div>
        <div className="redeemPoints-warningCard">
          <p>Your points will expire on 31 Dec 2025 23:59 SGT</p>
        </div>
      </div>

      {/* Product Listing */}
      <div className="redeemPoints-productList">
        {products.map((product) => (
          <div key={product.id} className="redeemPoints-productCard">
            <img src={product.image} alt={product.name} className="redeemPoints-productImage" />
            <h3>{product.name}</h3>
            <p>{product.points} Points</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedeemPoints;
