const GateApi = require('gate-api');
const client = new GateApi.ApiClient();

const api = new GateApi.SpotApi(client);

/**
 * Get the close price for the last candle of a given currency pair.
 * @param {string} currencyPair - The currency pair to get the close price for.
 * @returns {Promise<number>} - A promise that resolves to the close price of the last candle.
 */
async function getLastClosePrice(currencyPair) {
  const opts = {
    'limit': 1, // Fetch only one candle
    'interval': '1m' // Default interval
  };

  try {
    const value = await api.listCandlesticks(currencyPair, opts);
    console.log('API called successfully. Returned data: ', value.body);
    // Extract the close price of the last candle
    const lastCandle = value.body[0];
    const lastClosePrice = parseFloat(lastCandle[2]); // Close price is at index 2
    console.log('Last close price: ', lastClosePrice);
    return lastClosePrice;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getLastClosePrice;

// Example usage
getLastClosePrice("BTC_USDT")
  .then(lastClosePrice => {
    // Handle the last close price if needed
  })
  .catch(error => {
    // Handle the error if needed
  });