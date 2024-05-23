// Dependências
require("dotenv").config({path: 'config.env'});
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require('connect-flash');

// Importa as rotas definidas
const routes = require("./routes")
const passport = require("passport")
require("./passport")

// Instância do servidor Express
const server = express();

// Configurar sessão
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Iniciar Passport
server.use(passport.initialize());
server.use(passport.session());

// Middleware para tratamento de CORS, análise do corpo da requisição
server.use(flash());
server.use(cors());
server.use(bodyParser.json());
server.use(morgan("dev"));

// Define as rotas a serem utilizadas
server.use(routes);
server.use(express.static(path.join(__dirname, "View")));
server.use(express.static(path.join(__dirname, "Assets")))
server.use(express.static(path.join(__dirname, 'Scripts')))

// Inicia o servidor na porta especificada no arquivo de ambiente
server.listen(process.env.PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});