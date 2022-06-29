const { Sequelize } = require("sequelize");
require('dotenv').config();

const hostDoBD = String(process.env.DATABASE_URL);

const sequelize = new Sequelize(hostDoBD, {
    define: {
        timestamps: true,
        underscored: true,
    },
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

sequelize.authenticate()
    .then(() => console.log("Conexão com o BD feita com sucesso"))
    .catch((error) => console.log("Ocorreu algum error ao se conectar com o BD: " + error));

module.exports = sequelize;