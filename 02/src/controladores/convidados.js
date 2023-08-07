let convidados = require('../dados/bancodedados');
const listaConvidados = (req, res) => {
    const { nome } = req.query;
    
    if (nome) {
      const convidadoEncontrado = convidados.includes(nome);
      if (convidadoEncontrado) {
        return res.status(200).json({ mensagem: 'Convidado presente.' });
      } else {
        return res.status(404).json({ mensagem: 'O convidado buscado não está presente na lista.' });
      }
    }
  
    return res.status(200).json(convidados);
  };

  const adicionarConvidado = (req, res) => {
    const { nome } = req.body;
    
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ mensagem: 'O nome do convidado não foi fornecido.' });
    }
  
    if (convidados.includes(nome)) {
      return res.status(400).json({ mensagem: 'O nome do convidado a ser adicionado já existe na lista. Caso queira adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também.' });
    }
  
    convidados.push(nome);
    return res.status(201).json({ mensagem: 'Convidado adicionado.' });
  };

  const removerConvidado = (req, res) => {
    const { nome } = req.params;
    
    if (!convidados.includes(nome)) {
      return res.status(404).json({ mensagem: 'O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido.' });
    }
  
    convidados = convidados.filter((convidado) => convidado !== nome);
    return res.status(200).json({ mensagem: 'Convidado removido.' });
  };

  module.exports = { listaConvidados, adicionarConvidado, removerConvidado };