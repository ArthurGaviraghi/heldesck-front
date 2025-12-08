import { Usuarios } from './usuarios.js';
import { Chamados } from './chamados.js';

// Relação: Um Usuário (seja técnico ou não) pode ter vários chamados.
// Um chamado pertence a um único usuário.
Usuarios.hasMany(Chamados, {
    foreignKey: 'usuario_id',
    as: 'chamados'
});

Chamados.belongsTo(Usuarios, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});

export { Usuarios, Chamados };