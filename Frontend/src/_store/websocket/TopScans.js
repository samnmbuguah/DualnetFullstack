import { addBots } from "_store/bots.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

const useTopScansWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [topScans, setTopScans] = useState([]);
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const socketIO = io(url, {
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts (in ms)
    });

    setSocket(socketIO);

    const handleConnect = () => {
      socketIO.emit("join", authUser[1].id);
      socketIO.emit("updateScans", { criteria: "percentageDifference", order: "desc" });
      socketIO.emit("getBotData", authUser[1].id);
      console.log("connected to top scans WebSocket");
    };

    const handleDisconnect = (reason) => {
      console.log("disconnected from top scans WebSocket. Reason:", reason);
    };

    const handleReconnectAttempt = (attempt) => {
      console.log(`Reconnection attempt ${attempt}`);
    };

    const handleReconnectFailed = () => {
      console.log("Reconnection failed");
    };

    const handleTopScans = (data) => {
      setTopScans(data);
    };

    const handleBotData = (data) => {
      dispatch(addBots(authUser[1].id, data));
      console.log(data, "botData");
    };

    socketIO.on("connect", handleConnect);
    socketIO.on("disconnect", handleDisconnect);
    socketIO.on("reconnect_attempt", handleReconnectAttempt);
    socketIO.on("reconnect_failed", handleReconnectFailed);
    socketIO.on("topScans", handleTopScans);
    socketIO.on("botData", handleBotData);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socketIO.off("connect", handleConnect);
      socketIO.off("disconnect", handleDisconnect);
      socketIO.off("reconnect_attempt", handleReconnectAttempt);
      socketIO.off("reconnect_failed", handleReconnectFailed);
      socketIO.off("topScans", handleTopScans);
      socketIO.off("botData", handleBotData);
      socketIO.disconnect();
    };
  }, [url, authUser, dispatch]);

  const updateTopScans = (criteria, order) => {
    console.log("updating top scans");

    if (socket) {
      socket.emit("updateScans", { criteria, order });
    }
  };

  const getOpenBots = () => {
    console.log("getting Open bots");

    if (socket) {
      socket.emit("getBotData", authUser[1].id);
    }
  };

  return { topScans, updateTopScans, getOpenBots };
};

export default useTopScansWebSocket;