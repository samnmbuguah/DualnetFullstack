const { Op } = require("sequelize");
const moment = require("moment");
const TopScans = require("../models/TopScanModel.js");

async function isLastPercentageDifferenceHigher() {
	const scans = await TopScans.findAll({
		where: {
			updatedAt: {
				[Op.gte]: moment().subtract(1, "day").toDate(), // updated within the last 1 day
			},
		},
		attributes: ['id', 'percentageDifference', 'updatedAt'],
		order: [['updatedAt', 'DESC']]
	});

	if (scans.length < 14) {
		return false;
	}

	const values = scans.map(scan => scan.percentageDifference);
	const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
	const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
	const standardDeviation = Math.sqrt(variance);
	const meanPlusTwoStdDev = mean + (standardDeviation * 2.1);

	const lastPercentageDifference = values[0];

	// Save meanPlusTwoStdDev to the standardDeviation field of the last updated TopScan
	const lastUpdatedScan = scans[0];
	await TopScans.update(
		{ standardDeviation: meanPlusTwoStdDev },
		{ where: { id: lastUpdatedScan.id } }
	);

	return lastPercentageDifference > meanPlusTwoStdDev;
}

module.exports = isLastPercentageDifferenceHigher;
