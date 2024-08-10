const GateApi = require("gate-api");
const client = require("./gateClient.js");

const api = new GateApi.SpotApi(client);
const defaultOpts = {
  interval: "0", // string | Interval of order depth data
  limit: 1, // number | Maximum number of order depth data in asks or bids
  withId: false,
};

async function listOrderBook(currencyPair, opts = defaultOpts) {
  const defaultOpts = {
    interval: "0", // string | Interval of order depth data
    limit: 1, // number | Maximum number of order depth data in asks or bids
    withId: false,
  };

  try {
    const value = await api.listOrderBook(currencyPair, opts);
    const { asks, bids } = value.body;

    // Calculate spread
    const bidPrice = parseFloat(bids[0][0]);
    const askPrice = parseFloat(asks[0][0]);
    const spread = askPrice - bidPrice;
    const spreadPercent = ((askPrice - bidPrice) / askPrice) * 100;

    // Check spread
    if (spreadPercent > 0.42) {
      console.log(`Spread for ${currencyPair} is too low: ${spread}`);
      return null; // Skip further calculations
    }

    // Proceed with other calculations if liquidity is sufficient
    const lowestAsk = asks[0];
    return { asks, bids };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = listOrderBook;

////Call this function
// const currencyPair = "BTC_USDT";

// const spotOrderBook = await listOrderBook(currencyPair);
