const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'API de Clientes',
    version: '1.0.0',
    description: 'Documentação da API de Clientes',
  },
  servers: [
    {
      url: 'http://localhost:3000', // Altere o URL base conforme necessário
    },
  ],
  paths: {
    '/clientes': {
      post: {
        summary: 'Cadastrar um novo cliente',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Cliente',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Cliente cadastrado com sucesso',
          },
          '400': {
            description: 'Erro de validação ou dados inválidos',
          },
          '500': {
            description: 'Erro interno do servidor',
          },
        },
      },
      get: {
        summary: 'Obter todos os clientes',
        responses: {
          '200': {
            description: 'Lista de clientes retornada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Cliente',
                  },
                },
              },
            },
          },
          '500': {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
    '/clientes/{id}': {
      get: {
        summary: 'Obter um cliente pelo ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Cliente retornado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Cliente',
                },
              },
            },
          },
          '404': {
            description: 'Cliente não encontrado',
          },
          '500': {
            description: 'Erro interno do servidor',
          },
        },
      },
      put: {
        summary: 'Atualizar um cliente',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Cliente',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Cliente atualizado com sucesso',
          },
          '400': {
            description: 'Erro de validação ou dados inválidos',
          },
          '404': {
            description: 'Cliente não encontrado',
          },
          '500': {
            description: 'Erro interno do servidor',
          },
        },
      },
      delete: {
        summary: 'Remover um cliente',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Cliente removido com sucesso',
          },
          '404': {
            description: 'Cliente não encontrado',
          },
          '500': {
            description: 'Erro interno do servidor',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Cliente: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          nome: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          cpf: {
            type: 'string',
          },
          endereco: {
            type: 'string',

          },
        },
      },
    },
  },
};

module.exports = swaggerConfig;
