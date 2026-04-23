import { Game } from './systems/Game.js';

// Inicializa o jogo quando o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Instancia o orquestrador global
    window.gameInstance = new Game();
});
