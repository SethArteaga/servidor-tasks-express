const pg = require('../config/db');

// Función para obtener todas las tareas
const getTasks = async() => {
    try {
        const res = await pg.query('SELECT * FROM tasks')
        return res.rows
    } catch (error) {
        throw error
    }
}


// Función para obtener las tareas por ID
const getTasksById = async (id) => {
    try {
        const res = await pg.query('SELECT * FROM tasks WHERE id = $1',[id]);
        return res.rows[0];
    } catch (error) {
        throw error
    }
}

// Función para crear una tarea
const createTask = async(task) => {
    
    const {title, descripcion} = task
    try {
        const res = await pg.query('INSERT INTO tasks (title, descripcion) VALUES ($1,$2) RETURNING *',[title,descripcion])
        return res.rows[0]
    } catch (error) {
        throw error
    }
}

// Función para actualizar una tarea
const updateTask = async(id, task) => {
    const {title, descripcion} = task

    try {
        const res = await pg.query('UPDATE tasks SET title = $1, descripcion = $2 WHERE id = $3 RETURNING * ',[title, descripcion,id] )
        return res.rows[0]
    } catch (error) {
        throw error
    }
}

// Función para eliminar una tarea
const deleteTask = async(id) => {
    try {
       const res = await pg.query('DELETE FROM tasks WHERE id = $1 RETURNING *',[id])
       return res.rows[0]
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask,
}
