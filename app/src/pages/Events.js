import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Events = () => {
  return (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h2>Events Page</h2>
        {/* Add events content here */}
      </div>
      <Navbar />
    </div>
  );
};

export default Events;