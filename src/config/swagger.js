
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digital Store API',
      version: '1.0.0',
      description: 'API REST para gerenciamento de produtos da Digital Store.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      schemas: {
        ProductInput: {
          type: 'object',
          required: ['name', 'price', 'category'],
          properties: {
            name: { type: 'string', example: 'Tenis Nike' },
            price: { type: 'number', example: 299.9 },
            category: { type: 'string', example: 'Calcados' }
          }
        },
        Product: {
          allOf: [
            { $ref: '#/components/schemas/ProductInput' },
            {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 1 },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            }
          ]
        }
      }
    },
    paths: {
      '/api/products': {
        get: {
          summary: 'Listar todos os produtos',
          tags: ['Produtos'],
          responses: {
            200: {
              description: 'Lista de produtos',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Product' }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Cadastrar um produto',
          tags: ['Produtos'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductInput' }
              }
            }
          },
          responses: {
            201: { description: 'Produto criado com sucesso' },
            400: { description: 'Dados inválidos' }
          }
        }
      },
      '/api/products/{id}': {
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
            description: 'ID do produto'
          }
        ],
        get: {
          summary: 'Buscar produto por ID',
          tags: ['Produtos'],
          responses: {
            200: { description: 'Produto encontrado' },
            400: { description: 'ID inválido' },
            404: { description: 'Produto não encontrado' }
          }
        },
        put: {
          summary: 'Atualizar um produto',
          tags: ['Produtos'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProductInput' }
              }
            }
          },
          responses: {
            200: { description: 'Produto atualizado' },
            400: { description: 'Dados inválidos' },
            404: { description: 'Produto não encontrado' }
          }
        },
        delete: {
          summary: 'Excluir um produto',
          tags: ['Produtos'],
          responses: {
            204: { description: 'Produto excluído' },
            400: { description: 'ID inválido' },
            404: { description: 'Produto não encontrado' }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJsdoc(options);
