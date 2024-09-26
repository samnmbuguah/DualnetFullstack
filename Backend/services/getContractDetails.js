const GateApi = require("gate-api");
const client = require("./gateClient.js");
const api = new GateApi.FuturesApi(client);

const defaultOpts = {
  interval: "0", // string | Interval of order depth data
  limit: 1, // number | Maximum number of order depth data in asks or bids
  withId: false,
};

async function getContractDetails(settle, contract, opts = defaultOpts) {
  try {
    const value = await api.listFuturesOrderBook(settle, contract, opts);
    const firstAsk = parseFloat(value.body.asks[0].p);
    return firstAsk;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getContractDetails;

// Usage:
getContractDetails("usdt", "BTC_USDT");
