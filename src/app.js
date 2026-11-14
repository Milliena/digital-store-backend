
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import routes from './routes/index.js';

export const createApp = () => {
  const app = express();

  // Middlewares globais
  app.use(cors());
  app.use(express.json());

  // Documentação Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Rotas da API
  app.use('/api', routes);

  // Tratamento global de erros
  app.use((err, req, res, next) => {
    console.error(err.stack || err);

    res.status(err.status || 500).json({
      error: true,
      message: err.message || 'Erro interno no servidor'
    });
  });

  return app;
};
