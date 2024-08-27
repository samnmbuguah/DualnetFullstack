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
      const { currency, amount, threshold, userId } = record;

      // Fetch data from the database
      const { exerciseCurrencyList, investCurrencyList } = await fetchInvestmentsByCurrency(currency);

      if (exerciseCurrencyList.length === 0) {
        console.log(`No investments found for currency: ${currency}.`);
        continue;
      }

      const firstExerciseCurrency = exerciseCurrencyList[0];

      // Check criteria based on the APY display
      const criteriaMet = firstExerciseCurrency.apyDisplay > threshold;

      if (criteriaMet) {
        // Open a dual plan using the fetched data
        await openDualPlan(firstExerciseCurrency.id, userId, amount, firstExerciseCurrency.perValue);

        console.log(`Dual plan opened successfully for currency: ${currency}.`);
      } else {
        console.log(
          `Criteria not met for currency: ${currency}. No dual plan opened.`
        );
      }
    }
  } catch (error) {
    console.error("Error in runAutoDuals function:", error);
  }
}

module.exports = runAutoDuals;