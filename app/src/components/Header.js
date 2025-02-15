import React, { useEffect, useState } from 'react';
import {getUserPoints} from '../api/user';
import { FaUserCircle } from "react-icons/fa";

  
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
  }, [points]);

  return (
    <header style={styles.header}>
     <FaUserCircle style={styles.profileIcon} onClick={onProfileClick} />
      <h1 style={styles.title}><span style={{color: '#6C92EB'}}>Ge</span>ek<span style={{color: '#4C956C'}}>Sp</span>a<span style={{color: '#FCBC08'}}>nd</span></h1>
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
  profileIcon: {
    width: "40px",
    height: "40px",
    color: "#555",  // Adjust color if needed
    cursor: "pointer",
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