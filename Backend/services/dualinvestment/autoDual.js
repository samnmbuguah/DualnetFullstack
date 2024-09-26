const AutoDual = require("../../models/AutoDualModel");

/**
 * Opens a dual plan based on the active status.
 * @param {boolean} active - Determines if the cron job should be created or stopped.
 * @param {string} currency - The currency to fetch investments for.
 * @param {number} amount - The amount to invest.
 * @param {number} threshold - The threshold for the APY display.
 * @param {string} dualType - The type of dual plan.
 * @param {string} subClientId - The sub-client ID.
 */

async function autoDual(active, currency, amount, threshold, dualType, subClientId) {
  try {
    // Check if a record exists for the same userId and currency
    const existingRecord = await AutoDual.findOne({ where: { userId: subClientId, currency: currency } });

    if (existingRecord) {
      // Update the existing record
      await AutoDual.update(
        { active, amount, threshold, dualType },
        { where: { userId: subClientId, currency: currency } }
      );
      console.log('Record updated successfully.');
    } else {
      // Create a new record
      await AutoDual.create({
        userId: subClientId,
        currency,
        amount,
        threshold,
        dualType,
        active
      });
      console.log('Record created successfully.');
    }

  } catch (error) {
    console.error('Error in autoDual function:', error);
  }
}

module.exports = autoDual;
