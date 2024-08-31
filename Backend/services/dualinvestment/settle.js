const DualHistory = require("../../models/DualHistoryModel.js");
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

    // Update the settled field to true for the found records
    for (const record of recordsToUpdate) {
      await record.update({ settled: true });
    }

    console.log(`settled ${recordsToUpdate.length} records.`);
  } catch (error) {
    console.error("Error updating records:", error);
  }
}

module.exports = settleRecords;