const Favoritos = require("../database/models/Favoritos");


module.exports = {
    all(req, res, next) {
        Favoritos.findAll()
            .then((resultado) => res.json(resultado))
            .catch(next);
    },
    create(req, res, next) {
        const { id, user, linkImagem } = req.body;

        Favoritos.create(id, user, linkImagem)
            .then((resultado) => {
                res.status(201).json(resultado);
            })
            .catch(next)
    }
}