import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import ClientWebCam from "../components/ClientWebCam";
import "./Events.css"; // Import the CSS file

const Events = ({ userID }) => {
  return (
    <div className="events-container">
      <Header />
      <div className="events-content">
        <h2>Events Page</h2>
        <EventList EventList userId={userID} />
        <ClientWebCam />
      </div>
      <Navbar />
    </div>
  );
};

export default Events;
