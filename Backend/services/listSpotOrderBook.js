const GateApi = require('gate-api');
const client = require('./gateClient.js');

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

        // Calculate liquidity
        const liquidity = parseFloat(bids[0][0]) * parseFloat(bids[0][1]);

        // Check liquidity
        if (liquidity <= 100) {
            console.log(`Spot Liquidity for ${currencyPair} is too low: ${liquidity}`);
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
