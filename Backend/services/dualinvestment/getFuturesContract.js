const GateApi = require('gate-api');
const client = new GateApi.ApiClient();
// Uncomment the next line to change base path
// client.basePath = "https://some-other-host"

const api = new GateApi.FuturesApi(client);

/**
 * Get a single futures contract and return the quantoMultiplier
 * @param {string} settle - Settle currency ('btc' | 'usdt' | 'usd')
 * @param {string} contract - Futures contract
 * @returns {Promise<string>} - The quantoMultiplier of the contract
 */
async function getFuturesContract(settle, contract) {
  try {
    const response = await api.getFuturesContract(settle, contract);
    return response.body.quantoMultiplier;
  } catch (error) {
    console.error('Error fetching futures contract:', error);
    throw error;
  }
}

// // Example usage
// const settle = "usdt"; // Settle currency
// const contract = "BTC_USDT"; // Futures contract

// getFuturesContract(settle, contract)
//   .then(quantoMultiplier => console.log('Quanto Multiplier: ', quantoMultiplier))
//   .catch(error => console.error(error));

module.exports = getFuturesContract;