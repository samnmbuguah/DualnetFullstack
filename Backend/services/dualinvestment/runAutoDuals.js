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
      const { currency, amount, threshold, userId, strikePrices } = record;

      // Fetch data from the database
      const { exerciseCurrencyList, investCurrencyList } = await fetchInvestmentsByCurrency(currency);

      if (exerciseCurrencyList.length === 0) {
        console.log(`No investments found for currency: ${currency}.`);
        continue;
      }

      // Filter the exerciseCurrencyList to remove records where the exercisePrice is in the strikePrices array
      const filteredExerciseCurrencyList = strikePrices && strikePrices.length > 0
        ? exerciseCurrencyList.filter(item => !strikePrices.includes(item.exercisePrice))
        : exerciseCurrencyList;

      if (filteredExerciseCurrencyList.length === 0) {
        console.log(`No suitable investments found for currency: ${currency} after filtering.`);
        continue;
      }

      const firstExerciseCurrency = filteredExerciseCurrencyList[0];

      // Check criteria based on the APY display
      const criteriaMet = firstExerciseCurrency.apyDisplay > threshold;

      if (criteriaMet) {
        // Open a dual plan using the fetched data
        const success = await openDualPlan(firstExerciseCurrency.id, userId, amount, firstExerciseCurrency.perValue);

        if (success) {
          // Fetch the current strikePrices array
          const strikePrices = record.strikePrices || [];

          // Add the exercisePrice to the end of the array
          strikePrices.push(firstExerciseCurrency.exercisePrice);

          // Update the AutoDual record with the new strikePrices array
          await AutoDual.update({ strikePrices }, { where: { id: record.id } });

          console.log(`Dual plan opened and strikePrices updated for currency: ${currency}.`);
        } else {
          console.log(`Failed to open dual plan for currency: ${currency}.`);
        }
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