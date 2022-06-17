const { Sequelize } = require("sequelize");
require('dotenv').config();

const hostDoBD = String(process.env.DATABASE_URL);

const sequelize = new Sequelize(hostDoBD, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

module.exports = sequelize;