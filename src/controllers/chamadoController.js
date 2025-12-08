import { Chamados, Usuarios } from '../models/index.js';

// [POST] /chamados - Cria um novo chamado
const createChamado = async (req, res) => {
    try {
        const { titulo, descricao, categoria, prioridade } = req.body;
        const usuario_id = req.usuario.idUsuario; // ID do usuário logado (vem do middleware)

        if (!titulo || !descricao) {
            return res.status(400).send({ mensagem: 'Título e descrição são obrigatórios.' });
        }

        const novoChamado = await Chamados.create({
            titulo,
            descricao,
            categoria,
            prioridade,
            usuario_id
        });

        res.status(201).send(novoChamado);
    } catch (error) {
        console.error('Erro ao criar chamado:', error);
        res.status(500).send({ mensagem: 'Erro interno no servidor.' });
    }
};

// [GET] /chamados - Lista chamados (todos para técnicos, apenas os seus para usuários)
const getAllChamados = async (req, res) => {
    try {
        const { perfil, idUsuario } = req.usuario;
        let filtro = {};

        // Se o perfil não for 'tecnico', filtre para mostrar apenas os chamados do próprio usuário.
        if (perfil !== 'tecnico') {
            filtro = { where: { usuario_id: idUsuario } };
        }

        const chamados = await Chamados.findAll({
            ...filtro,
            include: [{ model: Usuarios, as: 'usuario', attributes: ['id', 'nome', 'email'] }],
            order: [['criado_em', 'DESC']]
        });

        res.status(200).send(chamados);
    } catch (error) {
        console.error('Erro ao buscar chamados:', error);
        res.status(500).send({ mensagem: 'Erro interno no servidor.' });
    }
};

// [GET] /chamados/:id - Busca um chamado específico
const getChamadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { perfil, idUsuario } = req.usuario;

        const chamado = await Chamados.findByPk(id, {
            include: [{ model: Usuarios, as: 'usuario', attributes: ['id', 'nome', 'email'] }]
        });

        if (!chamado) {
            return res.status(404).send({ mensagem: 'Chamado não encontrado.' });
        }

        // Se o usuário não for técnico, verifique se o chamado pertence a ele
        if (perfil !== 'tecnico' && chamado.usuario_id !== idUsuario) {
            return res.status(403).send({ mensagem: 'Acesso negado.' });
        }

        res.status(200).send(chamado);
    } catch (error) {
        res.status(500).send({ mensagem: 'Erro interno no servidor.' });
    }
};

// [PUT] /chamados/:id - Atualiza um chamado
const updateChamado = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizacao = req.body;
        const { perfil, idUsuario } = req.usuario;

        const chamado = await Chamados.findByPk(id);

        if (!chamado) {
            return res.status(404).send({ mensagem: 'Chamado não encontrado.' });
        }

        // Usuário comum não pode alterar o status e só pode editar seu próprio chamado
        if (perfil !== 'tecnico') {
            if (chamado.usuario_id !== idUsuario) {
                return res.status(403).send({ mensagem: 'Acesso negado.' });
            }
            // Impede que o usuário comum altere o status
            delete dadosAtualizacao.status;
        }

        await chamado.update(dadosAtualizacao);
        res.status(200).send(chamado);

    } catch (error) {
        console.error('Erro ao atualizar chamado:', error);
        res.status(500).send({ mensagem: 'Erro interno no servidor.' });
    }
};

// [DELETE] /chamados/:id - Deleta um chamado
const deleteChamado = async (req, res) => {
    try {
        const { id } = req.params;
        const { perfil, idUsuario } = req.usuario;

        const chamado = await Chamados.findByPk(id);

        if (!chamado) {
            return res.status(404).send({ mensagem: 'Chamado não encontrado.' });
        }

        // Apenas um técnico ou o próprio dono do chamado pode deletar
        if (perfil !== 'tecnico' && chamado.usuario_id !== idUsuario) {
            return res.status(403).send({ mensagem: 'Acesso negado. Você não tem permissão para deletar este chamado.' });
        }

        await chamado.destroy();
        res.status(204).send(); // 204 No Content

    } catch (error) {
        res.status(500).send({ mensagem: 'Erro interno no servidor.' });
    }
};


export { createChamado, getAllChamados, getChamadoById, updateChamado, deleteChamado };