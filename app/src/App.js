import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Missions from './pages/Missions';
import Skills from './pages/Skills';
import Events from './pages/Events';
import LeaderboardPage from './pages/LeaderboardPage';
import RedeemPoints from './pages/RedeemPoints';

const App = () => {
  const USERID ='1';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userID={USERID}/>} />
        <Route path="/missions" element={<Missions userID={USERID}/>} />
        <Route path="/skills" element={<Skills userID={USERID}/>} />
        <Route path="/events" element={<Events userID={USERID}/>} />
        <Route path="/leaderboard" element={<LeaderboardPage userID={USERID}/>} />
        <Route path='/redeem-points' element={<RedeemPoints userID={USERID}/>} />
      </Routes>
    </Router>
  );
};

export default App;