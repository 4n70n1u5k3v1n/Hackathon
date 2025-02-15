import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Missions from './pages/Missions';
import Skills from './pages/Skills';
import Events from './pages/Events';
import LeaderboardPage from './pages/LeaderboardPage';
import RedeemPoints from './pages/RedeemPoints';

const App = () => {
  c
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/events" element={<Events />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path='/redeem-points' element={<RedeemPoints />} />
      </Routes>
    </Router>
  );
};

export default App;