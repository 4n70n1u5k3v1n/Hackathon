import React from 'react';

const Header = ({ onProfileClick }) => {
  return (
    <header style={styles.header}>
      <div style={styles.profileCircle} onClick={onProfileClick}></div>
      <h1 style={styles.title}>Challenge Platform</h1>
      <div style={styles.points}>1000 Points</div>
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
    position: 'sticky',
    top: 0,
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
  },
  points: {
    fontSize: '1rem',
  },
};

export default Header;