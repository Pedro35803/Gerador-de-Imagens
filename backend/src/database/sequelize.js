const { Sequelize } = require("sequelize");

const hostDoBD = String(process.env.DATABASE_URL);

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: false,
//         },
//     },
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

// const sequelize = new Sequelize(process.env.DATABASE_URL)

sequelize
    .authenticate()
    .then(() => console.log("Conexão com o BD feita com sucesso"))
    .catch((error) => console.log("Ocorreu algum error ao se conectar com o BD: " + error));

module.exports = sequelize;