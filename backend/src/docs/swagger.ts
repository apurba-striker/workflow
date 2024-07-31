import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Workflo API',
            version: '1.0.0',
            description: 'API documentation for trello clone created using Node.js and Typescript.',
        },
        servers: [
            {
                url: `https://trello-uf51.onrender.com/api`,
            },
        ],
    },
    apis: [
            './src/api/routes/auth/*.ts', 
            './src/api/routes/auth/oauth/*.ts',
            './src/api/routes/student/*.ts',
            './src/api/routes/admin/*.ts',
            './src/api/routes/task/*.ts',
        ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
