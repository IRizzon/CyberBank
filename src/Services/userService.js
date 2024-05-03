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

    carregarCPF: (userID) => {
        return new Promise((accept, reject) => {

            cyberBankDB.query("SELECT * FROM userdata WHERE CPF = ?", [userID], (error, results) => {
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
    }

};