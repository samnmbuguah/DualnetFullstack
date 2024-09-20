const DualHistory = require("../../models/DualHistoryModel.js");
const closeShort = require("./closeShort.js");
const { Op } = require("sequelize");

async function settleRecords() {
  try {
    const currentTime = new Date();

    // Find records where settlementTime has already passed and settled is false
    const recordsToUpdate = await DualHistory.findAll({
      where: {
        settlementTime: {
          [Op.lt]: currentTime,
        },
        settled: false,
      },
    });

    // Update the settled field to true and hedged field to false for the found records
    for (const record of recordsToUpdate) {
      // // Close the short position if hedged is true
      // if (record.hedged) {
      //   await closeShort(record.currency + "_USDT", record.hedgedAmount, record.userId);
      // }

      // Update the settled and hedged fields
      await record.update({ settled: true, hedged: false });
    }

    console.log(`Settled ${recordsToUpdate.length} records.`);
  } catch (error) {
    console.error("Error updating records:", error);
  }
}

module.exports = settleRecords;