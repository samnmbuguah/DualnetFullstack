require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const socketIO = require("socket.io");
const db = require("./config/Database.js");
const http = require("http");
const server = http.createServer(app);
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
  console.error("Missing PORT environment variable. Please check your .env file");
  process.exit(1);
}

try {
  db.authenticate();
  console.log("Connected to database");
} catch (error) {
  console.error("Database connection error:", error);
}

console.log("IN", process.env.ENVIRONMENT, "ENVIRONMENT");
const corsOptions = {
  origin: ["http://localhost:3000", "http://dualnet.ch"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const populateTables = require("./jobs/PopulateTables.js");
const StreamPrices = require("./services/StreamPrices.js");
const router = require("./routes/Routes.js");
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", router);

if (process.env.ENVIRONMENT !== "development") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.header("Access-Control-Allow-Origin", corsOptions.origin);
  res.header("Access-Control-Allow-Methods", corsOptions.methods.join(','));
  res.header("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(','));
  res.status(500).send("Something broke!");
});

const io = socketIO(server, { cors: corsOptions });

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (userId) => {
    console.log(`User ${userId} joined room`);
    socket.join(userId);
  });

  socket.on("getBotData", async (userId) => {
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

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  StreamPrices(io);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port or close the application using this port.`);
  } else {
    console.error('An error occurred while starting the server:', err);
  }
  process.exit(1);
});

// Schedule cron jobs
cron.schedule("* * * * *", async () => {
  try {
    await listDualInvestmentPlans();
    console.log("Executed listDualInvestmentPlans");
  } catch (error) {
    console.error("Error executing listDualInvestmentPlans:", error);
  }
});

cron.schedule("* * * * *", async () => {
  try {
    await runAutoDuals();
    console.log("Executed runAutoDuals");
  } catch (error) {
    console.error("Error executing runAutoDuals:", error);
  }
});

cron.schedule("0 8 * * *", async () => {
  try {
    await settleRecords();
    console.log("Executed settleRecords");
  } catch (error) {
    console.error("Error executing settleRecords:", error);
  }
}, {
  scheduled: true,
  timezone: "Etc/UTC",
});

cron.schedule('* * * * *', async () => {
    const bots = await Bots.findAll({ where: { isClose: false } });
    try {
        const botDataForUsers = await closeByProfit(io, bots);
        if (Object.keys(botDataForUsers).length === 0) {
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