import React from 'react';

const Leaderboard = () => {
  const topUsers = [
    { id: 1, username: 'User1', points: 5000 },
    { id: 2, username: 'User2', points: 4500 },
    { id: 3, username: 'User3', points: 4000 },
  ];

  return (
    <div style={styles.container}>
      <h2>Top 100 XPerts in Singapore</h2>
      {topUsers.map((user) => (
        <div key={user.id} style={styles.userRow}>
          <span>{user.username}</span>
          <span>{user.points} Points</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
  },
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
};

export default Leaderboard;