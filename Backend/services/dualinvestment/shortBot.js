const openShort = require("./openShort.js");
const closeShort = require("./closeShort.js");
const getSpotPrice = require("./getSpotPrice.js");
const ShortBot = require("../../models/shortBotModel.js");

async function manageShortBots() {
  try {
    // Fetch all ShortBots where active is true and open is false
    const shortBotsToOpen = await ShortBot.findAll({
      where: {
        active: true,
        open: false,
      },
    });

    // Iterate over the fetched records and open short if trigger price is lower than current price
    if (shortBotsToOpen.length > 0) {
      for (const bot of shortBotsToOpen) {
        const currentPrice = await getSpotPrice(bot.currency);
        if (currentPrice !== null && currentPrice < bot.strikePrice) {
          await openShort("usdt", bot.currency, bot.size, bot.userId);
          await bot.update({ open: true });
          console.log(`Opened short for bot ID: ${bot.id}`);
        }
      }
    }

    // Fetch all ShortBots where active is true and open is true
    const shortBotsToClose = await ShortBot.findAll({
      where: {
        active: true,
        open: true,
      },
    });

    // Iterate over the fetched records and close short if current price is higher than trigger price
    if (shortBotsToClose.length > 0) {
      for (const bot of shortBotsToClose) {
        const currentPrice = await getSpotPrice(bot.currency);
        if (currentPrice !== null && currentPrice > bot.strikePrice) {
          await closeShort(bot.currency, bot.size, bot.userId);
          await bot.update({ open: false });
          console.log(`Closed short for bot ID: ${bot.id}`);
        }
      }
    }
  } catch (error) {
    console.error("Error managing short bots:", error);
  }
}

module.exports = manageShortBots;