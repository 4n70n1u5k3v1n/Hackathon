import React from 'react';

const ChallengesList = () => {
  const challenges = [
    { id: 1, name: 'Challenge 1', points: 100 },
    { id: 2, name: 'Challenge 2', points: 200 },
    { id: 3, name: 'Challenge 3', points: 300 },
  ];

  return (
    <div style={styles.container}>
      <h2>Available Challenges</h2>
      {challenges.map((challenge) => (
        <div key={challenge.id} style={styles.challengeCard}>
          <h3>{challenge.name}</h3>
          <p>{challenge.points} Points</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
  },
  challengeCard: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default ChallengesList;