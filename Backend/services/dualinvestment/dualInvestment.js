const GateApi = require("gate-api");
const client = new GateApi.ApiClient();
const api = new GateApi.EarnApi(client);
const DualPlans = require("../../models/DualPlansModel.js");

async function listDualInvestmentPlans() {
  try {
    const value = await api.listDualInvestmentPlans();

    // Assuming value.body is an array of plans
    const plans = value.body;

    // Map through all plans without filtering
    const plansToUpsert = plans.map((plan) => ({
      id: plan.id,
      instrumentName: plan.instrumentName,
      investCurrency: plan.investCurrency,
      exerciseCurrency: plan.exerciseCurrency,
      exercisePrice: plan.exercisePrice,
      deliveryTime: plan.deliveryTime,
      minCopies: plan.minCopies,
      maxCopies: plan.maxCopies,
      perValue: plan.perValue,
      apyDisplay: parseFloat(plan.apyDisplay) * 100,
      startTime: plan.startTime,
      endTime: plan.endTime,
      status: plan.status,
      planType: plan.investCurrency === "USDT" ? "buy_low" : "sell_high",
    }));

    // Use bulkCreate with updateOnDuplicate to insert or update plans
    await DualPlans.bulkCreate(plansToUpsert, {
      updateOnDuplicate: ["apyDisplay"],
    });

    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = listDualInvestmentPlans;

// // Example usage
// listDualInvestmentPlans()
//   .then((response) => {
//     // Handle the response if needed
//   })
//   .catch((error) => {
//     // Handle the error if needed
//   });