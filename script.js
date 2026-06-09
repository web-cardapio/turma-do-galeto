const audioChurrasco = document.getElementById('somChurrasco');
const btnSom = document.getElementById('btnSom');
const iconeSom = document.getElementById('iconeSom');
const textoSom = document.getElementById('textoSom');

let tocando = false;

// Garante o arquivo local na memória do sistema
if (audioChurrasco) {
    audioChurrasco.src = "brasa.mp3";
    audioChurrasco.load(); 
}

// FUNÇÃO CRUCIAL: Força o play e atualiza o botão para verde "Ouvindo"
function ligarBraseiroAutomatico() {
    if (audioChurrasco && !tocando) {
        audioChurrasco.volume = 0.5; // Volume confortável em 50%
        audioChurrasco.play()
            .then(() => {
                tocando = true;
                iconeSom.className = "fa-solid fa-volume-high";
                textoSom.innerText = "Ouvindo o chiado da brasa viva!";
                btnSom.style.color = "#2ec4b6"; // Botão fica verde de sucesso
                
                // Remove os ouvintes para não ficar tentando dar play toda hora
                removerGatilhos();
            })
            .catch((erro) => {
                console.log("Navegador segurando o áudio. Aguardando movimento do usuário.");
            });
    }
}

// Remove os eventos automáticos assim que o som liga com sucesso
function removerGatilhos() {
    window.removeEventListener('scroll', ligarBraseiroAutomatico);
    window.removeEventListener('mousemove', ligarBraseiroAutomatico);
    window.removeEventListener('touchstart', ligarBraseiroAutomatico);
    document.removeEventListener('click', ligarBraseiroAutomatico);
}

// AUTOMÁTICO INDESTRUTÍVEL: Qualquer micro-movimento do cliente ativa o som imediatamente
window.addEventListener('scroll', ligarBraseiroAutomatico, { passive: true });
window.addEventListener('mousemove', ligarBraseiroAutomatico, { passive: true });
window.addEventListener('touchstart', ligarBraseiroAutomatico, { passive: true });
document.addEventListener('click', ligarBraseiroAutomatico, { once: true });


// BOTÃO APENAS PARA PARAR (MUTE / UNMUTE MANUAL)
btnSom.addEventListener('click', function(event) {
    event.stopPropagation(); // Impede que o clique no botão ative os eventos do body
    
    if (audioChurrasco) {
        if (tocando) {
            // Se já estiver tocando, ele PAUSA
            audioChurrasco.pause();
            tocando = false;
            iconeSom.className = "fa-solid fa-volume-xmark";
            textoSom.innerText = "Som da brasa mutado (Clique para voltar)";
            btnSom.style.color = "#ffb700"; // Volta para o amarelo padrão
        } else {
            // Se o cliente quiser ligar novamente por escolha própria
            tocando = false; // Reseta a flag para permitir o play
            ligarBraseiroAutomatico();
        }
    }
});
