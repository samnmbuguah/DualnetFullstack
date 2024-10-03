const defaultAprData = require("./DefaultApr.json");

async function fetchInvestmentsByCurrency(currency) {
  try {
    // Return the default data from the local DefaultApr.json
    return {
      exerciseCurrencyList: defaultAprData.exerciseCurrencyList,
      investCurrencyList: defaultAprData.investCurrencyList,
    };
  } catch (error) {
    console.error("Error fetching investments:", error);
    throw error;
  }
}

module.exports = fetchInvestmentsByCurrency;

// Example usage (commented out)
// const currency = 'PEPE';
// fetchInvestmentsByCurrency(currency)
//   .then(({ exerciseCurrencyList, investCurrencyList }) => {
//     console.log('Exercise Currency List:', exerciseCurrencyList);
//     console.log('Invest Currency List:', investCurrencyList);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
