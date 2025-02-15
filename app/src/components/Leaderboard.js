import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/leaderboard'; // Import the API function

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  if (users.length === 0) {
    return <p>Loading leaderboard...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Top 100 XPerts in Singapore</h2>
      {users.map((user, index) => (
        <div key={user.user_id} style={styles.userRow}>
          <span>{index + 1}. {user.user_username}</span>
          <span>{user.user_gc} Points</span>
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