import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';


const Skills = ({userID}) => {
    const programmingLanguages = [
        'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'Swift', 'Go', 'PHP', 'Kotlin'
      ];

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

  // State for pop-up visibility
  const [showPopup, setShowPopup] = useState(false);

  // State for form inputs
  const [skillsWant, setSkillsWant] = useState('');
  const [skillsOffered, setSkillsOffered] = useState('');

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

  // Function to handle form submission
  const handleSubmit = () => {
    if (!skillsWant || !skillsOffered) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in both fields!',
      });
      return;
    }

    // Add the new listing (dummy data for now)
    const newListing = {
      id: listings.length + 1,
      name: 'Current User',
      profilePic: 'https://via.placeholder.com/50',
      skillsWant,
      skillsOffered,
    };
    setListings([...listings, newListing]);

    // Show success animation
    Swal.fire({
      icon: 'success',
      title: 'Listing Created!',
      text: 'Your skills exchange listing has been added.',
      showConfirmButton: false,
      timer: 1500,
    });

    // Reset form and close pop-up
    setSkillsWant('');
    setSkillsOffered('');
    setShowPopup(false);
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

      {/* Floating Action Button */}
      <button style={styles.floatingButton} onClick={() => setShowPopup(true)}>
        +
      </button>

      {/* Pop-up Container */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContainer}>
            <h2>Create Skills Exchange Listing</h2>
            <select value={skillsWant} onChange={(e) => setSkillsWant(e.target.value)} style={styles.input}>
                <option value="">Select a skill you want</option>
                {programmingLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <select value={skillsOffered} onChange={(e) => setSkillsOffered(e.target.value)} style={styles.input}>
                <option value="">Select a skill you offer</option>
                {programmingLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            <button style={styles.submitButton} onClick={handleSubmit}>
              Enter
            </button>
            <button style={styles.closeButton} onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

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
  floatingButton: {
    position: 'fixed',
    bottom: '80px', // Above the navbar
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 1000,
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  popupContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px 5px',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px 5px',
  },
};

export default Skills;