const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tabRoutes');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const { default: helmet } = require('helmet');
const setupSwaggerDocs = require('./docs/swagger');


dotenv.config()
const app = express();

const PORT = process.env.DB_PORT || 3000;
app.use(helmet())
app.use(bodyParser.json());
app.use('/tasks', taskRoutes); // asignación de rutas
setupSwaggerDocs(app)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});