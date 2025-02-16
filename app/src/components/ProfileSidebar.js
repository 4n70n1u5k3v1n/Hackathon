import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSidebar.css';
import { FaUserCircle } from "react-icons/fa";
import { getUserTags } from '../api/user'; // Import the function

const ProfileSidebar = ({ onClose, userID }) => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const data = await getUserTags(userID);
                console.log(data);
                if (data && Array.isArray(data)) {
                    setTags(data);
                }
            } catch (error) {
                console.error("Error fetching user tags:", error);
            }
        };
        fetchTags();
    }, [userID]);

    const handleClose = () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.animation = 'slideOutToLeft 0.3s ease-in-out';
            setTimeout(() => {
                onClose();
            }, 200);
        }
    };

    return (
        <div style={styles.sidebar} className='sidebar'>
            <button style={styles.closeButton} onClick={handleClose}>
                &times;
            </button>
            <div style={styles.header}>
                <FaUserCircle style={styles.profileIcon} />
                <span style={styles.username}>alice123</span>
                <div style={styles.tagContainer}>
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <span key={index} style={styles.tag}>{tag.tag_name}</span>
                        ))
                    ) : (
                        <span style={styles.noTags}>No Tags</span>
                    )}
                </div>
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
    animation: 'slideInFromLeft 0.3s ease-in-out',
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
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileIcon: {
    width: "50px",
    height: "50px",
    color: "#555",
  },
  username: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '5px',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    padding: '8px 15px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    display: 'inline-block',
  },
  menu: {
    marginTop: '20px',
    width: '100%',
  },
  menuItem: {
    padding: '10px 0',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    right: '20px',
  },
};


export default ProfileSidebar;