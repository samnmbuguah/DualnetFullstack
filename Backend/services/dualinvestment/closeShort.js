const GateApi = require("gate-api");
const client = new GateApi.ApiClient();
const getApiCredentials = require("../getApiCredentials.js");

async function closeShort(contract, futuresSize, subClientId) {
  try {
    const credentials = await getApiCredentials(subClientId);
    if (!credentials) {
      throw new Error("Could not fetch API credentials. Aborting trade.");
    }

    client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);
    const futuresApi = new GateApi.FuturesApi(client);

    const futuresOrder = new GateApi.FuturesOrder();
    futuresOrder.contract = contract;
    futuresOrder.settle = "usdt";
    futuresOrder.size = -futuresSize;
    futuresOrder.price = "0";
    futuresOrder.tif = "ioc";
    futuresOrder.reduceOnly = true;

    const response = await futuresApi.createFuturesOrder("usdt", futuresOrder);
    console.log("Futures close order response", response.body);
    return true;
  } catch (error) {
    console.error("Error during trading:", error.response || error);
    return false;
  }
}

module.exports = closeShort;

// closeShort("BTC_USDT", 1, 1);
