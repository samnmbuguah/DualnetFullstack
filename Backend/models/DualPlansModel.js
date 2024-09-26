const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const DualPlans = db.define(
  "DualPlans",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    instrumentName: {
      type: Sequelize.STRING,
    },
    investCurrency: {
      type: Sequelize.STRING,
    },
    exerciseCurrency: {
      type: Sequelize.STRING,
    },
    exercisePrice: {
      type: Sequelize.DECIMAL,
    },
    minCopies: {
      type: Sequelize.INTEGER,
    },
    maxCopies: {
      type: Sequelize.INTEGER,
    },
    perValue: {
      type: Sequelize.FLOAT,
    },
    apyDisplay: {
      type: Sequelize.FLOAT,
    },
    deliveryTime: {
      type: Sequelize.INTEGER,
    },
    endTime: {
      type: Sequelize.INTEGER,
    },
    startTime: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    planType: {
      type: Sequelize.STRING,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = DualPlans;