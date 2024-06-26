const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if(error) throw error;
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`)
});

module.exports = connection;