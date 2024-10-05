const Scans = require("../models/ScansModel.js");
const listFuturesOrderBook = require("./listFuturesOrderBook.js");
const listOrderBook = require("./listSpotOrderBook.js");

// Helper function to handle rate limitting
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class PollPrices {
  constructor(tickers, settle, amountPrecisions) {
    this.amountPrecisions = amountPrecisions;
    this.tickers = tickers;
    this.settle = settle;
    this.lastPrices = {};
  }

  updateTickers(tickers, amountPrecisions) {
    this.tickers = tickers;
    this.amountPrecisions = amountPrecisions;
  }

  async fetchAndUpdateScans() {
    const delayInMilliseconds = 100;
    const takerFeeRate = 0.00075 * 2;

    for (let index = 0; index < this.tickers.length; index++) {
      const ticker = this.tickers[index];
      const amountPrecision = this.amountPrecisions[index] + 1;

      const startTime = Date.now();

      try {
        const spotResponse = await listOrderBook(ticker);
        const futuresResponse = await listFuturesOrderBook(
          this.settle,
          ticker
        );

        // Remove the check for insufficient liquidity
        const spotPrice = parseFloat(spotResponse.asks[0][0]);
        const futuresPrice = parseFloat(futuresResponse.bids[0].p);

        let valueDifference = futuresPrice - spotPrice;
        valueDifference =
          Math.round(valueDifference * Math.pow(10, amountPrecision)) /
          Math.pow(10, amountPrecision);

        let percentageDifference =
          (valueDifference / spotPrice) * 100 - takerFeeRate;
        percentageDifference = Math.round(percentageDifference * 10000) / 10000;

        await Scans.upsert({
          matchingPairId: ticker,
          futuresPrice: futuresPrice,
          spotPrice: spotPrice,
          valueDifference: valueDifference,
          percentageDifference: percentageDifference,
        });
        console.log(`Updated scan for ticker ${ticker}`);

      } catch (error) {
        console.error(`Failed to update scan for ticker ${ticker}: ${error}`);
      }

      const endTime = Date.now();
      const apiCallTime = endTime - startTime;

      const actualDelay = Math.max(0, delayInMilliseconds - apiCallTime);

      await delay(actualDelay);
    }

    console.log("All scans updated successfully");
    return true;
  }
}
module.exports = PollPrices;
