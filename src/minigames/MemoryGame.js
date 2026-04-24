import { Minigame } from './Minigame.js';

export class MemoryGame extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        // Lista de Emojis originais
        this.emojis = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.cards = [...this.emojis, ...this.emojis];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.canFlip = false;
        
        // Embaralhar
        this.cards.sort(() => Math.random() - 0.5);
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <!-- Fundo do Jogo -->
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background-image: url('/fundomemoria.png'); background-size: cover; background-position: center; z-index: 0; filter: brightness(0.8);"></div>
            
            <div style="position: relative; z-index: 1;">
                <div style="text-align: center; color: white; padding-top: 20px;">
                    <h3 style="font-size: 1.5rem; font-family: 'Outfit', sans-serif;">Ache os Pares!</h3>
                </div>
                <div class="memory-grid" id="memory-grid">
                    ${this.cards.map((emoji, index) => `
                        <div class="memory-card" data-emoji="${emoji}" data-index="${index}">
                            <div class="memory-card-front">${emoji}</div>
                            <div class="memory-card-back">
                                <img src="/cartavesso.png" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <style>
                .memory-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 120px);
                    gap: 15px;
                    justify-content: center;
                    padding: 20px;
                }
                .memory-card {
                    width: 120px;
                    height: 120px;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 0.5s;
                    cursor: pointer;
                }
                .memory-card.flipped {
                    transform: rotateY(180deg);
                }
                .memory-card-front, .memory-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                .memory-card-front {
                    background: white;
                    font-size: 4.5rem;
                    transform: rotateY(180deg);
                }
                .memory-card-back {
                    background: #0077b6;
                }
            </style>
        `;
        
        const cardElements = this.container.querySelectorAll('.memory-card');
        cardElements.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
        });
        
        setTimeout(() => {
            this.canFlip = true;
        }, 500);
        
        this.loop();
    }

    flipCard(card) {
        if (!this.canFlip) return;
        if (card.classList.contains('flipped')) return;
        
        card.classList.add('flipped');
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        this.canFlip = false;
        const [card1, card2] = this.flippedCards;
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            this.matchedPairs++;
            this.flippedCards = [];
            this.canFlip = true;
            
            if (this.matchedPairs === this.emojis.length) {
                this.gameOver();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.canFlip = true;
            }, 1000);
        }
    }

    gameOver() {
        this.ativo = false;
        setTimeout(() => {
            this.finalizar({
                vitoria: true,
                xp: 15,
                mensagem: "Parabéns! Você encontrou todos os pares!"
            });
        }, 800);
    }
}
