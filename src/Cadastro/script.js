document.getElementById("cadastro").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const CPF = document.getElementById("CPF").value;
    const senha = document.getElementById("senha").value;
    const saldoInicial = document.getElementById("saldoI").value;
    const saldoCheque = saldoInicial * 4

    const response = await fetch("/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, CPF, senha, saldoInicial, saldoCheque })
    });

    if (response.ok) {

        window.location.href = "/user"; 
    } else {
        
        const errorMessage = await response.json();
        alert(errorMessage.error);
    }
});