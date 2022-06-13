const cors = require('cors');
const express = require('express');
const port = 3000;
const app = express();

app.use(cors());
app.get('/', (req, res) => {
	res.send(grupo);
});

app.listen(port, () => {
  console.log(`Executando em http://localhost:${port}`)
})