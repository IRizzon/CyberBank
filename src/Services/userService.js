const cyberBankDB = require("../cyberBankDB");

// Função para carregar os dados de um usuário pelo CPF
const carregarCPF = (CPF) => {
    return new Promise((resolve, reject) => {
        cyberBankDB.query("SELECT * FROM userdata WHERE CPF = ?", [CPF], (error, results) => {
            if (error) {
                console.error("Erro na consulta ao banco de dados:", error);
                return reject(error);
            }
            if (results.length > 0) {
                return resolve(results[0]);
            } else {
                return resolve(false);
            }
        });
    });
};

// Função para cadastrar um novo usuário
const cadastrarUsuario = (nome, CPF, senha, saldoInicial, saldoCheque) => {
    return new Promise((resolve, reject) => {
        cyberBankDB.query(
            "INSERT INTO userdata (nome, CPF, senha, saldo, saldoCheque) VALUES (?, ?, ?, ?, ?)",
            [nome, CPF, senha, saldoInicial, saldoCheque],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            }
        );
    });
};

// Função para realizar o login do usuário
const loginUsuario = (CPF, senha) => {
    return new Promise((resolve, reject) => {
        cyberBankDB.query(
            "SELECT * FROM userdata WHERE CPF = ? AND senha = ?",
            [CPF, senha],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results.length > 0 ? results[0] : null);
            }
        );
    });
};

module.exports = { carregarCPF, cadastrarUsuario, loginUsuario };