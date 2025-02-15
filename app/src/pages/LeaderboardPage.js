import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProfileSidebar from '../components/ProfileSidebar';
import { getLeaderboard } from '../api/leaderboard';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the loading spinner
import "./LeaderboardPage.css";

const LeaderboardPage = ({ userID }) => {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div>
        <Header onProfileClick={handleProfileClick} userID={userID} />
        <LoadingSpinner /> {/* Replace plain text with LoadingSpinner */}
        <Navbar />
      </div>
    );
  }

  const top3 = users.slice(0, 3);
  const remainingUsers = users.slice(3);

  return (
    <div>
      <Header onProfileClick={handleProfileClick} userID={userID} />
      <div className="leaderboardPage-container">
        <h2 className="leaderboardPage-title">Leaderboard</h2>
        
        {/* Podium for Top 3 */}
        <div className="leaderboardPage-podium">
          <div className="leaderboardPage-podiumSecond">
            <h3 className="leaderboardPage-podiumName">{top3[1]?.user_username}</h3>
            <p className="leaderboardPage-podiumPoints">{top3[1]?.user_gc} Points</p>
          </div>

          <div className="leaderboardPage-podiumFirst">
            <h3 className="leaderboardPage-podiumName">{top3[0]?.user_username}</h3>
            <p className="leaderboardPage-podiumPoints">{top3[0]?.user_gc} Points</p>
          </div>

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

      <Navbar />
      {isSidebarOpen && (
        <ProfileSidebar onClose={() => setIsSidebarOpen(false)} style={{ left: isSidebarOpen ? '0' : '-50%' }} />
      )}
    </div>
  );
};

export default LeaderboardPage;
