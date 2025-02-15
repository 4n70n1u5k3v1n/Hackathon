import React, { useState } from 'react';
import Header from '../components/Header';
import EventCarousel from '../components/EventCarousel';
import ChallengesList from '../components/ChallengesList';
import Leaderboard from '../components/Leaderboard';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          filter: isSidebarOpen ? 'blur(5px)' : 'none',
          opacity: isSidebarOpen ? 0.5 : 1,
          pointerEvents: isSidebarOpen ? 'none' : 'auto',
        }}
      >
        <Header onProfileClick={handleProfileClick} />
        <EventCarousel />
        <ChallengesList />
        <Leaderboard />
        <Navbar />
      </div>
      {isSidebarOpen && (<ProfileSidebar onClose={() => setIsSidebarOpen(false)} style={{ left: isSidebarOpen ? '0' : '-50%' }} />)}
    </div>
  );
};

export default Home;