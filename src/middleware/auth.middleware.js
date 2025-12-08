import jwt from 'jsonwebtoken';

const segredoJwt = process.env.SEGREDO_JWT;

// ADICIONADO PARA DEBUG: Verifica se a variável de ambiente foi carregada.
console.log('[auth.middleware] SEGREDO_JWT carregado:', segredoJwt);

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ mensagem: 'Token não fornecido ou mal formatado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, segredoJwt);
        req.usuario = payload; 
        next();
    } catch (error) {
        // ADICIONADO PARA DEBUG: Mostra o erro exato da biblioteca jsonwebtoken.
        console.error('[auth.middleware] Erro na verificação do token:', error.message);
        
        return res.status(401).send({ 
            mensagem: 'Token inválido ou expirado.',
            erro: error.message // Opcional: enviar o erro para o front-end em desenvolvimento
        });
    }
};

export { authMiddleware };