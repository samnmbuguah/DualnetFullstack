require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./config/Database.js");
const router = require("./routes/Routes.js");

const app = express();

// Database connection
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

module.exports = app;