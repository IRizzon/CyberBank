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
    },

    depositar: async (req, res) => {
        const { valor } = req.body;
        // Verifica se o ID do usuário está disponível na requisição
        const { userID } = req.user; 

        try {
            // Verifica se o valor do depósito é válido
            if (valor <= 0) {

                return res.status(400).json({ error: "Valor de depósito inválido" });
            }
            // Obtém os dados do usuário
            const userData = await userService.carregarDadosPorID(userID);
            if (!userData) {

                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            // Calcula o novo saldo após o depósito
            const novoSaldo = userData.saldo + valor;
            // Atualiza o saldo do usuário no banco de dados
            await userService.atualizarSaldo(userID, novoSaldo);

            return res.status(200).json({ message: "Depósito realizado com sucesso" });
        } catch (error) {
            console.error("Erro ao realizar depósito:", error);

            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    sacar: async (req, res) => {
        const { valor } = req.body;
        const { userID } = req.user;

        try {
            if (valor <= 0) {

                return res.status(400).json({ error: "Valor de saque inválido" });
            }
            const userData = await userService.carregarDadosPorID(userID);
            if (!userData) {

                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            // Verifica se o saldo é suficiente para o saque
            if (userData.saldo < valor) {

                return res.status(400).json({ error: "Saldo insuficiente" });
            }
            const novoSaldo = userData.saldo - valor;
            await userService.atualizarSaldo(userID, novoSaldo);

            return res.status(200).json({ message: "Saque realizado com sucesso" });
        } catch (error) {
            console.error("Erro ao realizar saque:", error);

            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    },

    transferir: async (req, res) => {
        const { valor, cpfDestinatario } = req.body;
        const { userID } = req.user; 

        try {
            if (valor <= 0) {

                return res.status(400).json({ error: "Valor de transferência inválido" });
            }

            // Obtém os dados do usuário remetente
            const userDataRemetente = await userService.carregarDadosPorID(userID);
            if (!userDataRemetente) {

                return res.status(404).json({ error: "Usuário remetente não encontrado" });
            }

            // Verifica se o saldo é suficiente para a transferência
            if (userDataRemetente.saldo < valor) {
                return res.status(400).json({ error: "Saldo insuficiente para transferência" });
            }

            // Obtém os dados do usuário destinatário
            let userDataDestinatario = await userService.carregarCPF(cpfDestinatario);
            if (!userDataDestinatario) {

                return res.status(400).json({ error: "Usuário não encontrado!" });
            } else {
                // Atualiza o saldo do destinatário com o valor da transferência
                const novoSaldoDestinatario = userDataDestinatario.saldo + valor;
                await userService.atualizarSaldo(userDataDestinatario.userID, novoSaldoDestinatario);
            }
            // Calcula o novo saldo do remetente após a transferência
            const novoSaldoRemetente = userDataRemetente.saldo - valor;
            // Atualiza o saldo do remetente no banco de dados
            await userService.atualizarSaldo(userID, novoSaldoRemetente);

            return res.status(200).json({ message: "Transferência realizada com sucesso" });
        } catch (error) {

            console.error("Erro ao realizar transferência:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
};