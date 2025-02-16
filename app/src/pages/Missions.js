import React from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProfileSidebar from '../components/ProfileSidebar';
import { getAllChallenges } from "../api/challenges";
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Missions = ({userID}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [challenges, setChallenges] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect (() => {
    const fetchChallenges = async () => {
      try {
        const data = await getAllChallenges(userID);
        console.log ('fetch chall:', data.data);
        setChallenges(data.data);
        setLoading(false);
      } catch (err) {
        console.error ("Error fetching challenges:", err);
        setError("Failed to load challenges.");
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header onProfileClick={handleProfileClick} userID={userID} />
        <div className="events-container"></div>
          <div style={styles.container}>
            <h2>Available Challenges</h2>
            <ul style={styles.missionList}>
              {challenges.map(challenge => (
                <li key={challenge.bschallenge_id} style={styles.challengeItem}>
                    <strong>{challenge.bschallenge_title}</strong>
                    <p>Points: {challenge.points}</p>
                    {/* <p>Description: {challenge.description}</p> */}
                </li>
              ))}
            </ul>
          </div>
        <Navbar />

        {/* Profile Sidebar */}
        {isSidebarOpen && (
          <ProfileSidebar
              onClose={() => setIsSidebarOpen(false)}
              style={{ left: isSidebarOpen ? '0' : '-50%' }}
          />
        )}
      </div>
  );
  
};

const styles = {
  container: {
      padding: "20px",
      backgroundColor: "#fffbf5",
      borderRadius: "10px",
      maxWidth: "600px",
      margin: "auto",
  },
  missionList: {
      listStyleType: "none",
      padding: 0,
  },
  challengeItem: {
      backgroundColor: "#ffffff",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
  },
  popupContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  },
  popup: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  registerButton: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
  },
};

export default Missions;