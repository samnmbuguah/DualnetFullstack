const GateApi = require('gate-api');
const client = require('./gateClient.js');

const api = new GateApi.FuturesApi(client);

const defaultOpts = {
  interval: "0", // string | Interval of order depth data
  limit: 1, // number | Maximum number of order depth data in asks or bids
  withId: false,
};

async function listFuturesOrderBook(settle, contract, opts = defaultOpts) {
  try {
    const value = await api.listFuturesOrderBook(settle, contract, opts);
    const { asks, bids } = value.body;

    // Return the order book data without any checks
    return { asks, bids };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = listFuturesOrderBook;

// async function main() {
//   const settle = "usdt";
//   const contract = "BTC_USDT";
//   const opts = {
//     'interval': '0',
//     'limit': 1,
//     'withId': false
//   };

//   const futuresOrderBook = await listFuturesOrderBook(settle, contract, opts);
  
//   // Access the first bid price and ask price
//   const bidPrice = futuresOrderBook.bids[0].p;
//   const askPrice = futuresOrderBook.asks[0].p;

//   console.log('Bid price: ', bidPrice);
//   console.log('Ask price: ', askPrice);
// }

// main().catch(console.error);
