const userService = require("../Services/userService");

module.exports = {

    //Carregar dados do usuário
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

    cadastrarUsuario: async (req, res) => {
        const { nome, CPF, senha, saldoInicial, saldoCheque } = req.body;

        try {
            const existingUser = await userService.carregarCPF(CPF);
            if (existingUser) {
                return res.status(400).json({ error: "CPF já cadastrado" });
            }

            userService.cadastrarUsuario(nome, CPF, senha, saldoInicial, saldoCheque);
            return res.status(201).json({ message: "Usuário cadastrado com sucesso" });

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    loginUsuario: async (req, res) => {
        const { CPF, senha } = req.body;

        try {
            const userData = await userService.carregarCPF(CPF);
            if (!userData || userData.senha !== senha) {
                return res.status(401).json({ error: "CPF ou senha incorretos" });
            }

            // local para adicionar a autenticação

            return res.status(200).json({ message: "Login realizado com sucesso" });
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
};