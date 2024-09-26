const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const DualHistory = db.define(
  "DualHistory",
  {
    orderId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    dualId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    settled: {
      type: Sequelize.BOOLEAN,
    },
    hedged: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    settlementCurrency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    strikePrice: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    settlementTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    apy: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    investAmount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    hedgeBotOpen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    hedgedAmount: {
      type: Sequelize.INTEGER,
    },
    copies: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dualType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priceAtExpiration: {
      type: Sequelize.DECIMAL,
    },
    settleAmount: {
      type: Sequelize.DECIMAL,
    },
    shortSize: {
      type: Sequelize.DECIMAL,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = DualHistory;