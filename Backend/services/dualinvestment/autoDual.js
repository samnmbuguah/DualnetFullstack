const fetchInvestmentsByCurrency = require('./fetchInvestmentsByCurrency');
const openDualPlan = require('./openDualPlan');
const getLastClosePrice = require('./getSpotPrice');
const cron = require("node-cron");

let cronJob;

/**
 * Opens a dual plan based on the active status.
 * @param {boolean} active - Determines if the cron job should be created or stopped.
 * @param {string} currency - The currency to fetch investments for.
 * @param {number} amount - The amount to invest.
 * @param {boolean} buyLow - Determines if the strategy is to buy low or sell high.
 */
async function autoDual(active, currency, amount, buyLow) {
  if (active) {
    if (!cronJob) {
      cronJob = cron.schedule('*/5 * * * *', async () => {
        try {
          // Fetch data from the database
          const investments = await fetchInvestmentsByCurrency(currency);
          const lastClosePrice = await getLastClosePrice(currency);

          // Check criteria based on buyLow or sellHigh strategy
          const threshold = 50000; // Example threshold
          const criteriaMet = buyLow ? lastClosePrice < threshold : lastClosePrice > threshold;

          if (criteriaMet) {
            // Open a dual plan using the fetched data
            for (const investment of investments) {
              await openDualPlan(
                investment.dualId,
                investment.userId,
                investment.strikePrice,
                investment.expiryTime,
                investment.apr,
                amount,
                investment.copies
              );
            }
            console.log('Dual plan opened successfully.');
          } else {
            console.log('Criteria not met. No dual plan opened.');
          }
        } catch (error) {
          console.error('Error in cron job:', error);
        }
      });
      console.log('Cron job activated.');
    } else {
      console.log('Cron job is already running.');
    }
  } else {
    if (cronJob) {
      cronJob.stop();
      cronJob = null;
      console.log('Cron job deactivated.');
    } else {
      console.log('No cron job to deactivate.');
    }
  }
}

module.exports = autoDual;