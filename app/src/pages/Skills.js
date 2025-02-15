import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Skills = ({userID}) => {
  // Dummy data for listings
  const initialListings = [
    {
      id: 1,
      name: 'User123',
      profilePic: 'https://via.placeholder.com/50',
      skillsWant: 'Python',
      skillsOffered: 'Java',
    },
    {
      id: 2,
      name: 'User456',
      profilePic: 'https://via.placeholder.com/50',
      skillsWant: 'Photography',
      skillsOffered: 'Cooking',
    },
    {
      id: 3,
      name: 'User789',
      profilePic: 'https://via.placeholder.com/50',
      skillsWant: 'UI/UX Design',
      skillsOffered: 'Graphic Design',
    },
  ];

  // State for managing listings, requested, incoming, and accepted
  const [listings, setListings] = useState(initialListings);
  const [requested, setRequested] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [accepted, setAccepted] = useState([]);

  // State for active tab
  const [activeTab, setActiveTab] = useState('listings');

  // Function to handle skill request
  const handleRequest = (user) => {
    setRequested([...requested, user]); // Add to requested
    setListings(listings.filter((listing) => listing.id !== user.id)); // Remove from listings
  };

  // Function to handle cancel request
  const handleCancelRequest = (user) => {
    setListings([...listings, user]); // Add back to listings
    setRequested(requested.filter((req) => req.id !== user.id)); // Remove from requested
  };

  // Function to handle incoming requests (accept or reject)
  const handleIncomingRequest = (user, action) => {
    if (action === 'accept') {
      setAccepted([...accepted, user]); // Add to accepted
    }
    setIncoming(incoming.filter((req) => req.id !== user.id)); // Remove from incoming
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.title}>Skills Exchange</h2>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={activeTab === 'listings' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('listings')}
          >
            Listings
          </button>
          <button
            style={activeTab === 'requested' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('requested')}
          >
            Requested
          </button>
          <button
            style={activeTab === 'incoming' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('incoming')}
          >
            Incoming
          </button>
          <button
            style={activeTab === 'accepted' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted
          </button>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div style={styles.friendsList}>
            {listings.map((user) => (
              <div key={user.id} style={styles.friendCard}>
                <img src={user.profilePic} alt={user.name} style={styles.profilePic} />
                <div style={styles.friendInfo}>
                  <h3 style={styles.username}>{user.name}</h3>
                  <p style={styles.skills}>Skills Want: {user.skillsWant}</p>
                  <p style={styles.skills}>Skills Offered: {user.skillsOffered}</p>
                </div>
                <button style={styles.requestButton} onClick={() => handleRequest(user)}>
                  Request
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Requested Tab */}
        {activeTab === 'requested' && (
          <div style={styles.friendsList}>
            {requested.map((user) => (
              <div key={user.id} style={styles.friendCard}>
                <img src={user.profilePic} alt={user.name} style={styles.profilePic} />
                <div style={styles.friendInfo}>
                  <h3 style={styles.username}>{user.name}</h3>
                  <p style={styles.skills}>Skills Want: {user.skillsWant}</p>
                  <p style={styles.skills}>Skills Offered: {user.skillsOffered}</p>
                </div>
                <button
                  style={styles.cancelButton}
                  onClick={() => handleCancelRequest(user)}
                >
                  Cancel Request
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Incoming Tab */}
        {activeTab === 'incoming' && (
          <div style={styles.friendsList}>
            {incoming.map((user) => (
              <div key={user.id} style={styles.friendCard}>
                <img src={user.profilePic} alt={user.name} style={styles.profilePic} />
                <div style={styles.friendInfo}>
                  <h3 style={styles.username}>{user.name}</h3>
                  <p style={styles.skills}>Skills Want: {user.skillsWant}</p>
                  <p style={styles.skills}>Skills Offered: {user.skillsOffered}</p>
                </div>
                <div style={styles.actions}>
                  <button
                    style={styles.acceptButton}
                    onClick={() => handleIncomingRequest(user, 'accept')}
                  >
                    ✓
                  </button>
                  <button
                    style={styles.rejectButton}
                    onClick={() => handleIncomingRequest(user, 'reject')}
                  >
                    ✗
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Accepted Tab */}
        {activeTab === 'accepted' && (
          <div style={styles.friendsList}>
            {accepted.map((user) => (
              <div key={user.id} style={styles.friendCard}>
                <img src={user.profilePic} alt={user.name} style={styles.profilePic} />
                <div style={styles.friendInfo}>
                  <h3 style={styles.username}>{user.name}</h3>
                  <p style={styles.skills}>Skills Want: {user.skillsWant}</p>
                  <p style={styles.skills}>Skills Offered: {user.skillsOffered}</p>
                </div>
                <button
                  style={styles.chatButton}
                  onClick={() => window.open('https://telegram.me/username', '_blank')}
                >
                  Chat on Telegram
                </button>
              </div>
            ))}
          </div>
        )}
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
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
  },
  activeTab: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  friendsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  friendCard: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '15px',
  },
  profilePic: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
  },
  friendInfo: {
    flex: 1,
  },
  username: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  skills: {
    margin: '5px 0',
    fontSize: '0.9rem',
    color: '#555',
  },
  requestButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  acceptButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  chatButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Skills;