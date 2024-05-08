// Dependências
require("dotenv").config({path: 'config.env'});
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Importa as rotas definidas
const routes = require("./routes")

// Instância do servidor Express
const server = express();

// Middleware para tratamento de CORS, análise do corpo da requisição
server.use(cors());
server.use(bodyParser.json());
server.use(morgan("dev"));

// Define as rotas a serem utilizadas
server.use("/api", routes);

// Inicia o servidor na porta especificada no arquivo de ambiente
server.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});