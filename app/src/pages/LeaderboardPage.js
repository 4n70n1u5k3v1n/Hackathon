import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import { getLeaderboard } from '../api/leaderboard';
import "./LeaderboardPage.css";

const LeaderboardPage = ({userID}) => {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, []);

  if (users.length === 0) {
    return <p>Loading leaderboard...</p>;
  }

  const top3 = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  return (
    <div style={{paddingRight:'20px', marginLeft:'20px', backgroundColor:'#fffbf5'}}>
      <div
        style={{
          filter: isSidebarOpen ? 'blur(5px)' : 'none',
          opacity: isSidebarOpen ? 0.5 : 1,
          pointerEvents: isSidebarOpen ? 'none' : 'auto',
        }}
      >
      <Header onProfileClick={handleProfileClick} userID={userID}/>
      <div className="leaderboardPage-container">
        <h2 className="leaderboardPage-title">Leaderboard</h2>
        {/* Podium for Top 3 */}
        <div className="leaderboardPage-podium">
          {/* 2nd Place */}
          <div className="leaderboardPage-podiumSecond">
            <h3 className="leaderboardPage-podiumName">{top3[1]?.user_username}</h3>
            <p className="leaderboardPage-podiumPoints">{top3[1]?.user_gc} Points</p>
          </div>

          {/* 1st Place */}
          <div className="leaderboardPage-podiumFirst">
            <h3 className="leaderboardPage-podiumName">{top3[0]?.user_username}</h3>
            <p className="leaderboardPage-podiumPoints">{top3[0]?.user_gc} Points</p>
          </div>

          {/* 3rd Place */}
          <div className="leaderboardPage-podiumThird">
            <h3 className="leaderboardPage-podiumName">{top3[2]?.user_username}</h3>
            <p className="leaderboardPage-podiumPoints">{top3[2]?.user_gc} Points</p>
          </div>
        </div>

        {/* List of Remaining Users */}
        <div className="leaderboardPage-userList">
          {remainingUsers.map((user, index) => (
            <div key={user.user_id} className="leaderboardPage-userRow">
              <span className="leaderboardPage-userRank">{index + 4}.</span>
              <span className="leaderboardPage-userName">{user.user_username}</span>
              <span className="leaderboardPage-userPoints">{user.user_gc} Points</span>
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
