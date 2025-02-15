import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ onClose }) => {
    const navigate = useNavigate();
  return (
    <div style={styles.sidebar}>
      <button style={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <div style={styles.header}>
        <div style={styles.profileCircle}></div>
        <span style={styles.username}>User123</span>
      </div>
      <div style={styles.menu}>
        <div style={styles.menuItem}>Change Profile</div>
        <div style={styles.menuItem} onClick={() => navigate('/redeem-points')}>Redeem Points</div>
      </div>
      <div style={styles.footer}>
        <div style={styles.menuItem}>Settings</div>
        <div style={styles.menuItem}>Log Out</div>
      </div>
    </div>
  );
};

const styles = {
    sidebar: {
        position: 'fixed',
        top: 0,
        width: '50%',
        height: '95%',
        backgroundColor: '#fff',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        zIndex: 1001,
        padding: '20px',
        transition: 'left 0.8s ease-in-out', // Add transition
        },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
  },
  username: {
    marginLeft: '10px',
    fontSize: '1.2rem',
  },
  menu: {
    marginBottom: '20px',
  },
  menuItem: {
    padding: '10px 0',
    cursor: 'pointer',
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
  },
};

export default ProfileSidebar;

