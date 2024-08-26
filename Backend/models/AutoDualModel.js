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
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    strikePrices: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = AutoDual;