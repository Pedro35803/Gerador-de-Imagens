const routes = require('./src/routers');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3580, () => {
  console.log("Executando a API");
});