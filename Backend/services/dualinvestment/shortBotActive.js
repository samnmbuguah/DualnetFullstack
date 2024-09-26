const ShortBot = require('../../models/shortBotModel.js');

async function addShortBot(userId, currency, strikePrice, size) {
  try {
    const contract = currency + "_USDT";
    // Create a new ShortBot record
    const newShortBot = await ShortBot.create({
      userId,
      currency: contract,
      strikePrice,
      size,
      active: true,
    });

    console.log("ShortBot record added:", newShortBot);
    return newShortBot;
  } catch (error) {
    console.error("Error adding ShortBot record:", error);
    throw error;
  }
}

module.exports = addShortBot;