import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './Missions.css'; // Import the CSS file
import ProfileSidebar from '../components/ProfileSidebar';

const Missions = ({userID}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const challenges = [
    { id: 1, name: 'Join an Event', progress: '0/1', points: 100 },
    { id: 2, name: 'Create an Event', progress: '0/1', points: 200 },
    { id: 3, name: 'Exchange Skills with Another User', progress: '0/1', points: 300 },
  ];

  return (
    <div>
      <div
      style={{
        filter: isSidebarOpen ? 'blur(5px)' : 'none',
        opacity: isSidebarOpen ? 0.5 : 1,
        pointerEvents: isSidebarOpen ? 'none' : 'auto',
      }}
    >
    <Header onProfileClick={handleProfileClick} userID={userID}/>
      <div>
        <div className="mission-container">
          <h2 className="mission-title">Challenges</h2>
          {challenges.map((challenge) => (
            <div key={challenge.id} className="mission-card">
              <h3>{challenge.name}</h3>
              <p>
                {challenge.progress} - {challenge.points} Points
              </p>
            </div>
          ))}
        </div>
      </div>
      <Navbar />
      </div>
      {isSidebarOpen && (<ProfileSidebar onClose={() => setIsSidebarOpen(false)} style={{ left: isSidebarOpen ? '0' : '-50%' }} />)}
    </div>
  );
};

export default Missions;
