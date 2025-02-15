import React from 'react';
import './RedeemPoints.css'; // Import the CSS file

const RedeemPoints = ({ userID }) => {
  const challenges = [
    { id: 1, name: 'Challenge 1', points: 100 },
    { id: 2, name: 'Challenge 2', points: 200 },
    { id: 3, name: 'Challenge 3', points: 300 },
  ];

  return (
    <div className="redeemPoints-container">
      <h2 className="redeemPoints-title">Available Challenges</h2>
      {challenges.map((challenge) => (
        <div key={challenge.id} className="redeemPoints-card">
          <h3>{challenge.name}</h3>
          <p>{challenge.points} Points</p>
        </div>
      ))}
    </div>
  );
};

export default RedeemPoints;
