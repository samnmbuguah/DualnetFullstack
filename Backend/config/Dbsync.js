const db = require('./Database.js'); 
const Users = require('../models/UserModel.js');
const MatchingPairs = require('../models/MatchingPairsModel.js');
const UserPDFs = require('../models/UserPDFsModel.js');
const Scans = require('../models/ScansModel.js');
const Bots = require('../models/BotsModel.js');
const TopScans = require('../models/TopScanModel.js');
const DualPlans = require('../models/DualPlansModel.js');
const DualHistory = require('../models/DualHistoryModel.js');
const AutoDual = require('../models/AutoDualModel.js');

console.log("Syncing Tables");
Users.sync()
  .then(() => {
    console.log("Users table has been synced");
    return Scans.sync();
  })
  .then(() => {
    console.log("Scans table has been synced");
    return MatchingPairs.sync();
  })
  .then(() => {
    console.log("MatchingPairs table has been synced");
    return UserPDFs.sync();
  })
  .then(() => {
    console.log("UserPDFs table has been synced");
    return Bots.sync();
  })
  .then(() => {
    console.log("Bots table has been synced");
    return TopScans.sync();
  })
  .then(() => {
    console.log("TopScans table has been synced");
    return DualPlans.sync({ alter: true });
  })
  .then(() => {
    console.log("DualPlans table has been synced");
    return DualHistory.sync({ alter: true });
  })
  .then(() => {
    console.log("DualHistory table has been synced");
    return AutoDual.sync({ alter: true });
  })
  .then(() => {
    console.log("AutoDual table has been synced");
    console.log("All tables have been synced");
  })
  .catch((error) => {
    console.log("Error occurred:", error);
  });