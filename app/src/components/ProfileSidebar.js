import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSidebar.css'; // Ensure this file contains the keyframes
import { FaUserCircle } from "react-icons/fa";

const ProfileSidebar = ({ onClose }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.style.animation = 'slideOutToLeft 0.3s ease-in-out'; // Trigger slide-out animation
          setTimeout(() => {
            onClose(); // Call the onClose prop after the animation completes
          }, 200); // Match the animation duration
        }
      };

  return (
    <div style={styles.sidebar} className='sidebar'>
      <button style={styles.closeButton} onClick={handleClose}>
        &times;
      </button>
      <div style={styles.header}>
        <FaUserCircle style={styles.profileIcon} />
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
    left: 0,
    width: '50%',
    minHeight: '96vh',
    backgroundColor: '#fff',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
    padding: '20px',
    animation: 'slideInFromLeft 0.3s ease-in-out', // Slide-in animation
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
  profileIcon: {
    width: "40px",
    height: "40px",
    color: "#555",  // Adjust color if needed
    cursor: "pointer",
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