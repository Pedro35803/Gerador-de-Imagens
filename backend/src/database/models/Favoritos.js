const { DataTypes } = require("sequelize");

const sequelize = require("../sequelize.js");

const Favoritos = sequelize.define("favoritos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    linkImagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Cria a tabela se ela não existir

const init = async () => {
    await Favoritos.sync();
}

init();

module.exports = Favoritos;