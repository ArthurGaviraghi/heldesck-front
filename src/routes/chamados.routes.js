import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
    createChamado, 
    getAllChamados, 
    getChamadoById, 
    updateChamado, 
    deleteChamado 
} from '../controllers/chamadoController.js';

const chamadosRoutes = Router();

// Todas as rotas de chamados exigem autenticação
chamadosRoutes.use(authMiddleware);

// Rotas 
chamadosRoutes.post('/', createChamado);
chamadosRoutes.get('/', getAllChamados);
chamadosRoutes.get('/:id', getChamadoById);
chamadosRoutes.put('/:id', updateChamado);
chamadosRoutes.delete('/:id', deleteChamado);

export default chamadosRoutes;