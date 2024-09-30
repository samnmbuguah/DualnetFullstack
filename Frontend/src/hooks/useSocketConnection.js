import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { fetchWrapper } from '_helpers';

export function useSocketConnection(authUser, users) {
  const [socket, setSocket] = useState(null);
  const [reward, setReward] = useState({});
  const [hedge, setHedge] = useState({});

  useEffect(() => {
    const socketInitializer = async () => {
      let api_url = fetchWrapper.api_url;
      const newSocket = io(`${api_url}`, {
        reconnection: true,
        reconnectionAttempts: 100,
        reconnectionDelay: 5000,
      });

      newSocket.on('connect', () => {
        console.log('connected');
        reqSocket(newSocket);
      });

      newSocket.on('update-information', (res) => {
        let data = JSON.parse(res);
        updateUserData(data);
      });

      // ... (keep other socket event listeners)

      setSocket(newSocket);
    };

    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authUser]);

  const reqSocket = (socket) => {
    if (authUser[1].usertype === 1) {
      socket.emit("allInfo", 1);
    }
    socket.emit("oneInfo", authUser[1].id);
  };

  const updateUserData = (data) => {
    // Implement the logic to update user data
    // This function should update the reward and hedge states
    setReward(data[0] || {});
    setHedge(data[1] || {});
  };

  return { socket, reward, hedge };
}