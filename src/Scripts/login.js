document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('loginForm');
    if(form){
        document.getElementById("loginForm").addEventListener("submit", async function(e) {
            e.preventDefault();
    
            // Captura os valores dos campos do formulário
            const CPF = document.getElementById("cpfLogin").value;
            const senha = document.getElementById("passLogin").value;

            console.log("CPF digitado: ", CPF);
            console.log("senha digitada: ", senha);
    
            try {
                // Envia os dados para a rota de login através de uma requisição POST
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        // Define o tipo de conteúdo como JSON
                        'Content-Type': 'application/json'
                    },
                    // Converte os dados para JSON e os envia no corpo da requisição
                    body: JSON.stringify({ CPF, senha })
                });
                const data = await response.json();
                console.log("Resposta do servidor:", data);
                if (response.ok) {
                    console.log('Usuário logado!')
                    // Login bem-sucedido, redirecionar para a página principal
                    window.location.href = '/dashboard';
                } else {
                    alert('CPF ou senha incorretos. Por favor, tente novamente.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
            }
        });
    }
});