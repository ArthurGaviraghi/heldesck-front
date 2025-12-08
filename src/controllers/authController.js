
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Usuarios } from '../models/index.js';

const segredoJwt = process.env.SEGREDO_JWT;
if (!segredoJwt) {
    throw new Error("A variável de ambiente SEGREDO_JWT não foi definida.");
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send({ mensagem: 'Email e senha são obrigatórios.' });
        }

        
        const usuarioEncontrado = await Usuarios.findOne({ where: { email: email } });

        if (!usuarioEncontrado) {
            return res.status(401).send({ mensagem: 'Credenciais inválidas.' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);

        if (!senhaCorreta) {
            return res.status(401).send({ mensagem: 'Credenciais inválidas.' });
        }

        const payload = {
            idUsuario: usuarioEncontrado.id,
            perfil: usuarioEncontrado.perfil,
            nome: usuarioEncontrado.nome
        };

        const token = jwt.sign(payload, segredoJwt, { expiresIn: '8h' });

        res.status(200).send({
            mensagem: 'Login bem-sucedido!',
            token: token
        });

    } catch (erro) {
        console.error('Erro no login:', erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
};

export { login };