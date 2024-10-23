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
    investment: {
        type: Sequelize.INTEGER,
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
    dualInvestments: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: []
    },
    closerStrike: {
        type: Sequelize.FLOAT,
    },
    thresholdTwo: {
        type: Sequelize.INTEGER,
    },
    scaleBy: {
        type: Sequelize.INTEGER,
    }
}, {
    timestamps: true
});

module.exports = AutoDual;