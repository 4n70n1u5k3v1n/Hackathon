import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Missions = () => {
  const challenges = [
    { id: 1, name: 'Join an Event', progress: '0/1', points: 100 },
    { id: 2, name: 'Make a New Friend', progress: '0/1', points: 200 },
    { id: 3, name: 'Complete a Skill Challenge', progress: '0/1', points: 300 },
  ];

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.title}>Challenges</h2>
        {challenges.map((challenge) => (
          <div key={challenge.id} style={styles.challengeCard}>
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

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
  },
  challengeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
  },
};

export default Missions;