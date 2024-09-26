const openShort = require("./openShort.js");
const getSpotPrice = require("./getSpotPrice.js");
const DualHistory = require("../../models/DualHistoryModel.js");
const getFuturesContract = require("./getFuturesContract.js");

async function hedgeDuals() {
  try {
    // Fetch all records where settled is false and hedged is false
    const records = await DualHistory.findAll({
      where: {
        settled: false,
        hedged: false,
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

      // Check if the current price is lower than the strike price
      if (currentPrice < strikePrice) {
        const lastPrice = await getSpotPrice(contract);
        const quantoMultiplier = await getFuturesContract("usdt", contract);

        // Calculate the size
        let size;
        if (record.shortSize > 0) {
          size = Math.floor(parseFloat(record.shortSize) / (lastPrice * parseFloat(quantoMultiplier)));
        } else {
          size = Math.ceil(parseFloat(record.investAmount) / (lastPrice * parseFloat(quantoMultiplier)));
        }
        size = size * -1;

        try {
          // Open a short position and get the size
          await openShort("usdt", contract, size, record.userId);

          // Update the hedged field to true and hedgedAmount with -size
          record.hedged = true;
          record.hedgedAmount = -size;
          await record.save();
        } catch (error) {
          console.error(`Error opening short for record ${record.id}:`, error);
          // Continue to the next record
          continue;
        }
      }
    }

    console.log("Hedging process completed.");
  } catch (error) {
    console.error("Error during hedging process:", error);
  }
}

module.exports = hedgeDuals;