import React from 'react';
import { getAllChallenges } from "../api/challenges";
import { useState, useEffect } from 'react';

const ChallengesList = ({userId}) => {
  const [challenges, setChallenges] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isDone, setIsDone] = useState(false);

  useEffect (() => {
    const fetchChallenges = async () => {
      try {
        const data = await getAllChallenges('1');
        console.log (data);
        setChallenges(data.data);
        setLoading(false);
      } catch (err) {
        console.error ("Error fetching challenges:", err);
        setError("Failed to load challenges.");
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  if (loading) {
    return <p> Loading events... </p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Available Challenges</h2>
      {challenges
      .filter((challenge) => challenge.status === 'pending') // Filter challenges with 'pending' status
      .map((challenge) => (
        <div key={challenge.bschallenge_id} style={styles.challengeCard}>
          <h3>
            {challenge.bschallenge_title}
            {challenge.status === 'completed' && (
              <span style={{ marginLeft: '8px', color: 'green' }}>✔</span>
            )}
          </h3>
          <p>{challenge.points} Points</p>
        </div>
  ))}

    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
  },
  challengeCard: {
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default ChallengesList;