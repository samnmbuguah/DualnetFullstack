const getTopScan = require("./getTopScan.js");
const trade = require("./trade.js");
const cron = require("node-cron");
const setLeverage = require("./setLeverage.js");

let job;

async function autoBot(
  pair,
  amount,
  lastPrice,
  quantoMultiplier,
  takerFeeRate,
  subClientId,
  leverage,
  fundingRate,
  closeByProfit,
  closeByDeviation,
  active
) {
  if (active) {
    if (!job) {
      // job = cron.schedule('* * * * *', async () => {
      //   let shouldTrade = await getTopScan();
      //   if (shouldTrade) {
      //     try {
      //       await setLeverage("usdt", pair, leverage, subClientId);
      //       await trade(
      //         pair,
      //         amount,
      //         lastPrice,
      //         quantoMultiplier,
      //         takerFeeRate,
      //         subClientId,
      //         leverage,
      //         fundingRate,
      //         closeByProfit,
      //         closeByDeviation
      //       );
      //     } catch (error) {
      //       console.error("Error in setting leverage or trading:", error);
      //     }
      //   }
      // });
      console.log("Autobot started to run getTopScan every minute.");
      return true;
    }
    return true;
  } else {
    if (job) {
      job.stop();
      job = null;
      console.log("Autobot stopped.");
      return false; 
    }
    return false;
  }
}

module.exports = autoBot;
