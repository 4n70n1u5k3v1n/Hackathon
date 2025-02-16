import React, { useState } from 'react';
import Header from '../components/Header';
import EventCarousel from '../components/EventCarousel';
import ChallengesList from '../components/ChallengesList';
import Leaderboard from '../components/Leaderboard';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import "./Home.css"; // Import the CSS file

const Home = ({ userID }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div
        className={`home-blur-overlay ${isSidebarOpen ? 'home-blur-overlay-active' : ''}`}>
        <Header onProfileClick={handleProfileClick} userID={userID} />
        <div className="home-container">
            <EventCarousel  userID={userID}/>
            <ChallengesList />
            <Leaderboard />
        </div>
        <Navbar />
      </div>
      {isSidebarOpen && (
        <ProfileSidebar
          onClose={() => setIsSidebarOpen(false)}
          userID={userID} 
          className={isSidebarOpen ? 'home-profile-sidebar-open' : 'home-profile-sidebar-closed'}
        />
      )}
    </div>
  );
};

export default Home;
