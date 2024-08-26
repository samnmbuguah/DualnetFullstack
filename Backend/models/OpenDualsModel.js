const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const OpenDuals = db.define(
  "OpenDuals",
  {
    dualId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    strikePrice: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    expiryTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    apr: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    investAmount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    copies: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = OpenDuals;