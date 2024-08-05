const getTopScan = require("./getTopScan.js");
const trade = require("./trade.js");
const cron = require("node-cron");

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
      job = cron.schedule('* * * * *', async () => {
        let shouldTrade = await getTopScan();
            if (shouldTrade) {
              await trade(
                pair,
                amount,
                lastPrice,
                quantoMultiplier,
                takerFeeRate,
                subClientId,
                leverage,
                fundingRate,
                closeByProfit,
                closeByDeviation
              );
            }
        
      });
      console.log("Cron job started to run getTopScan every minute.");
      return true; // Return true if the job is started
    }
  } else {
    if (job) {
      job.stop();
      job = null;
      console.log("Auto job stopped.");
      return true; // Return true if the job is stopped
    }
  }
  return false; // Return false if no action was taken
}

module.exports = autoBot;
