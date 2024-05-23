const userService = require("../Services/userService");

// Função para carregar os dados do usuário logado
const carregarDados = async (req, res) => {
    console.log("Solicitação para carregar dados recebida!");

    try {
        // Obtém o CPF do usuário logado a partir do objeto de solicitação (req)
        const CPF = req.user.CPF;
        const user = await userService.carregarCPF(CPF);

        // Verifica se o usuário foi encontrado
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Retorna os dados do usuário em formato JSON
        return res.json({
            userID: user.userID,
            nome: user.nome,
            CPF: user.CPF,
            saldo: user.saldo,
            saldoC: user.saldoCheque
        });
    } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

// Função para carregar a página dashboard.html com os dados do usuário
const carregarDashboard = async (req, res) => {
    console.log("Solicitação para carregar a página do dashboard recebida!");

    try {
        // Verifica se o usuário está autenticado
        console.log("Usuário autenticado:", req.user);
        if (!req.user) {
            return res.redirect('/login');
        }

        const CPF = req.user.CPF;
        console.log("CPF do usuário autenticado:", CPF);
        const userData = await userService.carregarCPF(CPF);

        if (!userData) {
            console.log("Usuário não encontrado. Retornando erro 404...");
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        console.log("Renderizando a página do dashboard com os dados do usuário:", userData);
        return res.render('dashboard', { userData });
    } catch (error) {
        console.error("Erro ao carregar a página do dashboard:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

// Função para cadastrar um novo usuário
const cadastrarUsuario = async (req, res) => {
    const { nome, CPF, senha, saldoInicial, saldoCheque } = req.body;

    try {
        // Verifica se o CPF já está cadastrado
        const existingUser = await userService.carregarCPF(CPF);
        if (existingUser) {
            return res.status(400).json({ error: "CPF já cadastrado" });
        }
        // Chama a função para cadastrar o usuário
        await userService.cadastrarUsuario(nome, CPF, senha, saldoInicial, saldoCheque);

        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

// Função para realizar o login do usuário
const loginUsuario = async (req, res) => {
    const { CPF, senha } = req.body;

    try {
        // Realiza o login do usuário
        const userData = await userService.loginUsuario(CPF, senha);

        // Verifica se o login foi bem-sucedido
        if (!userData) {
            return res.status(401).json({ error: "CPF ou senha incorretos" });
        }

        return res.status(200).json({ message: "Login realizado com sucesso", userData });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

module.exports = { carregarDados, carregarDashboard, cadastrarUsuario, loginUsuario };