import { ConnectionDB } from "../cyberBankDB";

const mysql = require("mysql");

//----------Cadastro

async function insertUser(nome, CPF, senha, saldoI, saldoC){
    try {
        const connection = await ConnectionDB(mysql);
        const sql = "INSERT INTO userdata (nome, CPF, senha, saldo, saldoCheque) VALUES (?, ?, ?, ?, ?)"
        const values = [nome, CPF, senha, saldoI, saldoC];
        connection.query(sql, values, function(err, result){
            if(err){
                console.error("Erro ao cadastrar: ", err);
                return;
            }
            console.log("Cadastrado com sucesso!");
        });
    } catch(error){
        console.error("Erro ao conectar ao banco de dados: ", error);
    }

}

document.getElementById("cadastro").addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const CPF = document.getElementById("CPF").value;
    const senha = document.getElementById("senha").value;
    const saldoI = document.getElementById("saldoI").value;
    const saldoC = saldoI * 4

    insertUser( nome, CPF, senha, saldoI, saldoC);

});