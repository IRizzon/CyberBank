import { ConnectionDB } from "../cyberBankDB";
import mysql from "mysql"




//----------Cadastro

document.getElementById("cadastro").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const CPF = document.getElementById("CPF").value;
    const senha = document.getElementById("senha").value;
    const saldoI = document.getElementById("saldoI").value;


});