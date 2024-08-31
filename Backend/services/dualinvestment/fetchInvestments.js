const DualPlans = require("../../models/DualPlansModel.js");
const { Op } = require("sequelize");

async function fetchInvestmentsByCurrency(currency) {
  try {
    // Get the current date and time
    const now = new Date();
    const unixNow = Math.floor(Date.now() / 1000);
    const oneMinuteAgo = new Date(now.getTime() - 2 * 60 * 1000);
    const twoDaysFromNow = unixNow + 2 * 24 * 60 * 60;

    // Define the attributes to be selected
    const attributes = [
      "investCurrency",
      "exerciseCurrency",
      "perValue",
      "apyDisplay",
      "deliveryTime",
      "endTime",
      "planType",
      "exercisePrice",
      "id",
    ];

    // Query for records where exerciseCurrency matches the given currency and updatedAt is within the last 1 minute
    const exerciseCurrencyList = await DualPlans.findAll({
      attributes,
      where: {
        exerciseCurrency: currency,
        updatedAt: {
          [Op.gt]: oneMinuteAgo,
        },
      },
      order: [["apyDisplay", "DESC"]],
      limit: 1,
    });
    
    // Query for records where investCurrency matches the given currency and updatedAt is within the last 1 minute
    const investCurrencyList = await DualPlans.findAll({
      attributes,
      where: {
        investCurrency: currency,
        updatedAt: {
          [Op.gt]: oneMinuteAgo,
        },
      },
      order: [["apyDisplay", "DESC"]],
      limit: 1,
    });

    // Return the filtered lists
    return {
      exerciseCurrencyList: exerciseCurrencyList,
      investCurrencyList: investCurrencyList,
    };
  } catch (error) {
    console.error("Error fetching investments:", error);
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
