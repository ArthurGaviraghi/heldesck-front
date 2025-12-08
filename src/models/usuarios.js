
import { database } from "../database.js"; // Caminho corrigido
import { DataTypes } from "sequelize";

// Por convenção, nomes de modelos usam PascalCase (Usuarios)
const Usuarios = database.define('usuarios', {
  id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
  }, 
  nome: {
      type: DataTypes.STRING(100)
  },
  email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
  },
  senha: {
    type: DataTypes.STRING(255)
  },
  perfil: {
    type: DataTypes.STRING(20),
    allowNull: false, 
    defaultValue: 'usuario', 
    validate: {
      isIn: [['usuario', 'tecnico']] 
    }
  }
}, {
    tableName: 'usuarios',
    timestamps: false
});

export { Usuarios };