const express = require("express");
const router = express.Router();

//import Controller

const userControl = require("./Controller/userControl");

router.get("/Home", userControl.carregarDados);
router.get("/Home/:userID", userControl.carregarDados);

module.exports = router;