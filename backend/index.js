const routes = require('./src/routers');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const grupo = {
  criador : "Pedro",
  mensagem : "Não está ainda como indealizo, essa é apenas uma mensagem para testar a API",
}

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3580, () => {
  console.log("Executando a API");
});