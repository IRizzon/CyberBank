document.getElementById("cadastro").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    // Captura os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const CPF = document.getElementById("CPF").value;
    const senha = document.getElementById("senha").value;
    const saldoInicial = document.getElementById("saldoI").value;
    const saldoCheque = saldoInicial * 4;

    // Armazena os dados localmente usando localStorage
    const userData = { nome, CPF, senha, saldoInicial, saldoCheque };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Envia os dados para a rota de cadastro através de uma requisição POST
    const response = await fetch("/cadastrar", {
        method: "POST",
        headers: {
            // Define o tipo de conteúdo como JSON
            "Content-Type": "application/json" 
        },
        // Converte os dados para JSON e os envia no corpo da requisição
        body: JSON.stringify(userData) 
    });

    if (response.ok) { 
        window.location.href = "/user"; 
    } else { 
        const errorMessage = await response.json(); 
        alert(errorMessage.error); 
    }
});
