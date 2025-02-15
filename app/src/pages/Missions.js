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
      
    <Header onProfileClick={handleProfileClick} userID={userID}/>
      <div>
        <div className="mission-container">
          <h2 className="mission-title league-spartan-bold">Challenges</h2>
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
      
      {isSidebarOpen && (<ProfileSidebar onClose={() => setIsSidebarOpen(false)} style={{ left: isSidebarOpen ? '0' : '-50%' }} />)}
    </div>
  );
};

export default Missions;
