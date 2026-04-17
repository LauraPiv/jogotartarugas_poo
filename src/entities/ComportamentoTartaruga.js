export class ComportamentoTartaruga {
    constructor(uiSprite, uiBubble) {
        this.spriteElement = uiSprite;
        this.bubbleElement = uiBubble;
        this.estadoEmocional = 'feliz'; // feliz, assustada, cansada
    }

    reagirClique(sistemaEducacao) {
        // Mostra animação
        this.spriteElement.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.spriteElement.style.transform = 'scale(1) rotate(0deg)';
        }, 200);

        // Falar uma curiosidade aleatória
        const curiosidade = sistemaEducacao.getCuriosidade();
        this.falar(curiosidade);
    }

    falar(texto) {
        this.bubbleElement.textContent = texto;
        this.bubbleElement.classList.remove('hidden');
        
        // Remove a fala após 4 segundos
        clearTimeout(this.bubbleTimeout);
        this.bubbleTimeout = setTimeout(() => {
            this.bubbleElement.classList.add('hidden');
        }, 4000);
    }

    atualizarVisualidadeIdade(novaIdade) {
        // Remove classes antigas (ovinho, filhote, etc)
        this.spriteElement.classList.remove('ovinho', 'filhote', 'adolescente', 'adulta', 'idosa');
        this.spriteElement.classList.add(novaIdade);
    }
}
