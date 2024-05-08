document.getElementById("cadastro").addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const CPF = document.getElementById("CPF").value;
    const senha = document.getElementById("senha").value;
    const saldoInicial = document.getElementById("saldoI").value;
    const saldoCheque = saldoInicial * 4; // Calcula o saldo do cheque

    // Envia os dados para a rota de cadastro através de uma requisição POST
    const response = await fetch("/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ nome, CPF, senha, saldoInicial, saldoCheque }) // Converte os dados para JSON e os envia no corpo da requisição
    });

    if (response.ok) { // Se a resposta da requisição for bem-sucedida
        window.location.href = "/user"; // Redireciona para a página do usuário
    } else { // Se houver algum erro na resposta da requisição
        const errorMessage = await response.json(); // Converte a resposta para JSON
        alert(errorMessage.error); // Exibe uma mensagem de alerta com o erro
    }
});
