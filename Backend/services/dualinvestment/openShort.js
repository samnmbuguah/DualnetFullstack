const GateApi = require("gate-api");
const client = new GateApi.ApiClient();
const getApiCredentials = require("../getApiCredentials.js");

async function openShort(settle, contract, size, userId) {
  try {
    // Fetch API credentials
    const credentials = await getApiCredentials(userId);
    if (!credentials) {
      throw new Error("Could not fetch API credentials. Aborting trade.");
    }
    // Set API key and secret
    client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);
    const futuresApi = new GateApi.FuturesApi(client);
      
    const options = {
    crossLeverageLimit: 1, // string | Cross margin leverage(when `leverage` is 0)
    };

    futuresApi.updatePositionLeverage(settle, contract, 0, options)

    console.log("Creating futures short order...");
    const futuresOrder = new GateApi.FuturesOrder();
    futuresOrder.contract = contract;
    futuresOrder.size = size;
    futuresOrder.price = "0";
    futuresOrder.tif = "ioc";
    futuresOrder.reduceOnly = false;
    futuresOrder.close = false;

    const response = await futuresApi.createFuturesOrder(settle, futuresOrder);
    console.log("Futures short order created", response.body);
    return size;
  } catch (error) {
    console.error("Error creating futures short order:", error);
    throw error;
  }
}

module.exports = openShort;
// openShort("usdt", "ETH_USDT", 1, 1);
