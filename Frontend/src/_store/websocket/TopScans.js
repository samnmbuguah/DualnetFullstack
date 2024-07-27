
import { addBots } from "_store/bots.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

const useTopScansWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [topScans, setTopScans] = useState([]);
  const { user: authUser } = useSelector((x) => x.auth);
  const [updatedBotData, setUpdatedBotData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const socketIO = io(url);
    setSocket(socketIO);

    socketIO.on("connect", () => {
      socketIO.emit("join", authUser[1].id);
      console.log("connected to top scans WebSocket");
      socketIO.emit("updateScans", { criteria: "percentageDifference", order: "desc" });
      socketIO.emit("getBotData", authUser[1].id);
    });

    socketIO.on("disconnect", () => {
      console.log("disconnected from top scans WebSocket");
    });

    socketIO.on("topScans", (data) => {
      setTopScans(data);
    });

    socketIO.on("botData", (data) => {
      setUpdatedBotData(data);
      dispatch(addBots(authUser[1].id, data));
      console.log(data, "botData");
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
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
      socket.emit("getBotData",authUser[1].id);
    }
  };

  return { topScans, updateTopScans,getOpenBots, updatedBotData };
};

export default useTopScansWebSocket;
