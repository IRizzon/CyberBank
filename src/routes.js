// Importa o Express e cria um roteador
const express = require("express");
const router = express.Router();
const path = require('path')

// Importa o controlador do usuário
const userControl = require("./Controller/userControl");

router.get('/', (req, res) => res.sendFile(__dirname + "Principal", "index.html"))
router.get('/user', (req, res) => res.sendFile(__dirname + "Dashboard", "index.html" ))

// Define as rotas para carregar dados, cadastrar usuário e fazer login
router.get("/home", userControl.carregarDados);
router.get("/home/:userID", userControl.carregarDados);
router.post("/cadastrar", userControl.cadastrarUsuario);
router.post("/login", userControl.loginUsuario);

module.exports = router;
