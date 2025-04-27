// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Optional for styling

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await axios.post("http://localhost:5000/summarize", {
        text: text,
      });

      if (response.data.summary.includes("Error during summarization")) {
        setError(response.data.summary);
      } else {
        setSummary(response.data.summary);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>📰 News Summarizer</h1>
      
      <textarea
        rows={8}
        placeholder="Paste your news article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="error">{error}</p>}
      
      {summary && (
        <div className="summary-box">
          <h3>📝 Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
