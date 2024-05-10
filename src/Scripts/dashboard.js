// Carregar dados---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async function(){
    try{
        //Requisição para obter os dados do cliente
        const response = await fetch('/home');
        const userData = await response.json();

        console.log('Dados do usuário: ', userData);

        //Atualiza os dados conforme retornado no JSON
        if (userData.result && userData.result.length > 0) {
            
            const user = userData.result[0];

            document.getElementById('userName').innerText = user.nome;
            document.getElementById('userBank').innerText = user.userID.toString().padStart(9, '0');
            document.getElementById('saldo').innerText = "R$" + user.saldo.toFixed(2);
            document.getElementById('saldoCheque').innerText = "R$" + user.saldoC.toFixed(2);
        } else {

            console.error('Nenhum usuário encontrado.');
            alert('Nenhum usuário encontrado.');
        }
    } catch(error){

        console.log("Erro ao carregar os dados do cliente!");
        alert("Ocorreu um erro ao carregar os dados. Por favor tente novamente mais tarde!");
    }
});




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
