import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './Missions.css'; // Import the CSS file

const Missions = ({ userID }) => {
  const challenges = [
    { id: 1, name: 'Join an Event', progress: '0/1', points: 100 },
    { id: 2, name: 'Make a New Friend', progress: '0/1', points: 200 },
    { id: 3, name: 'Complete a Skill Challenge', progress: '0/1', points: 300 },
  ];

  return (
    <div>
      <Header />
      <div className="mission-container">
        <h2 className="mission-title">Challenges</h2>
        {challenges.map((challenge) => (
          <div key={challenge.id} className="mission-card">
            <h3>{challenge.name}</h3>
            <p>
              {challenge.progress} - {challenge.points} Points
            </p>
          </div>
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default Missions;
