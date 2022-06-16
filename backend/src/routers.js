const express = require("express");
const routes = express.Router();

const grupo = {
    criador : "Pedro",
    mensagem : "Não está ainda como indealizo, essa é apenas uma mensagem para testar a API",
  }

routes.get('/', (req, res) => {
    return res.json(grupo);
});

module.exports = routes