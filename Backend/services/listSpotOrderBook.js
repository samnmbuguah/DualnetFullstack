const GateApi = require("gate-api");
const client = require("./gateClient.js");

const api = new GateApi.SpotApi(client);
const defaultOpts = {
  interval: "0", // string | Interval of order depth data
  limit: 1, // number | Maximum number of order depth data in asks or bids
  withId: false,
};

async function listOrderBook(currencyPair, opts = defaultOpts) {
  try {
    const value = await api.listOrderBook(currencyPair, opts);
    const { asks, bids } = value.body;

    // Return the order book data without any checks
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
