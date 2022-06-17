const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");

const Favoritos = sequelize.define("favoritos", {
    id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    linkImagem: DataTypes.STRING,
});

// Cria a tabela se ela não existir
const init = async () => {
    await Favoritos.sync();
}

init();

module.exports = Favoritos;