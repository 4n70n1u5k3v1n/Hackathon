import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const LeaderboardPage = () => {
  const users = [
    { id: 1, name: 'User1', points: 5000 },
    { id: 2, name: 'User2', points: 4500 },
    { id: 3, name: 'User3', points: 4000 },
    { id: 4, name: 'User4', points: 3500 },
    { id: 5, name: 'User5', points: 3000 },
    { id: 6, name: 'User6', points: 2500 },
    { id: 7, name: 'User7', points: 2000 },
  ];

  const top3 = users.slice(0, 3); // Top 3 users for the podium
  const remainingUsers = users.slice(3); // Remaining users for the list

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.title}>Leaderboard</h2>

        {/* Podium for Top 3 */}
        <div style={styles.podium}>
          {/* 2nd Place */}
          <div style={styles.podiumSecond}>
            <h3 style={styles.podiumName}>{top3[1].name}</h3>
            <p style={styles.podiumPoints}>{top3[1].points} Points</p>
          </div>

          {/* 1st Place */}
          <div style={styles.podiumFirst}>
            <h3 style={styles.podiumName}>{top3[0].name}</h3>
            <p style={styles.podiumPoints}>{top3[0].points} Points</p>
          </div>

          {/* 3rd Place */}
          <div style={styles.podiumThird}>
            <h3 style={styles.podiumName}>{top3[2].name}</h3>
            <p style={styles.podiumPoints}>{top3[2].points} Points</p>
          </div>
        </div>

        {/* List of Remaining Users */}
        <div style={styles.userList}>
          {remainingUsers.map((user, index) => (
            <div key={user.id} style={styles.userRow}>
              <span style={styles.userRank}>{index + 4}.</span>
              <span style={styles.userName}>{user.name}</span>
              <span style={styles.userPoints}>{user.points} Points</span>
            </div>
          ))}
        </div>
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
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  podium: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: '20px',
    marginBottom: '20px',
  },
  podiumFirst: {
    backgroundColor: '#ffd700',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '100px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  podiumSecond: {
    backgroundColor: '#c0c0c0',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '100px',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  podiumThird: {
    backgroundColor: '#cd7f32',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '100px',
    height: '90px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  podiumName: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  podiumPoints: {
    margin: 0,
    fontSize: '0.9rem',
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  userRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '10px',
  },
  userRank: {
    fontWeight: 'bold',
  },
  userName: {
    flex: 1,
    marginLeft: '10px',
  },
  userPoints: {
    fontWeight: 'bold',
  },
};

export default LeaderboardPage;