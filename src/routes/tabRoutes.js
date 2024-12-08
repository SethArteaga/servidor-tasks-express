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

router.get('/', taskController.getTasks);
router.get('/:id', validateTaskId, taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', validateTaskId.concat(validateTask), taskController.updateTask);
router.delete('/:id', validateTaskId, taskController.deleteTask);

module.exports = router