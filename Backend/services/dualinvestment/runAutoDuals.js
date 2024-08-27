const fetchInvestmentsByCurrency = require("./fetchInvestments");
const AutoDual = require("../../models/AutoDualModel");
const openDualPlan = require("./openDual");
const getLastClosePrice = require("./getSpotPrice");

/**
 * Handles the activation and deactivation of the cron job.
 */
async function runAutoDuals() {
  try {
    // Fetch all records from AutoDual where active is true
    const activeRecords = await AutoDual.findAll({ where: { active: true } });

    if (activeRecords.length === 0) {
      console.log("No active records found.");
      return;
    }

    for (const record of activeRecords) {
      const { currency, amount, threshold } = record;

      // Fetch data from the database
      const investments = await fetchInvestmentsByCurrency(currency);
      const lastClosePrice = await getLastClosePrice(currency);

      // Check criteria based on the APY display
      const criteriaMet = investments.length > 0 && investments[0].apyDisplay > threshold;

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
        console.log(`Dual plan opened successfully for currency: ${currency}.`);
      } else {
        console.log(`Criteria not met for currency: ${currency}. No dual plan opened.`);
      }
    }
  } catch (error) {
    console.error("Error in runAutoDuals function:", error);
  }
}

module.exports = runAutoDuals;