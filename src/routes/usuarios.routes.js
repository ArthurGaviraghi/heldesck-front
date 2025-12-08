// Exemplo de como seria o arquivo usuarios.routes.js

import { Router } from 'express';
import { createUsuario } from '../controllers/usuarioController.js';

const usuariosRoutes = Router();

// Rota para criar um novo usuário
usuariosRoutes.post('/', createUsuario);

export default usuariosRoutes;