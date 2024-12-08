const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

const {body, param, validationResult} = require('express-validator');
const validateTask = [
    body('title')
    .isLength({min:1}).withMessage('Title is required')
    .isString().withMessage('Title is string')
    .trim().escape(),
    body('descripcion').optional()
    .isString().withMessage('Descripción es un string')
    .trim().escape()

]

const validateTaskId = [
    param('id')
    .isInt({gt:0}).withMessage('The task id has to be greater than 0 and positive')
    .toInt()
]

/**
 * 
 * @swagger
 * /tasks:
 *  get:
 *    summary: Obtiene todas las tasks   
 *    responses:
 *      200:
 *        description: Lista de todas las tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Tasks'  
 *                 
 *
 * */ 

router.get('/', taskController.getTasks);

/**
 * 
 * @swagger
 * /tasks/{id}:
 *  get:
 *    summary: Obtiene una task por id  
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *        description: ID de la task                 
 *    responses:
 *      200:
 *        description: Lista de todas las tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Tasks'  
 *      404:
 *       description: Task not found              
 *
 * */ 
router.get('/:id', validateTaskId, taskController.getTaskById);



/**
 * 
 * @swagger
 * /tasks:
 *   post:
 *    summary: Crea una nueva tasks
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Tasks'     
 *    responses:
 *      200:
 *       description: Lista de todas las tasks
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Tasks'  
 *      400: 
 *       description: Error de validación             
 *
 * */ 
router.post('/', validateTask, taskController.createTask);

/**
 * 
 * @swagger
 * /tasks:
 *   put:
 *    summary: Actualiza una tarea existente
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *        description: ID de la task
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Tasks'     
 *    responses:
 *      200:
 *       description: Lista de todas las tasks
 *       content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Tasks' 
 *      404:
 *       description: Task not found 
 *      400: 
 *       description: Error de validación             
 *
 * */
router.put('/:id', validateTaskId.concat(validateTask), taskController.updateTask);


/**
 * 
 * @swagger
 * /tasks/{id}:
 *  delete:
 *    summary: Elimina una task por id  
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: integer
 *        description: ID de la task                 
 *    responses:
 *      200:
 *        description: Tarea eliminada exitosamente
 *      404:
 *       description: Task not found              
 *
 * */ 
router.delete('/:id', validateTaskId, taskController.deleteTask);

module.exports = router