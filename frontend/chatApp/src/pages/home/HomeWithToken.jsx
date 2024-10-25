import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

const HomeWithToken = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/sc/?token=${token}`);

    // Connection opened
    socket.onopen = () => {
      console.log('WebSocket connection established');
      
      // Example: Send a message to the WebSocket server
      socket.send('Hello, WebSocket!');
    };

    // Listen for messages
    socket.onmessage = (event) => {
      console.log('Message received from server:', event.data);
      
      // Add received message to the list of messages
      setReceivedMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Handle WebSocket errors
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Handle WebSocket closing
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup function to close the socket when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  // Function to send a new message via WebSocket
  const sendMessage = () => {
    if (message.trim()) {
      const socket = new WebSocket('ws://127.0.0.1:8000/ws/sc/');
      socket.onopen = () => {
        socket.send(message);
        setMessage('');
      };
      socket.onmessage = (event) => {
        console.log('Message received from server:', event.data);
        
        // Add received message to the list of messages
        setReceivedMessages((prevMessages) => [...prevMessages, event.data]);
      };
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>WebSocket Messages</h2>
        <div className='mt-20'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div>
          <h3>Received Messages:</h3>
          <ul>
            {receivedMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeWithToken;
