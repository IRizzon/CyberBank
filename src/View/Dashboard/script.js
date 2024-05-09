// Função para abrir o modal----------------------------------------------------
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";

    //Fechar Modal
    var closeBtn = modal.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    //Fechar Modal ao clicar fora da tela
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

document.getElementById("btn-depositar").addEventListener("click", function() {
    openModal("modal-depositar");
});

document.getElementById("btn-sacar").addEventListener("click", function() {
    openModal("modal-sacar");
});

document.getElementById("btn-transferir").addEventListener("click", function() {
    openModal("modal-transferir");
});

// Simular funções da página------------------------------------------------------
function depositar() {
    var inputAmount = document.getElementById("depositar-valor");
    var amount = inputAmount.value;

    console.log(`Depositado R$${amount}`);
}
function sacar() {
    var inputAmount = document.getElementById("sacar-valor");
    var amount = inputAmount.value;

    console.log(`Sacado R$${amount}`);
}

function transferir() {
    var inputCPF = document.getElementById("transferir-cpf");
    var inputAmount = document.getElementById("transferir-valor");
    var cpf = inputCPF.value;
    var amount = inputAmount.value;

    console.log(`Transferido R$${amount} para o CPF: ${cpf}`);
}

document.getElementById("btn-confirmar-depositar").addEventListener("click", function() {
    depositar();
});

document.getElementById("btn-confirmar-sacar").addEventListener("click", function() {
    sacar();
});

document.getElementById("btn-confirmar-transferir").addEventListener("click", function() {
    transferir();
});
