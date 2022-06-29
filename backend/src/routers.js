const express = require("express");
const routes = express.Router();

const favoritosConstroler = require('./controllers/Favoritos');

routes.get("/", favoritosConstroler.getFavoritos);
routes.post("/", favoritosConstroler.create);

module.exports = routes;