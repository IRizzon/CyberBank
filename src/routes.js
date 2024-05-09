// Importa o Express e cria um roteador
const express = require("express");
const router = express.Router();
const path = require('path')

// Importa o controlador do usuário
const userControl = require("./Controller/userControl");
                                //tentar com render
router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'View', 'Principal', 'index.html')));
router.get('/user', (req, res) => res.sendFile(path.join(__dirname, 'View', 'Dashboard', 'index.html')));

// Define as rotas para carregar dados, cadastrar usuário e fazer login
router.get("/home", userControl.carregarDados);
router.get("/home/:userID", userControl.carregarDados);
router.post("/cadastrar", userControl.cadastrarUsuario);
router.post("/login", userControl.loginUsuario);
router.post("/depositar", userControl.depositar);
router.post("/sacar", userControl.sacar);
router.post("/transferir", userControl.transferir);

module.exports = router;
