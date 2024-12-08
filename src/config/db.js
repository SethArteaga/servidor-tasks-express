const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl:{
        rejectUnauthorized: true,
        ca:fs.readFileSync('src/certs/ca.crt').toString()
    }
})

//Verificar conexión
pool.connect((err,client,release) => {
    if(err){
        console.log('error de conexión', err.stack);
    }else{
        console.log('conexión exitosa');
        release()
    }
})

module.exports = pool