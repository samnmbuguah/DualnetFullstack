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
      "endTime",
      "planType",
      "exercisePrice",
      "id",
    ];

    // Query for records where exerciseCurrency matches the given currency, endTime is in the future, and updatedAt is within the last 1 minute
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
    
    // Query for records where investCurrency matches the given currency, endTime is in the future, and updatedAt is within the last 1 minute
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

    // // Filter out records where expiry time is more than 2 days away, except for the first record
    // const filteredExerciseCurrencyList = exerciseCurrencyList.filter((item, index) => index === 0 || item.endTime <= twoDaysFromNow);
    // const filteredInvestCurrencyList = investCurrencyList.filter((item, index) => index === 0 || item.endTime <= twoDaysFromNow);

    // // Filter to ensure all exercisePrice values are unique, including the first record
    // const uniqueExerciseCurrencyList = filteredExerciseCurrencyList.filter((item, index, self) =>
    //   self.findIndex(i => i.exercisePrice === item.exercisePrice) === index
    // );
    // const uniqueInvestCurrencyList = filteredInvestCurrencyList.filter((item, index, self) =>
    //   self.findIndex(i => i.exercisePrice === item.exercisePrice) === index
    // );

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
