// Importa o módulo do banco de dados
const cyberBankDB = require("../cyberBankDB")

module.exports = {
    // Função para carregar todos os dados dos usuários
    carregarDados: () => {
        return new Promise((accept, reject) => {
            // Realiza uma consulta no banco de dados para selecionar todos os dados dos usuários
            cyberBankDB.query("SELECT * FROM userdata", (error, results) => {
                if(error){ 
                    reject(error); 
                    return;
                }
                accept(results);
            })
        })
    },
    
    // Função para carregar os dados de um usuário pelo CPF
    carregarCPF: (CPF) => {
        return new Promise((accept, reject) => {
            // Realiza uma consulta no banco de dados para selecionar os dados do usuário pelo CPF
            console.log("Consultando usuário pelo CPF:", CPF);
            cyberBankDB.query("SELECT * FROM userdata WHERE CPF = ?", [CPF], (error, results) => {
                if(error){
                    console.error("Erro na consulta ao banco de dados:", error);
                    reject(error);
                    return;
                }
                if(results.length > 0){
                    console.log("Resultados da consulta:", results);
                    accept(results[0]);
                }else{
                    accept(false)
                }
            });
        });
    },

    // Função para cadastrar um novo usuário
    cadastrarUsuario: (nome, CPF, senha, saldoInicial, saldoCheque) => {
        return new Promise((resolve, reject) => {
            // Insere um novo usuário no banco de dados com os dados fornecidos
            cyberBankDB.query(
                "INSERT INTO userdata (nome, CPF, senha, saldo, saldoCheque) VALUES (?, ?, ?, ?, ?)",
                [nome, CPF, senha, saldoInicial, saldoCheque],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    // Função para realizar o login do usuário
    loginUsuario: (CPF, senha) => {
        return new Promise((resolve, reject) => {
            // Consulta o usuário pelo CPF e senha
            cyberBankDB.query(
                "SELECT * FROM userdata WHERE CPF = ? AND senha = ?",
                [CPF, senha],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.length > 0 ? results[0] : null);
                    }
                }
            );
        });
    }
};