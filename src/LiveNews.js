import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

function LiveNews() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    // Listen for news updates
    socket.on('news', (data) => {
      console.log('Received news data:', data);  // Log the entire data object
    
      // Directly check for title and url properties
      if (data && data.title && data.url) {
        console.log('Adding title to newsList:', data.title);  // Log the title being added
        setNewsList((prev) => {
          const updatedNewsList = [
            ...prev,
            { title: data.title, url: data.url }  // Store both title and URL
          ];
          console.log('Updated newsList:', updatedNewsList);  // Log the updated list
          return updatedNewsList;
        });
      } else {
        console.error('Received malformed data:', data);  // Log error if data is malformed
      }
    });
    
    return () => {
      socket.off('news');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live News Feed</h1>
      <ul>
        {newsList.length > 0 ? (
          newsList.map((news, idx) => (
            <li key={idx} className="p-2 m-2 bg-gray-200 rounded">
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {news.title}
              </a>
            </li>
          ))
        ) : (
          <li className="p-2 m-2 bg-gray-200 rounded">No news available</li>
        )}
      </ul>
    </div>
  );
}

export default LiveNews;
