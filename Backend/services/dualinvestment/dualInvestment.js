const GateApi = require("gate-api");
const client = new GateApi.ApiClient();
const api = new GateApi.EarnApi(client);
const DualPlans = require("../../models/DualPlansModel.js");

async function listDualInvestmentPlans() {
  try {
    const value = await api.listDualInvestmentPlans();

    // Assuming value.body is an array of plans
    const plans = value.body;

    // Get the current time in Unix time
    const currentTime = Math.floor(Date.now() / 1000);

    // Filter plans with apyDisplay greater than 0.5 and deliveryTime greater than 1 day from now
    const filteredPlans = plans.filter(plan => parseFloat(plan.apyDisplay) > 0.5 && (plan.deliveryTime - currentTime) >= 86400);

    // Map through filtered plans
    for (const plan of filteredPlans) {
      const planData = {
        id: plan.id,
        instrumentName: plan.instrumentName,
        investCurrency: plan.investCurrency,
        exerciseCurrency: plan.exerciseCurrency,
        exercisePrice: plan.exercisePrice,
        minCopies: plan.minCopies,
        maxCopies: plan.maxCopies,
        perValue: parseFloat(plan.perValue),
        apyDisplay: parseFloat(plan.apyDisplay) * 100,
        deliveryTime: plan.deliveryTime,
        endTime: plan.endTime,
        startTime: plan.startTime,
        status: plan.status,
        planType: plan.investCurrency === "USDT" ? "buy_low" : "sell_high",
      };

      // Check if the plan exists
      const existingPlan = await DualPlans.findOne({ where: { id: plan.id } });

      if (existingPlan) {
        // Update the existing plan
        await DualPlans.update(planData, { where: { id: plan.id } });
      } else {
        // Create a new plan
        await DualPlans.create(planData);
      }
    }

    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = listDualInvestmentPlans;

// Example usage
listDualInvestmentPlans();