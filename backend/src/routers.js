const express = require("express");
const routes = express.Router();

const favoritosConstroler = require('./controllers/Favoritos');

routes.get("/", favoritosConstroler.getFavoritos);
routes.delete("/", favoritosConstroler.delete);
routes.get("/:user", favoritosConstroler.get);
routes.post("/", favoritosConstroler.create);

module.exports = routes;