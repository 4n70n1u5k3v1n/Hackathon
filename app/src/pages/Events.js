import React, { useState } from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import ClientWebCam from "../components/ClientWebCam";
import "./Events.css"; // Import the CSS file
import ProfileSidebar from '../components/ProfileSidebar';


const Events = ({userID}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const handleProfileClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

  return (
    <div className="events-container">
      <Header onProfileClick={handleProfileClick} />
   
    
        <div className='events-content'
        style={{
          filter: isSidebarOpen ? 'blur(5px)' : 'none',
          opacity: isSidebarOpen ? 0.5 : 1,
          pointerEvents: isSidebarOpen ? 'none' : 'auto',
        }}
      >
      
      <div style={{ padding: "20px" }}>
        <h2>Events Page</h2>
        <EventList EventList userId={userID} />
        <ClientWebCam />
      </div>
      <Navbar />
      </div>
      {isSidebarOpen && (<ProfileSidebar onClose={() => setIsSidebarOpen(false)} style={{ left: isSidebarOpen ? '0' : '-50%' }} />)}
    </div>
    
  );
};

export default Events;
