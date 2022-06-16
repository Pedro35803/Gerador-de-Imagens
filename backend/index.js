const routes = require('./src/routers');
const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = 3000;

app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`Executando em http://localhost:${port}`)
})