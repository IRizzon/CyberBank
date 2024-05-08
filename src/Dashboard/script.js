// Função para abrir o modal
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

//Abrir Modal
document.getElementById("btn-depositar").addEventListener("click", function() {
    console.log("clicou")
    openModal("modal-depositar");
});

document.getElementById("btn-sacar").addEventListener("click", function() {
    openModal("modal-sacar");
});

document.getElementById("btn-transferir").addEventListener("click", function() {
    openModal("modal-transferir");
});