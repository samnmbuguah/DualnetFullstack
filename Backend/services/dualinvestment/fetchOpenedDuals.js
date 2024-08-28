const AutoDual = require("../../models/AutoDualModel");
const { Op } = require("sequelize");

/**
 * Fetches a record from AutoDual with the specified currency and userId.
 * @param {string} currency - The currency to search for.
 * @param {number} userId - The userId to search for.
 * @returns {Promise<Object|null>} - The matching record with modified fields or null if not found.
 */
async function fetchOpenedDuals(currency, userId) {
  try {
    // Define the attributes to be selected, excluding userId and id
    const attributes = [
      "currency",
      "amount",
      "threshold",
      "active",
      "strikePrices",
      "createdAt",
      "updatedAt",
    ];

    const record = await AutoDual.findOne({
      attributes,
      where: {
        currency: currency,
        userId: userId,
      },
    });
    return record;
  } catch (error) {
    console.error("Error fetching record:", error);
    throw error;
  }
}

module.exports = fetchOpenedDuals;
