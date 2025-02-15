import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTasks, FaLaptopCode } from 'react-icons/fa';
import { GiPartyPopper, GiPodium } from 'react-icons/gi';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      {navLinks.map(({ path, icon }) => (
        <Link 
          key={path} 
          to={path} 
          style={{ 
            ...styles.link, 
            ...(location.pathname === path ? styles.activeLink : {}) 
          }}
        >
          {location.pathname === path && <span style={styles.circle}></span>}
          <span style={{
            ...styles.icon,
            transform: location.pathname === path ? 'translateY(-22px)' : 'none',  // This makes the active icon move up
          }}>
            {React.cloneElement(icon, { size: location.pathname === path ? 50 : 24, color: location.pathname === path ? 'black' : 'white' })}
          </span>
        </Link>
      ))}
    </nav>
  );
};

const navLinks = [
  { path: '/missions', icon: <FaTasks /> },
  { path: '/skills', icon: <FaLaptopCode /> },
  { path: '/', icon: <FaHome /> },
  { path: '/events', icon: <GiPartyPopper /> },
  { path: '/leaderboard', icon: <GiPodium /> }
];

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px',
    backgroundColor: '#AD2831',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1000,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    position: 'relative',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
  },
  activeLink: {
    color: 'black',
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    backgroundColor: '#FCBC08',
    borderRadius: '50%',
    left: '50%',
    transform: 'translate(-50%, -30%)',
  },
  icon: {
    position: 'relative',
    zIndex: 1,
    transition: 'transform 0.2s ease',
  }
};

export default Navbar;