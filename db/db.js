//======================================conexion MYSql=======================================
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error("Error en la conexión a la base de datos:", err);
        return;
    }

    console.log("Conectado exitosamente a la Base de Datos");
});

module.exports = connection;


//=============================== conexion SQLite============================================


// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// // Crear o abrir la base de datos SQLite
// const dbPath = path.resolve(__dirname, 'database.db');
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Error al abrir la base de datos', err.message);
//     } else {
//         console.log('Conexión a la base de datos SQLite establecida');
//     }
// });

// // Exportar la instancia de la base de datos para poder usarla en otros archivos
// module.exports = db;