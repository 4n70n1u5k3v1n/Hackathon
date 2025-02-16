import React from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProfileSidebar from '../components/ProfileSidebar';
import { getAllChallenges } from "../api/challenges";
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
// import ChallengesList from '../components/ChallengesList';
import "./Missions.css";

const Missions = ({userID}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [challenges, setChallenges] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);
  // const [selectedChallenge, setSelectedChallenge] = useState(null);
  // const [isDone, setIsDone] = useState(false);

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
        <div className="mission-container">
            <h2 className="mission-title">Challenges</h2>
            <div >
              {challenges.map(challenge => (
                <div key={challenge.bschallenge_id} className="mission-card">
                    <strong>{challenge.bschallenge_title}</strong>
                    <p>Points: {challenge.points}</p>
                    {/* <p>Description: {challenge.description}</p> */}
                </div>
              ))}
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
    </div>
  );
};

export default Missions;