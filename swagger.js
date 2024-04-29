const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express Sql API',
            description: 'API endpoints of Express Sql API',
            contact: {
                name: 'Nishat Roy',
                url: 'https://github.com/nishat65/pr-express-sql.git',
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api/`,
                description: 'Local server',
            },
        ],
    },
    // looks for configuration in specified directories
    apis: ['./src/routes/auth.js'],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}
module.exports = swaggerDocs;
