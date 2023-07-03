import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express, Router } from 'express';
const swaggerConfig = require('./swagger-config.js');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for my API',
    },
  },
  apis: ['src/infraestructure/routes/*.ts'], // Substitua pelo caminho correto dos seus arquivos de rotas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default (app: Express, router: Router) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
};
