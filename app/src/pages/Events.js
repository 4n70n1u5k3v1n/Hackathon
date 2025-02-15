import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ClientWebCam from "../components/ClientWebCam";

const Events = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>Events Page</h2>
          <ClientWebCam/>
        {/* Add events content here */}
      </div>
      <Navbar />
    </div>
  );
};

export default Events;