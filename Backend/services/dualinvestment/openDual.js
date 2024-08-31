const GateApi = require("gate-api");
const DualHistory = require("../../models/DualHistoryModel.js");
const getApiCredentials = require("../getApiCredentials.js");
const moment = require('moment-timezone'); // Import moment-timezone

const client = new GateApi.ApiClient();

async function openDualPlan(
  planId,
  userId,
  amount,
  perValue,
  strikePrice,
  settlementTime,
  apy,
  dualType,
  currency,
  settlementCurrency
) {
  try {
    // Fetch API credentials
    const credentials = await getApiCredentials(userId);
    if (!credentials) {
      throw new Error("Could not fetch API credentials. Aborting trade.");
    }

    // Set API key and secret
    client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);

    // Calculate copies
    const copies = Math.floor(amount / perValue);

    // Check if copies are less than 1
    if (copies < 1) {
      console.log("Insufficient amount to create any copies. Aborting trade.");
      return false;
    }

    // Create a new dual investment order
    const placeDualInvestmentOrder = new GateApi.PlaceDualInvestmentOrder();
    placeDualInvestmentOrder.planId = String(planId);
    placeDualInvestmentOrder.copies = String(copies);

    const api = new GateApi.EarnApi(client);

    // Place the dual investment order using the Gate API
    const apiResponse = await api.placeDualOrder(placeDualInvestmentOrder);

    // Log the API response
    console.log("API called successfully:", apiResponse);

    // Extract orderId from the API response body
    const { order_id: orderId } = apiResponse.body;

    // Convert Unix timestamp to JavaScript Date object in UTC
    const settlementDate = moment.unix(settlementTime).utc().toDate();

    // Create a new record in the DualHistory table
    await DualHistory.create({
      orderId,
      dualId: planId,
      userId,
      strikePrice,
      settlementTime: settlementDate,
      apy,
      investAmount: amount,
      copies,
      dualType,
      currency,
      settlementCurrency,
      settled: false,
    });

    console.log(
      `Dual plan opened and data saved in the database for currency: ${currency}.`
    );
    return;
  } catch (error) {
    console.error("Error opening dual plan:", error);
    throw error;
  }
}

module.exports = openDualPlan;