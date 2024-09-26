const GateApi = require('gate-api');
const client = new GateApi.ApiClient();

const api = new GateApi.SpotApi(client);

/**
 * Get the close price for the last candle of a given currency pair.
 * @param {string} currencyPair - The currency pair to get the close price for.
 * @returns {Promise<number>} - A promise that resolves to the close price of the last candle.
 */
async function getSpotPrice(currencyPair) {
  const opts = {
    'limit': 1, // Fetch only one candle
    'interval': '10s' // Default interval
  };

  try {
    const value = await api.listCandlesticks(currencyPair, opts);
    if (!value.body || value.body.length === 0) {
      console.error('No candlestick data available');
      return null; // Return null or a default value
    }
    // Extract the close price of the last candle
    const lastCandle = value.body[0];
    const lastClosePrice = parseFloat(lastCandle[2]); // Close price is at index 2
    return lastClosePrice;
  } catch (error) {
    console.error('Error fetching spot price:', error);
    throw error;
  }
}

module.exports = getSpotPrice;

// // Example usage
// getSpotPrice("BTC_USDT");