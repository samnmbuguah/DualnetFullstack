const closeShort = require("./closeShort.js");
const getSpotPrice = require("./getSpotPrice.js");
const DualHistory = require("../../models/DualHistoryModel.js");

async function closeHedges() {
  try {
    // Fetch all records where settled is false and hedged is true
    const records = await DualHistory.findAll({
      where: {
        settled: false,
        hedged: true,
        hedgeBotOpen: true,
      },
    });

    // Iterate over each record
    for (const record of records) {
      // Construct the contract string
      const contract = record.currency + "_USDT";

      // Get the current spot price
      const currentPrice = await getSpotPrice(contract);

      // Convert strikePrice to a number
      const strikePrice = parseFloat(record.strikePrice);

      // Check if the current price is higher than the strike price
      if (currentPrice > strikePrice) {
        // Close the short position
        await closeShort(contract, record.hedgedAmount, record.userId);

        // Update the hedged field to false
        record.hedged = false;
        await record.save();
      }
    }

    console.log("Closing hedges process completed.");
  } catch (error) {
    console.error("Error during closing hedges process:", error);
  }
}

module.exports = closeHedges;

// Run the closing hedges process
// closeHedges();
