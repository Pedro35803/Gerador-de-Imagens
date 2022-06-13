const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();

const grupo = {
  criador : "Pedro",
  mensagem : "Não está ainda como indealizo, essa é apenas uma mensagem para testar a API",
}

app.use(cors());
app.get('/', (req, res) => {
	res.send(grupo);
});

app.listen(port, () => {
  console.log(`Executando em http://localhost:${port}`)
})