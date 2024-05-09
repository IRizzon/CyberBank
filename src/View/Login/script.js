document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Captura os valores dos campos do formulário
    const cpf = document.getElementById("cpfInput").value;
    const senha = document.getElementById("senhaInput").value;

    try {
        // Envia os dados para a rota de login através de uma requisição POST
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                // Define o tipo de conteúdo como JSON
                'Content-Type': 'application/json'
            },
            // Converte os dados para JSON e os envia no corpo da requisição
            body: JSON.stringify({ cpf, senha })
        });
        const data = await response.json();
        if (data.success) {
            // Login bem-sucedido, redirecionar para a página principal
            window.location.href = '/user';
        } else {
            alert('CPF ou senha incorretos. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
});