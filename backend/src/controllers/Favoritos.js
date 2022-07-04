const { QueryTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Favoritos = require("../database/models/Favoritos");

module.exports = {
    async getFavoritos(req, res, next) {
        await sequelize.query("Select * from favoritos", { type:  QueryTypes })
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async get(req, res, next) {
        const { user } = req.body;

        await sequelize.query("Select * from favoritos WHERE user = ?", { 
            type:  QueryTypes,
            replacements: user
        })
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async create(req, res, next) {
        const { user, linkImagem, linkHtml } = req.body;
        
        await Favoritos.create({user, linkImagem, linkHtml})
            .then((resultado) => {
                res.status(201).json(resultado);
            })
            .catch(next)
    },

    async delete(req, res, next) {
        const { id } = req.body;

        Favoritos.destroy({
            where: {
                id: id
            }
        }).then((resultado) => {
            res.status(204).json(resultado);
        })
        .catch(next)
    }
}