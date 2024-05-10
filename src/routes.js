// Importa dependencias
const express = require("express");
const router = express.Router();
const path = require('path');
const userControl = require("./Controller/userControl");
const passport = require('passport')
                                
// Rota de autenticação
router.get('/user', passport.authenticate('local', { failureRedirect: '/login' }), userControl.carregarDados);

// Rotas de Paginas
router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'home.html')));
router.get('/dashboard', userControl.carregarDashboard);
router.get('/cadastrar', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'cadastro.html')));
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'login.html')));

// Define as rotas para carregar dados, cadastrar usuário e fazer login
router.get("/home", userControl.carregarDados);
router.post("/cadastrar", userControl.cadastrarUsuario);
router.post("/login", userControl.loginUsuario);
router.post("/depositar", userControl.depositar);
router.post("/sacar", userControl.sacar);
router.post("/transferir", userControl.transferir);

module.exports = router;
