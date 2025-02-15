import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { getLeaderboard } from '../api/leaderboard';
import "./LeaderboardPage.css";

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);

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
    <div className="container">
      <Header />
      <div>
        <h2 className="title">Leaderboard</h2>

        <div className="podium">
          <div className="podiumSecond">
            <h3 className="podiumName">{top3[1]?.user_username || 'N/A'}</h3>
            <p className="podiumPoints">{top3[1]?.user_gc || 0} Points</p>
          </div>

          <div className="podiumFirst">
            <h3 className="podiumName">{top3[0]?.user_username || 'N/A'}</h3>
            <p className="podiumPoints">{top3[0]?.user_gc || 0} Points</p>
          </div>

          <div className="podiumThird">
            <h3 className="podiumName">{top3[2]?.user_username || 'N/A'}</h3>
            <p className="podiumPoints">{top3[2]?.user_gc || 0} Points</p>
          </div>
        </div>

        <div className="userList">
          {remainingUsers.map((user, index) => (
            <div key={user.id} className="userRow">
              <span className="userRank">{index + 4}.</span>
              <span className="userName">{user.username}</span>
              <span className="userPoints">{user.user_gc} Points</span>
            </div>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default LeaderboardPage;
