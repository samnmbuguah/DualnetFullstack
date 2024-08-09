const Scans = require("../models/ScansModel");
const TopScans = require("../models/TopScanModel");
const isLastPercentageDifferenceHigher = require("./statisticsService.js");
const moment = require("moment");
const { Op } = require("sequelize");

async function getTopScan() {
  try {
    const topScan = await Scans.findAll({
      where: {
        updatedAt: {
          [Op.gte]: moment().subtract(1, "minutes").toDate(),
        },
        fundingRate: {
          [Op.gte]: 0.01,
        },
      },
      order: [["percentageDifference", "DESC"]],
      limit: 1,
    });

    if (topScan.length > 0) {
      const scan = topScan[0];
      await TopScans.create({
        matchingPairId: scan.matchingPairId,
        spotPrice: scan.spotPrice,
        futuresPrice: scan.futuresPrice,
        valueDifference: scan.valueDifference,
        percentageDifference: scan.percentageDifference,
      });
      console.log("Top scan saved to TopScans table.");
      let shouldTrade = isLastPercentageDifferenceHigher();
      return shouldTrade;
    } else {
      console.log("No top scan found.");
    }
  } catch (error) {
    console.error("Error creating TopScan:", error);
  }
}

module.exports = getTopScan;
