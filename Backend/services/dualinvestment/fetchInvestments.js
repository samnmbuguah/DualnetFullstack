const DualPlans = require("../../models/DualPlansModel.js");
const getSpotPrice = require("./getSpotPrice.js");
const { Op } = require("sequelize");

const currencyMultiples = {
  "ETH": 25,
  "BTC": 500,
  "DOGS": 0.000025,
  "DOGE": 0.002,
  "GMX": 0.25,
  "APT": 0.01,
  "ARB": 0.01,
  "SOL": 1,
  "PEPE": 0.00000025
};

async function fetchInvestmentsByCurrency(currency) {
  let spotPrice;
  try {
    spotPrice = await getSpotPrice(`${currency}_USDT`);
  } catch (error) {
    console.error("Error fetching spot price, retrying:", error);
    try {
      spotPrice = await getSpotPrice(`${currency}_USDT`);
    } catch (retryError) {
      console.error("Retry failed:", retryError);
      throw retryError;
    }
  }

  try {
    const multiple = currencyMultiples[currency];
    const convertedSpotPrice = Math.round(spotPrice / multiple) * multiple;

    // Generate multiples less than and higher than the spot price
    const priceArray = [];
    for (let i = -15; i <= 14; i++) {
      priceArray.push(convertedSpotPrice + (i * multiple));
    }

    // Fetch the most recent plan from DualPlans model with deliveryTime less than 7 days away
    const currentTime = Math.floor(Date.now() / 1000);
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;
    const plans = await DualPlans.findAll({
      where: {
        exerciseCurrency: currency,
        deliveryTime: {
          [Op.lt]: currentTime + sevenDaysInSeconds,
          [Op.gt]: currentTime + 86400
        }
      },
      order: [['updatedAt', 'DESC']],
    });

    // Create a map for quick lookup of the plan with the highest APR by exercise price
    const plansMap = new Map();
    plans.forEach(plan => {
      const exercisePrice = parseFloat(plan.exercisePrice);
      const currentPlan = plansMap.get(exercisePrice);
      if (!currentPlan || parseFloat(plan.apyDisplay) > parseFloat(currentPlan.apyDisplay)) {
        plansMap.set(exercisePrice, plan);
      }
    });

    // Map the priceArray to the required format
    const investments = priceArray.map(price => {
      const plan = plansMap.get(price);
      if (plan) {
        return {
          apyDisplay: parseFloat(plan.apyDisplay), // APR
          exercisePrice: price, // Strike
          share: 0, // Share
          order: 0, // Order
          term: Math.floor((plan.deliveryTime - Math.floor(Date.now() / 1000)) / 86400), // Full days to delivery
        };
      } else {
        return {
          apyDisplay: 0, // APR
          exercisePrice: price, // Strike
          share: 0, // Share
          order: 0, // Order
          term: 0, // Full days to delivery
        };
      }
    });

    return {
      investments,
    };
  } catch (error) {
    console.error("Error fetching investments:", error);
    throw error;
  }
}

module.exports = fetchInvestmentsByCurrency;

//   // Example usage
// const currency = 'BTC';
// fetchInvestmentsByCurrency(currency).then(result => console.log(result)).catch(error => console.error(error));