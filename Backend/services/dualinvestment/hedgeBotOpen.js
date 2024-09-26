const DualHistory = require("../../models/DualHistoryModel");

/**
 * Opens the hedge bot for a specific currency and strike price.
 * @param {string} currency - The currency to filter the DualHistory.
 * @param {number} strikePrice - The strike price to filter the DualHistory.
 * @param {number} size - The size to update the shortSize field.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
async function hedgeBotOpen(currency, strikePrice, size) {
  try {
    // Fetch the DualHistory with the specific currency and strikePrice
    const dualHistory = await DualHistory.findOne({
      where: {
        currency: currency,
        strikePrice: strikePrice,
      },
    });

    if (!dualHistory) {
      throw new Error(
        `DualHistory not found for currency: ${currency} and strikePrice: ${strikePrice}`
      );
    }

    // Update the hedgeBotOpen field to true and shortSize field to the provided size
    await dualHistory.update({ 
      hedgeBotOpen: true,
      shortSize: size
    });

    console.log(
      `Hedge bot opened for currency: ${currency}, strikePrice: ${strikePrice}, and shortSize: ${size}`
    );
  } catch (error) {
    console.error("Error opening hedge bot:", error);
  }
}

module.exports = hedgeBotOpen;