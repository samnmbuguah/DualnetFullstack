const GateApi = require('gate-api');
const OpenDuals = require('../../models/OpenDualsModel.js');
const getApiCredentials = require('../getApiCredentials.js');

const client = new GateApi.ApiClient();

async function openDualPlan(planId, userId, amount, perValue) {
  try {
    // Fetch API credentials
    const credentials = await getApiCredentials(userId);
    if (!credentials) {
      throw new Error("Could not fetch API credentials. Aborting trade.");
    }

    // Set API key and secret
    client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);

    // Calculate copies
    const copies = Math.round(amount / perValue);

    // Create a new dual investment order
    const placeDualInvestmentOrder = new GateApi.PlaceDualInvestmentOrder();
    placeDualInvestmentOrder.planId = String(planId);
    placeDualInvestmentOrder.copies = String(copies);

    const api = new GateApi.EarnApi(client);

    // Place the dual investment order using the Gate API
    const apiResponse = await api.placeDualOrder(placeDualInvestmentOrder);

    // Log the API response
    console.log('API called successfully:', apiResponse);

    // Create a new record in the OpenDuals table
    let newDualPlan;
    // newDualPlan = await OpenDuals.create({
    //   planId,
    //   userId,
    //   copies,
    // });

    return true;
  } catch (error) {
    console.error('Error opening dual plan:', error);
    throw error;
  }
}

module.exports = openDualPlan;