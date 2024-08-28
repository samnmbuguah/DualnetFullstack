const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const AutoDual = db.define("AutoDual", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.FLOAT,
    },
    threshold: {
        type: Sequelize.FLOAT,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    strikePrices: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        defaultValue: []
    }
}, {
    timestamps: true
});

module.exports = AutoDual;