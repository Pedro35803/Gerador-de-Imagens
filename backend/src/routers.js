const express = require("express");
const routes = express.Router();

const favoritosConstroler = require('./controllers/Favoritos');

routes.get("/", favoritosConstroler.all);
routes.post("/add", favoritosConstroler.create);

module.exports = routes;