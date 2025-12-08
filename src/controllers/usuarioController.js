

import { Usuarios } from '../models/index.js';
import bcrypt from 'bcrypt';

const createUsuario = async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        // Validação básica
        if (!nome || !email || !senha) {
            return res.status(400).send({ mensagem: 'Nome, email e senha são obrigatórios.' });
        }

        // Verifica se o email já existe
        const usuarioExistente = await Usuarios.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(409).send({ mensagem: 'Este email já está em uso.' });
        }

        // Criptografa a senha antes de salvar (MUITO IMPORTANTE)
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        const novoUsuario = await Usuarios.create({
            nome,
            email,
            senha: senhaCriptografada,
            perfil: perfil || 'usuario' // Define 'usuario' como perfil padrão
        });
        
        // Não retornar a senha na resposta
        novoUsuario.senha = undefined;

        res.status(201).send(novoUsuario);

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send({ mensagem: 'Erro interno no servidor.' });
    }
};

export { createUsuario };