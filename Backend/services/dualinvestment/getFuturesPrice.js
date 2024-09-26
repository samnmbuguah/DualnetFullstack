const GateApi = require('gate-api');
const client = new GateApi.ApiClient();

const api = new GateApi.FuturesApi(client);

/**
 * Get the futures price for a given contract.
 * @param {string} settle - Settle currency (e.g., 'usdt', 'btc', 'usd').
 * @param {string} contract - Futures contract (e.g., 'BTC_USDT').
 * @param {object} opts - Options for fetching candlesticks.
 * @returns {Promise<number>} - The latest futures price.
 */
async function getFuturesPrice(settle, contract, opts = {}) {
  try {
    const response = await api.listFuturesCandlesticks(settle, contract, opts);
    const candlesticks = response.body;
    if (candlesticks.length === 0) {
      throw new Error('No candlestick data available');
    }
    // Assuming the latest price is the closing price of the most recent candlestick
    const latestCandlestick = candlesticks[candlesticks.length - 1];
    const latestPrice = parseFloat(latestCandlestick.c); // Closing price is in the 'c' property
    return latestPrice;
  } catch (error) {
    console.error('Error fetching futures price:', error);
    throw error;
  }
}

// // Parameters for fetching the futures price
// const settle = "usdt";
// const contract = "BTC_USDT";
// const opts = {
//   'interval': '10s',
//   'limit': 1 // Fetch only the most recent candlestick
// };

// // Function to fetch and print the futures price
// function fetchAndPrintFuturesPrice() {
//   getFuturesPrice(settle, contract, opts)
//     .then(price => console.log('Latest futures price:', price))
//     .catch(error => console.error('Error:', error));
// }

// // Run the function once every second for 10 seconds
// const intervalId = setInterval(fetchAndPrintFuturesPrice, 1000);

// // Stop the interval after 10 seconds
// setTimeout(() => clearInterval(intervalId), 10000);

module.exports = getFuturesPrice;