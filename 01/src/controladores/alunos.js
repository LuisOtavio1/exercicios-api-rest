let { alunos } = require('../dados/bancodedados');
const listarAlunos = (req, res) => {
    return res.status(200).json(alunos);
}

const obterAluno = (req, res) => {
    let numeroValidado = true;
    const { id } = req.params;
    
    const validarNumero = (id) => {
        const padrao = /^\d+$/;
        return padrao.test(id);
    }
    numeroValidado = validarNumero(id);
    if(!numeroValidado) {
        return res.status(400).json({ mensagem: 'o ID deve ser um número válido.' });
    } 

    const aluno = alunos.find((alunoAtual) => {
        return alunoAtual.id === Number(id);
    });

    if(!aluno) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado.' });
    }
    return res.status(200).json(aluno);
}

const cadastrarAluno = (req, res) => {
    const { nome, sobrenome, idade, curso } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    }

    if (!sobrenome || sobrenome.trim() === "") {
        return res.status(400).json({ mensagem: 'O sobrenome é obrigatório' });
    }
    
    if (!idade || idade.trim() === "") {
        return res.status(400).json({ mensagem: 'A idade é obrigatória' });
    }
    
    if (!curso || curso.trim() === "") {
        return res.status(400).json({ mensagem: 'O curso é obrigatório' });
    }

    if (idade < 18) {
        return res.status(400).json({ mensagem: 'Você é menor de idade'});
    }

    let idAluno = alunos.length + 1;
    const aluno = {
        id: idAluno++,
        nome,
        sobrenome,
        idade,
        curso
    }

    alunos.push(aluno)
    return res.status(201).json();
}

const deletarAluno = (req, res) => {
    let numeroValidado = true;
    const { id } = req.params;

    const validarNumero = (id) => {
        const padrao = /^\d+$/;
        return padrao.test(id);
    }

    numeroValidado = validarNumero(id);
    if(!numeroValidado) {
        return res.status(400).json({ mensagem: 'o ID deve ser um número válido.' });
    } 

    const aluno = alunos.find((alunoAtual) => {
        return alunoAtual.id === Number(id);
    });

    if(!aluno) {
        return res.status(404).json({ mensagem: 'O aluno a ser excluído não foi encontrado.' });
    }

    alunos = alunos.filter((aluno) => {
        return aluno.id !== Number(id);
    })

    return res.status(200).json(aluno);
}

module.exports = {
    listarAlunos,
    obterAluno,
    cadastrarAluno,
    deletarAluno
}