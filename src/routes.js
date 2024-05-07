const express = require("express");
const router = express.Router();

//import Controller

const userControl = require("./Controller/userControl");

router.get("/home", userControl.carregarDados);
router.get("/home/:userID", userControl.carregarDados);

router.post("/cadastrar", userControl.cadastrarUsuario);
router.post("/login", userControl.loginUsuario);

module.exports = router;