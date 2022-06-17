const express = require("express");
const routes = express.Router();

const grupos = [{
  criador : "Pedro",
  mensagem : "Não está ainda como indealizo, essa é apenas uma mensagem para testar a API",
}]

routes.get("/", (req, res) => {
  return res.json(grupos);
});

routes.post("/add", (req, res) => {
  const novoGrupo = req.body;
  grupos.push(novoGrupo);
  return res.json(grupos);
});

module.exports = routes;