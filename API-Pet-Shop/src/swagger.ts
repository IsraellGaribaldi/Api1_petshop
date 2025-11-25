// O código configura o Swagger para uma API Express, gerando documentação interativa com base em anotações nos arquivos de rota.

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Opções de configuração para o swagger-jsdoc.
const options = {
  definition: {
    openapi: '3.0.0', // Especifica a versão do OpenAPI.
    info: {
      title: 'API de Petshop',
      version: '1.0.0',
      description: 'API para gerenciar um petshop, incluindo clientes, pets, funcionários, atendimentos e produtos',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base da API.
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos que contêm as anotações da API (rotas).
};

// Gera as especificações do Swagger com base nas opções.
const specs = swaggerJsdoc(options);

// Função para configurar o middleware do Swagger UI no aplicativo Express.
export const setupSwagger = (app: Express) => {
  // Rota para a documentação da API.
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
