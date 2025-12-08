// Importar pacote da ORM Sequelize
import { Sequelize } from 'sequelize'

// Adicionamos o objeto de opções com o dialeto
const database = new Sequelize(process.env.DATABASE, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Para ambientes de desenvolvimento, pode ser true em produção
        }
    }
})

async function connectDatabase() {
    try {
        // Testar a conexão com o banco de dados
        await database.authenticate()
        console.log('Conectado com sucesso')
    } catch(erro) {
        console.error('Erro na conexão:', erro) 
    }
}

export { database, connectDatabase }

