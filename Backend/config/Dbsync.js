const db = require('./Database.js'); 
const Users = require('../models/UserModel.js');
const MatchingPairs = require('../models/MatchingPairsModel.js');
const UserPDFs = require('../models/UserPDFsModel.js');
const Scans = require('../models/ScansModel.js');
const Bots = require('../models/BotsModel.js');
const TopScans = require('../models/TopScanModel.js');

console.log("Syncing Tables");
Scans.sync()
  .then(() => {
    console.log("Scans table has been synced");
    return Users.sync();
  })
  .then(() => {
    console.log("Users table has been synced");
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
    console.log("TopScans table has been created.");
  })
  .catch((error) => {
    console.log("Error occurred:", error);
  });
  