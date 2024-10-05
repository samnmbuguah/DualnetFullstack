const io = require("socket.io-client");
const assert = require('assert');

class SocketTester {
  constructor(url = "http://localhost:3042") {
    this.socket = io(url, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    this.lastNonEmptyTopScansTimestamp = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.socket.on("connect", this.onConnect.bind(this));
    this.socket.on("disconnect", this.onDisconnect.bind(this));
    this.socket.on("error", this.onError.bind(this));
    this.socket.on("topScans", this.onTopScans.bind(this));
    this.socket.on("botData", this.onBotData.bind(this));
    this.socket.on("pong", () => console.log("Received pong from server"));
  }

  onConnect() {
    console.log("Connected to the server");
    this.socket.emit("join", 3);
    this.startUpdateScansInterval();
    this.startPingInterval();
  }

  onDisconnect(reason) {
    console.log("Disconnected from the server. Reason:", reason);
  }

  onError(error) {
    console.error("Received error from the server:", error);
  }

  onTopScans(data) {
    if (data && data.length > 0) {
      const currentTimestamp = Date.now();
      if (this.lastNonEmptyTopScansTimestamp) {
        const timeDifference = (currentTimestamp - this.lastNonEmptyTopScansTimestamp) / 60000;
        console.log(`Time since last non-empty topScans: ${timeDifference.toFixed(2)} Minutes`);
      }
      this.lastNonEmptyTopScansTimestamp = currentTimestamp;
      console.log("Received topScans from the server:", data[0]);
      this.runTopScansTests(data);
    } else {
      console.log("Received empty topScans data");
    }
  }

  onBotData(data) {
    console.log("Received botData from the server:", data);
    this.runBotDataTests(data);
  }

  startUpdateScansInterval() {
    setInterval(() => {
      console.log("Sending updateScans event to the server");
      this.socket.emit("updateScans", { criteria: "percentageDifference", order: "desc" });
    }, 600000); // 10 minutes
  }

  startPingInterval() {
    setInterval(() => {
      console.log("Sending ping to server");
      this.socket.emit("ping");
    }, 30000); // 30 seconds
  }

  runTopScansTests(data) {
    try {
      assert(Array.isArray(data), "topScans should be an array");
      assert(data.length <= 10, "topScans should have at most 10 items");
      if (data.length > 0) {
        assert(typeof data[0].percentageDifference === 'number', "percentageDifference should be a number");
        assert(typeof data[0].updatedAt === 'string', "updatedAt should be a string");
      }
      console.log("All topScans tests passed");
    } catch (error) {
      console.error("topScans test failed:", error.message);
    }
  }

  runBotDataTests(data) {
    try {
      assert(typeof data === 'object', "botData should be an object");
      // Add more specific tests based on your botData structure
      console.log("All botData tests passed");
    } catch (error) {
      console.error("botData test failed:", error.message);
    }
  }

  close() {
    this.socket.close();
  }
}

// Usage
const tester = new SocketTester();

// Close the connection after 1 hour
setTimeout(() => {
  console.log("Test completed. Closing connection.");
  tester.close();
}, 3600000);
