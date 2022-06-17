const { Sequelize } = require("sequelize");

const nomeDoBD = process.env.DB_NAME;
const usuarioDoBD = process.env.DB_NAME;
const HostDoBD = process.env.DB_URL;
const SenhaDoDB = process.env.DB_PASSWORD;

const sequelize = new Sequelize(nomeDoBD, usuarioDoBD, SenhaDoDB, HostDoBD, {
    dialect: "postgres",
    host: HostDoBD, 
});

try {
    await sequelize.authenticate();
    console.log("Conexão com o Banco de Dados estabelecida com sucesso.");
} catch (error) {
    console.error("Aconteceu algum problema na conexão: ", error);
}

export default sequelize;