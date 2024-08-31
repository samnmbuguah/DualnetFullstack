const AutoDual = require("../../models/AutoDualModel");
const DualHistory = require("../../models/DualHistoryModel"); // Import the DualHistory model
const { Op } = require("sequelize");

/**
 * Fetches a record from AutoDual with the specified currency and userId.
 * Additionally, fetches all unsettled records from DualHistory and sets strikePrices to the count of these records.
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
      "createdAt",
      "updatedAt",
    ];

    // Fetch the AutoDual record
    const record = await AutoDual.findOne({
      attributes,
      where: {
        currency: currency,
        userId: userId,
      },
    });

    if (!record) {
      return null;
    }

    // Fetch all unsettled records from DualHistory for the user and currency
    const unsettledRecords = await DualHistory.findAll({
      where: {
        userId: userId,
        currency: currency,
        settled: false,
      },
    });

    // Set strikePrices to the count of the unsettled records
    const strikePrices = unsettledRecords.length;

    // Add the strikePrices count to the record
    return {
      ...record.toJSON(),
      strikePrices,
    };
  } catch (error) {
    console.error("Error fetching record:", error);
    throw error;
  }
}

module.exports = fetchOpenedDuals;