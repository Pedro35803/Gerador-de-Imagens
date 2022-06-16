const { Sequelize } = require("sequelize");

const urlConexaoComBD = process.env.DATABASE_URL;

const sequelize = new Sequelize(urlConexaoComBD, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
} catch (error) {
    console.error('Aconteceu algum problema na conexão: ', error);
}

module.exports = sequelize