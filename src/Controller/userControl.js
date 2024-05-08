// Importa o serviço do usuário
const userService = require("../Services/userService");

module.exports = {
    // Função para carregar os dados do usuário
    carregarDados: async (req, res) => {
        let json = {error:'', result:[]};
        
        // Carrega os dados dos usuários
        let user = await userService.carregarDados();

        // Formata os dados e envia a resposta em formato JSON
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

    // Função para cadastrar um novo usuário
    cadastrarUsuario: async (req, res) => {
        const { nome, CPF, senha, saldoInicial, saldoCheque } = req.body;

        try {
            // Verifica se o CPF já está cadastrado
            const existingUser = await userService.carregarCPF(CPF);
            if (existingUser) {
                return res.status(400).json({ error: "CPF já cadastrado" });
            }

            // Chama a função para cadastrar o usuário
            userService.cadastrarUsuario(nome, CPF, senha, saldoInicial, saldoCheque);
            return res.status(201).json({ message: "Usuário cadastrado com sucesso" });

        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    // Função para realizar o login do usuário
    loginUsuario: async (req, res) => {
        const { CPF, senha } = req.body;

        try {
            // Carrega os dados do usuário pelo CPF
            const userData = await userService.carregarCPF(CPF);
            // Verifica se o usuário existe e se a senha está correta
            if (!userData || userData.senha !== senha) {
                return res.status(401).json({ error: "CPF ou senha incorretos" });
            }

            // Ponto de integração com autenticação (ainda a ser implementado)

            return res.status(200).json({ message: "Login realizado com sucesso" });
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
};