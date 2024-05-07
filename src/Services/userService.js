const cyberBankDB = require("../cyberBankDB")

module.exports = {
    carregarDados: () => {
        return new Promise((accept, reject) => {

            cyberBankDB.query("SELECT * FROM userdata", (error, results) => {
                if(error){ 
                    reject(error); 
                    return;
                }
                accept(results);
            })
        })
    },

    carregarCPF: (CPF) => {
        return new Promise((accept, reject) => {

            cyberBankDB.query("SELECT * FROM userdata WHERE CPF = ?", [CPF], (error, results) => {
                if(error){
                    reject(error);
                    return;
                }
                if(results.length > 0){
                    accept(results[0]);
                }else{
                    accept(false)
                }
            });
        });
    },

    cadastrarUsuario: (nome, CPF, senha, saldoInicial, saldoCheque) => {
        return new Promise((resolve, reject) => {
            // Inserir novo usuário no banco de dados
            cyberBankDB.query(
                "INSERT INTO userdata (nome, CPF, senha, saldo) VALUES (?, ?, ?, ?)",
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

    loginUsuario: (CPF, senha) => {
        return new Promise((resolve, reject) => {
            // Consultar o usuário pelo CPF e senha
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