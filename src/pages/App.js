import React, { useState } from 'react';
import { BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import './App.css';

const App = () => {
  const [pollData, setPollData] = useState({ sad: 0, happy: 0, moderate: 0 });
  const [voted, setVoted] = useState(false);

  const handleVote = (option) => {
    setPollData((prevData) => ({
      ...prevData,
      [option]: prevData[option] + 1,
    }));
    setVoted(true);
  };

  // Bar Chart component to display poll results
  const Chart = () => {
    const chartData = [
      { name: 'Sad', votes: pollData.sad },
      { name: 'Happy', votes: pollData.happy },
      { name: 'Moderate', votes: pollData.moderate },
    ];

    return (
      <div className="chart-container">
        <h2>Poll Results</h2>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="votes" fill="#007bff" />
        </BarChart>
      </div>
    );
  };

  const Poll = () => {
    return (
      <div className="poll-container">
        <h2>How do you feel about this news?</h2>
        <div className="button-group">
          <button className="poll-button" onClick={() => handleVote('sad')}>
            Sad
          </button>
          <button className="poll-button" onClick={() => handleVote('happy')}>
            Happy
          </button>
          <button className="poll-button" onClick={() => handleVote('moderate')}>
            Moderate
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BriefMinds</h1>
      </header>
      <div className="news-container">
        <h2>Today's News</h2>
        <p>Assam got hit by earthquake. Richter scale's mesaurement showed that the magnnitude was 2.9</p>
      </div>
      {!voted ? <Poll /> : <Chart />}
    </div>
  );
};

export default App;