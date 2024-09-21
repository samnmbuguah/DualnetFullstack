const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const ShortBot = db.define(
  "ShortBot",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    strikePrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    size: {
      type: Sequelize.INTEGER,
    },
    investAmount: {
      type: Sequelize.DECIMAL(10, 2),
      validate: {
        min: 0.01,
      },
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    open: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ShortBot;