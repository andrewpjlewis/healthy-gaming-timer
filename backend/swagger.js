// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Healthy Gaming Timer API',
    description: 'API documentation for authentication and status endpoints',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication routes using Google OAuth',
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);