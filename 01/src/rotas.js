const express = require('express')
const rotas = express();
const alunos = require('./controladores/alunos')
const { validarSenha } = require('./intermediarios')
rotas.use(validarSenha);
rotas.get('/alunos', alunos.listarAlunos);
rotas.get('/alunos/:id', alunos.obterAluno);
rotas.post('/alunos', alunos.cadastrarAluno);
rotas.delete('/alunos/:id', alunos.deletarAluno);

module.exports = rotas;