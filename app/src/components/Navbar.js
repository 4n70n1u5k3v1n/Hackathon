import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <Link to="/missions">Missions</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

export default Navbar;