import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Skills = () => {
  const friends = [
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

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.title}>Skills Exchange</h2>
        <div style={styles.friendsList}>
          {friends.map((friend) => (
            <div key={friend.id} style={styles.friendCard}>
              <img src={friend.profilePic} alt={friend.name} style={styles.profilePic} />
              <div style={styles.friendInfo}>
                <h3 style={styles.username}>{friend.name}</h3>
                <p style={styles.skills}>Skills Want: {friend.skillsWant}</p>
                <p style={styles.skills}>Skills Offered: {friend.skillsOffered}</p>
              </div>
            </div>
          ))}
        </div>
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
};

export default Skills;