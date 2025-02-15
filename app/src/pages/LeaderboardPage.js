import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import "./LeaderboardPage.css"; // Import the CSS file

const LeaderboardPage = ({userID}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const users = [
    { id: 1, name: 'User1', points: 5000 },
    { id: 2, name: 'User2', points: 4500 },
    { id: 3, name: 'User3', points: 4000 },
    { id: 4, name: 'User4', points: 3500 },
    { id: 5, name: 'User5', points: 3000 },
    { id: 6, name: 'User6', points: 2500 },
    { id: 7, name: 'User7', points: 2000 },
  ];

  const top3 = users.slice(0, 3); // Top 3 users for the podium
  const remainingUsers = users.slice(3); // Remaining users for the list

  return (
    <div className='container'>
      <div
        style={{
          filter: isSidebarOpen ? 'blur(5px)' : 'none',
          opacity: isSidebarOpen ? 0.5 : 1,
          pointerEvents: isSidebarOpen ? 'none' : 'auto',
        }}
      >
      <Header onProfileClick={handleProfileClick}/>
      <div style={styles.container}>
        <h2 className='title'>Leaderboard</h2>

        {/* Podium for Top 3 */}
        <div className="podium">
          {/* 2nd Place */}
          <div className="podiumSecond">
            <h3 className="podiumName">{top3[1].name}</h3>
            <p className="podiumPoints">{top3[1].points} Points</p>
          </div>

          {/* 1st Place */}
          <div className="podiumFirst">
            <h3 className="podiumName">{top3[0].name}</h3>
            <p className="podiumPoints">{top3[0].points} Points</p>
          </div>

          {/* 3rd Place */}
          <div className="podiumThird">
            <h3 className="podiumName">{top3[2].name}</h3>
            <p className="podiumPoints">{top3[2].points} Points</p>
          </div>
        </div>

        {/* List of Remaining Users */}
        <div className="userList">
          {remainingUsers.map((user, index) => (
            <div key={user.id} className="userRow">
              <span className="userRank">{index + 4}.</span>
              <span className="userName">{user.name}</span>
              <span className="userPoints">{user.points} Points</span>
            </div>
          ))}
        </div>
      </div>
      </div>
      <Navbar />
      {isSidebarOpen && (<ProfileSidebar onClose={() => setIsSidebarOpen(false)} style={{ left: isSidebarOpen ? '0' : '-50%' }} />)}
    </div>
  );
};

export default LeaderboardPage;
