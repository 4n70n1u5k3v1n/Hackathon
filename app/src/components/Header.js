import React, { useEffect, useState } from 'react';
import {getUserPoints} from '../api/user';

  
const Header = ({ onProfileClick, userID }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const userPoints = await getUserPoints(userID);
      setPoints(userPoints);
    };

    if (userID) {
      fetchPoints();
    }
  }, [userID]);

  return (
    <header style={styles.header}>
      <div style={styles.profileCircle} onClick={onProfileClick}></div>
      <h1 style={styles.title}>GeekSpand</h1>
      <div style={styles.points}>{points} Points</div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#AD2831',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  profileCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    cursor: 'pointer',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color:'#FFFBF5',
  },
  points: {
    fontSize: '1rem',
    paddingRight: '12px',
    color:'#FFFBF5',
  },
};

export default Header;