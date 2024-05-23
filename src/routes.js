const express = require("express");
const router = express.Router();
const path = require('path');
const userControl = require("./Controller/userControl");
const passport = require('./passport'); // Importando o arquivo passport.js

// Rota de autenticação
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

// Rotas de Páginas
router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'home.html')));
router.get('/dashboard', ensureAuthenticated, userControl.carregarDashboard); // Adicionando o middleware de autenticação
router.get('/cadastrar', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'cadastro.html')));
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'Pages', 'login.html')));

// Define as rotas para carregar dados, cadastrar usuário e fazer login
router.get("/home", userControl.carregarDados);
router.post("/cadastrar", userControl.cadastrarUsuario);
router.post("/login", userControl.loginUsuario);

// Middleware para verificar autenticação do usuário
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;