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

    socket.on('news', (data) => {
      console.log('Received news data:', data);  
    
      if (data && data.title && data.url) {
        console.log('Adding title to newsList:', data.title);  
        setNewsList((prev) => {
          const updatedNewsList = [
            ...prev,
            { title: data.title, url: data.url }  
          ];
          console.log('Updated newsList:', updatedNewsList);  
          return updatedNewsList;
        });
      } else {
        console.error('Received malformed data:', data);  
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
