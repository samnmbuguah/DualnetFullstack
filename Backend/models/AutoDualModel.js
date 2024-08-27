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
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    threshold: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            min: 0.01
        }
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