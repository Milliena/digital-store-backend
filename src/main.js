import { createApp } from './app.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`[BACKEND] Servidor rodando com sucesso na porta ${PORT}`);
      console.log(`[BACKEND] API disponível em http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('[BACKEND] Falha ao inicializar o servidor:', error);
    process.exit(1);
  }
};

startServer();