const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const TopScans = db.define('TopScans', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	matchingPairId: {
		type: Sequelize.STRING
	},
	spotPrice: {
		type: Sequelize.FLOAT
	},
	futuresPrice: {
		type: Sequelize.FLOAT
	},
	valueDifference: {
		type: Sequelize.FLOAT
	},
	percentageDifference: {
		type: Sequelize.FLOAT
	},
	standardDeviation: {
		type: Sequelize.FLOAT
	},
}, {
	timestamps: true
});

module.exports = TopScans;
