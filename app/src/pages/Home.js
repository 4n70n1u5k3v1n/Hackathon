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
    <div className="home-container">
      <div
        className={`blur-overlay ${isSidebarOpen ? 'blur-overlay-active' : ''}`}
      >
        <Header onProfileClick={handleProfileClick} />
        <EventCarousel />
        <ChallengesList />
        <Leaderboard />
        <Navbar />
      </div>
      {isSidebarOpen && (
        <ProfileSidebar
          onClose={() => setIsSidebarOpen(false)}
          className={isSidebarOpen ? 'profile-sidebar-open' : 'profile-sidebar-closed'}
        />
      )}
    </div>
  );
};

export default Home;
