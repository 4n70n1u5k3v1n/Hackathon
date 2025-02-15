import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import ClientWebCam from "../components/ClientWebCam";

const Events = ({userID}) => {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Events Page</h2>
        <EventList EventList userId={userID}/> 
        <ClientWebCam />
      </div>
      <Navbar />
    </div>
  );
};

export default Events;
