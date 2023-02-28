import swaggerJsdoc from 'swagger-jsdoc';

const swaggerConfiguration = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopp App using Express API with Swagger',
      version: '2.0',
      description:
            'Shop App using PERN Stack and docker, documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'blanho',
        url: 'https://github.com/blanho',
        email: 'h.baolan20025@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: ['./server/controllers/*.ts']
};

const spec = swaggerJsdoc(swaggerConfiguration);

export default spec;
