export const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'POKEMON API',
            version: '1.0.0',
            description: 'Back-end for PokeDex',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['**/*.ts'],
};