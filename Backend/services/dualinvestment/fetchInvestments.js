const DualPlans = require("../../models/DualPlansModel.js");
const { Op } = require("sequelize");

async function fetchInvestmentsByCurrency(currency) {
  try {
    // Get the current date and time as a Unix timestamp
    const now = Math.floor(Date.now() / 1000);

    // Define the attributes to be selected
    const attributes = [
      "investCurrency",
      "exerciseCurrency",
      "perValue",
      "apyDisplay",
      "endTime",
      "planType",
      "exercisePrice",
    ];

    // Query for records where exerciseCurrency matches the given currency and endTime is in the future
    const exerciseCurrencyList = await DualPlans.findAll({
      attributes,
      where: {
        exerciseCurrency: currency,
        endTime: {
          [Op.gt]: now
        }
      },
      order: [['apyDisplay', 'DESC']]
    });

    // Query for records where investCurrency matches the given currency and endTime is in the future
    const investCurrencyList = await DualPlans.findAll({
      attributes,
      where: {
        investCurrency: currency,
        endTime: {
          [Op.gt]: now
        }
      },
      order: [['apyDisplay', 'DESC']]
    });

    // Return the two lists
    return {
      exerciseCurrencyList,
      investCurrencyList
    };
  } catch (error) {
    console.error('Error fetching investments:', error);
    throw error;
  }
}

module.exports = fetchInvestmentsByCurrency;

// // Example usage
// const currency = 'PEPE';
// fetchInvestmentsByCurrency(currency)
//   .then(({ exerciseCurrencyList, investCurrencyList }) => {
//     console.log('Exercise Currency List:', exerciseCurrencyList);
//     console.log('Invest Currency List:', investCurrencyList);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });