const userService = require("../Services/userService");

module.exports = {
    carregarDados: async (req, res) => {
        let json = {error:'', result:[]};
        
        let user = await userService.carregarDados();

        for(let i in user){
            json.result.push({
                conta: user[i].userID,
                nome: user[i].nome,
                CPF: user[i].CPF,
                saldo: user[i].saldo,
                saldoC: user[i].saldoCheque
            });
        }

        res.json(json);
    },

    carregarCPF : async (req, res) => {
        let json = {error:'', result:{}};

        let userID = req.params.userID;
        let user = await userService.carregarCPF(userID);

        if(user){
            json.result = user;
        }

        res.json(json);
    }//,

    //cadastrar: async(req, res) => {

    //}
}