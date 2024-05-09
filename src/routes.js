// Importa o Express e cria um roteador
const express = require("express");
const router = express.Router();
const path = require('path')

// Importa o controlador do usuário
const userControl = require("./Controller/userControl");
                                //tentar com render
router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'home.html')));
router.get('/user', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'dashboard.html')));
router.get('/cadastrar', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'cadastro.html')));
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'login.html')));

// Define as rotas para carregar dados, cadastrar usuário e fazer login
router.get("/home", userControl.carregarDados);
router.get("/home/:userID", userControl.carregarDados);
router.post("/cadastrar", userControl.cadastrarUsuario);
router.post("/login", userControl.loginUsuario);
router.post("/depositar", userControl.depositar);
router.post("/sacar", userControl.sacar);
router.post("/transferir", userControl.transferir);

module.exports = router;
