const GateApi = require('gate-api');
const OpenDuals = require('../../models/OpenDualsModel.js');
const getApiCredentials = require('../getApiCredentials.js');

const client = new GateApi.ApiClient();

async function openDualPlan(dualId, subClientId, strikePrice, expiryTime, apr, investAmount, copies) {
  try {
    // Fetch API credentials
    const credentials = await getApiCredentials(subClientId);
    if (!credentials) {
      throw new Error("Could not fetch API credentials. Aborting trade.");
    }

    // Set API key and secret
    client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);

    // Create a new dual investment order
    const placeDualInvestmentOrder = new GateApi.PlaceDualInvestmentOrder();
    placeDualInvestmentOrder.strikePrice = strikePrice;
    placeDualInvestmentOrder.expiryTime = expiryTime;
    placeDualInvestmentOrder.apr = apr;
    placeDualInvestmentOrder.investAmount = investAmount;
    placeDualInvestmentOrder.copies = copies;

    const api = new GateApi.EarnApi(client);

    // Place the dual investment order using the Gate API
    const apiResponse = await api.placeDualOrder(placeDualInvestmentOrder);

    // Log the API response
    console.log('API called successfully:', apiResponse);

    // Create a new record in the OpenDuals table
    const newDualPlan = await OpenDuals.create({
      dualId,
      userId: subClientId,
      strikePrice,
      expiryTime,
      apr,
      investAmount,
      copies,
    });

    return newDualPlan;
  } catch (error) {
    console.error('Error opening dual plan:', error);
    throw error;
  }
}

module.exports = openDualPlan;