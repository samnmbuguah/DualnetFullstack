require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const socketIO = require("socket.io");
const server = require("http").createServer(app); // Create server with Express app
const checkTrades = require("./services/checkTrades.js");
const closeByProfit = require("./services/closeByProfit.js");
const updateFundingRate = require("./services/getFundingRate.js");
const listDualInvestmentPlans = require("./services/dualinvestment/dualInvestment.js");
const updateAccumulatedFunding = require("./services/updateAccumulatedFunding.js");
const runAutoDuals = require("./services/dualinvestment/runAutoDuals.js");
const Bots = require("./models/BotsModel.js");
const settleRecords = require("./services/dualinvestment/settle.js");
const hedgeDuals = require("./services/dualinvestment/hedgeDuals.js");
const closeHedges = require("./services/dualinvestment/closeHedges.js");
const manageShortBots = require("./services/dualinvestment/shortBot.js");

// Check for required environment variables
if (!process.env.PORT) {
  console.error(
    "Missing PORT environment variable. Please check your .env file"
  );
  process.exit(1);
}

// CORS configuration
console.log("IN", process.env.ENVIRONMENT, "ENVIRONMENT");
let corsOptions = {
  origin: [
    "https://dualnet-production.up.railway.app",
    "http://localhost:3042",
    "http://localhost:3000",
    "http://dualnet.railway.internal",
    "http://172.16.5.4:3000",
    "https://dualnet.ch",
    "http://dualnet.ch",
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

if (process.env.ENVIRONMENT === "development") {
  corsOptions = { 
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }; // Allow all origins in development
}

// Use the cors middleware with the options
app.use(cors(corsOptions));

// Add a pre-flight route for OPTIONS requests
app.options('*', cors(corsOptions));

const populateTables = require("./jobs/PopulateTables.js");
const StreamPrices = require("./services/StreamPrices.js");
const router = require("./routes/Routes.js");
const PORT = process.env.PORT || 3042;

app.use(express.json());
app.use("/api", router);

if (process.env.ENVIRONMENT !== "development") {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  // All other GET requests not handled before will return our React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/build", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.header("Access-Control-Allow-Origin", corsOptions.origin);
  res.header("Access-Control-Allow-Methods", corsOptions.methods.join(','));
  res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(','));
  res.status(500).send("Something broke!");
});

// Create the WebSocket server
const io = socketIO(server, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (userId) => {
    console.log(`User ${userId} joined room`);
    socket.join(userId);
  });

  // Listen for 'getBotData' event from the client
  socket.on("getBotData", async (userId) => {
    // Fetch all bots where isClose is false and userId matches the provided userId
    const bots = await Bots.findAll({
      where: { isClose: false, userId: userId },
    });
    if (bots.length) {
      try {
        await closeByProfit(io, bots);
        console.log("Completed the Close By profit loop");
      } catch (error) {
        console.error("Error closing trades:", error);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  StreamPrices(io); // Start streaming prices after the server has started
});

// Schedule the cron job to run listDualInvestmentPlans once every 1 minute
cron.schedule("* * * * *", async () => {
  try {
    await listDualInvestmentPlans();
    console.log("Executed listDualInvestmentPlans");
  } catch (error) {
    console.error("Error executing listDualInvestmentPlans:", error);
  }
});

// Schedule the cron job to run runAutoDuals once every 1 minute
cron.schedule("* * * * *", async () => {
  try {
    await runAutoDuals();
    console.log("Executed runAutoDuals");
  } catch (error) {
    console.error("Error executing runAutoDuals:", error);
  }
});

// Schedule the cron job to run settleRecords every day at 8:00 AM UTC
cron.schedule(
  "0 8 * * *",
  async () => {
    try {
      await settleRecords();
      console.log("Executed settleRecords");
    } catch (error) {
      console.error("Error executing settleRecords:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Etc/UTC",
  }
);

// // New cron job to run manageShortBots every second
// cron.schedule("* * * * * *", async () => {
//   try {
//     await manageShortBots();
//     console.log("Executed manageShortBots");
//   } catch (error) {
//     console.error("Error executing manageShortBots:", error);
//   }
// });

// // New cron job to run hedgeDuals and closeHedges every 10 seconds
// cron.schedule("*/10 * * * * *", async () => {
//   try {
//     await hedgeDuals();
//     console.log("Executed hedgeDuals");
//   } catch (error) {
//     console.error("Error executing hedgeDuals:", error);
//   }

//   try {
//     await closeHedges();
//     console.log("Executed closeHedges");
//   } catch (error) {
//     console.error("Error executing closeHedges:", error);
//   }
// }, {
//   scheduled: true,
//   timezone: "Etc/UTC"
// });

cron.schedule('* * * * *', async () => {
    // Fetch all bots where isClose is false
    const bots = await Bots.findAll({ where: { isClose: false } });
    
    try {
        const botDataForUsers = await closeByProfit(io, bots);
        
        if (Object.keys(botDataForUsers).length === 0) {
            // If no active bots, emit an empty botDataForUsers object to all connected clients
            io.emit("botData", {});
        }
        
        console.log('Completed the Close By profit loop');
    } catch (error) {
        console.error('Error in closeByProfit:', error);
    }
});

cron.schedule('0 0 * * *', populateTables);
cron.schedule('0 */8 * * *', updateAccumulatedFunding);
cron.schedule('*/10 * * * *', updateFundingRate);
checkTrades();
