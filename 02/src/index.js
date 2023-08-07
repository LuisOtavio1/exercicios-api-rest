const { listaConvidados, adicionarConvidado, removerConvidado } = require('./controladores/convidados')
const express = require('express')
const app = express();
app.use(express.json());
app.get('/convidados', listaConvidados);
app.post('/convidados', adicionarConvidado);
app.delete('/convidados/:nome', removerConvidado);
app.listen(3000);

