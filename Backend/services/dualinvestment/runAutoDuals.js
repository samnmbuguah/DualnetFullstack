const fetchInvestmentsByCurrency = require("./fetchInvestments");
const AutoDual = require("../../models/AutoDualModel");
const DualHistory = require("../../models/DualHistoryModel");
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
      const { exerciseCurrencyList, investCurrencyList } =
        await fetchInvestmentsByCurrency(currency);

      if (exerciseCurrencyList.length === 0) {
        console.log(`No investments found for currency: ${currency}.`);
        continue;
      }

      // Fetch all unsettled records from DualHistory for the user and currency
      const unsettledRecords = await DualHistory.findAll({
        where: {
          userId: userId,
          currency: currency,
          settled: false,
        },
      });

      // Compile the strikePrices list from the unsettled records
      const strikePrices = unsettledRecords.map((record) => record.strikePrice);

      // Filter the exerciseCurrencyList to remove records where the exercisePrice is in the strikePrices array
      const filteredExerciseCurrencyList =
        strikePrices.length > 0
          ? exerciseCurrencyList.filter(
              (item) => !strikePrices.includes(item.exercisePrice)
            )
          : exerciseCurrencyList;

      if (filteredExerciseCurrencyList.length === 0) {
        console.log(
          `No suitable investments found for currency: ${currency} after filtering  strike prices .`
        );
        continue;
      }

      const firstExerciseCurrency = filteredExerciseCurrencyList[0];

      // Check criteria based on the APY display
      const criteriaMet = firstExerciseCurrency.apyDisplay > threshold;

      if (criteriaMet) {
        // Set perValue based on investCurrency
        let perValue = firstExerciseCurrency.perValue;
        if (
          firstExerciseCurrency.exerciseCurrency !== "BTC" &&
          firstExerciseCurrency.exerciseCurrency !== "ETH"
        ) {
          perValue = 1;
        }

        // Open a dual plan using the fetched data
        await openDualPlan(
          firstExerciseCurrency.id,
          userId,
          amount,
          perValue,
          firstExerciseCurrency.exercisePrice,
          firstExerciseCurrency.deliveryTime,
          firstExerciseCurrency.apyDisplay,
          firstExerciseCurrency.planType,
          currency,
          firstExerciseCurrency.exerciseCurrency
        );
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