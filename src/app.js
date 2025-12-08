import "dotenv/config";
import express from "express";
import cors from "cors";
import { database, connectDatabase } from "./database.js";

import "./models/index.js";

import authRoutes from "./routes/auth.routes.js";
import chamadosRoutes from "./routes/chamados.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chamados", chamadosRoutes);
app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000; // Adiciona um fallback para a porta

app.listen(PORT, async () => {
  try {
    await connectDatabase(); // Chama a função de conexão
    await database.sync({ force: true }); // Sincroniza as tabelas com force: true
    console.log('Tabelas sincronizadas com sucesso.');
    console.log(`🚀 Servidor a rodar na porta ${PORT}`);
  } catch (error) {
    console.error('Erro ao iniciar o servidor ou sincronizar as tabelas:', error);
  }
});

