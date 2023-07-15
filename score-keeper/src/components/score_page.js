import React, { useEffect, useState } from 'react';
function App1() {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch('https://sanjay-singh-patel-studious-fiesta-w55v6xwvqx9cvvp4-8000.preview.app.github.dev/scores');
      const scores = await response.json();
      setScore1(scores.score1);
      setScore2(scores.score2);
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div>
      <h1>Score Keeper</h1>
      <div>
        <h2>Divij: {score1}</h2>
        
      </div>
      <div>
        <h2>Sanjay: {score2}</h2>
      </div>
    <button onClick={fetchScores}>Refresh</button>
    
    </div>
  );
}

export default App1;
