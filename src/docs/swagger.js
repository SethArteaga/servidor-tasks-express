const SwaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title: 'Task management API',
            version:'1.0.0',
            description: 'API para gestionar tareas en una aplicación Express',
        },
        servers:[
            {
                url:'https://servidor-tasks-express.onrender.com/tasks'
            }
        ],
        components:{
            schemas:{
                Tasks:{
                    type:'object',
                    required:['title'],
                    properties:{
                        id:{
                            type:'integer',
                            example: 1,
                        },
                        title:{
                            type:'string',
                            example:'Mi tarea',
                        },
                        description:{
                            type:'string',
                            example:'Descripción de la tarea'
                        }
                    }
                }
            }
        }

    },
    apis:['./src/routes/*.js']
}

const swaggerSpec = SwaggerJSDoc(options);
const setupSwaggerDocs = (app) => {
    app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))
    console.log('swagger docs disponible en la ruta https://servidor-tasks-express.onrender.com/api-docs')
}

module.exports = setupSwaggerDocs