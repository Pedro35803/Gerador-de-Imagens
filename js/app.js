const express = require('express')
const port = 3000;
const app = express();

let grupo = [
    {name: "Pedro Júnior", img: "../img/minha_foto.jpg", description: "Estudante de ADS e progamador back-end, resposavel por todo o projeto"}
]

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Executando em http://localhost:${port}`)
})