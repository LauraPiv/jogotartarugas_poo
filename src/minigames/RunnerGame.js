import { Minigame } from './Minigame.js';

export class RunnerGame extends Minigame {
    constructor(container, onComplete, oceanManager) {
        super(container, onComplete);
        this.oceanManager = oceanManager;
        this.lanes = [0, 1, 2]; // Esquerda, Centro, Direita
        this.currentLane = 1; // Começa no centro
        this.score = 0;
        this.speed = 7; // Começa mais rápido
        this.frames = 0;
        this.items = []; // Obstáculos e comidas
        this.gameStarted = false;
        
        this.handleInput = this.handleInput.bind(this);
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <!-- Fundo Padronizado Arcade -->
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background-image: url('/fundomemoria.png'); background-size: cover; background-position: center; z-index: 0; filter: brightness(0.6);"></div>
            
            <div style="position: relative; z-index: 10; height: 100%;">
                <div class="runner-score-display">Score: <span id="runner-score">0</span></div>
                <div id="runner-start-msg" style="position:absolute; top:40%; left:50%; transform:translate(-50%, -50%); color:white; font-size:1.8rem; font-weight:bold; z-index:20; text-align:center; text-shadow: 2px 2px 5px rgba(0,0,0,0.5);">Use ESQUERDA e DIREITA<br>para desviar das sacolas (vermelhas)<br>e pegar águas-vivas (verdes)!</div>
                <div class="runner-track" id="runner-track">
                    <div class="runner-lane"></div>
                    <div class="runner-lane"></div>
                    <div class="runner-lane"></div>
                    <div class="runner-turtle" id="runner-turtle"></div>
                </div>
            </div>
        `;
        
        this.track = document.getElementById('runner-track');
        this.turtleEl = document.getElementById('runner-turtle');
        this.scoreEl = document.getElementById('runner-score');
        
        // Posição inicial visual
        setTimeout(() => {
            this.updateTurtlePosition();
        }, 50);
        
        // Eventos
        window.addEventListener('keydown', this.handleInput);
        
        // Suporte a clique nas metades da tela para mobile/mouse
        this.container.addEventListener('mousedown', (e) => {
            if (e.clientX < window.innerWidth / 2) {
                this.moveLeft();
            } else {
                this.moveRight();
            }
        });
        
        this.loop();
    }

    handleInput(e) {
        if (!this.ativo) return;
        
        if (e.code === 'ArrowLeft') {
            this.moveLeft();
        } else if (e.code === 'ArrowRight') {
            this.moveRight();
        }
    }

    moveLeft() {
        if (!this.gameStarted) this.startGame();
        if (this.currentLane > 0) {
            this.currentLane--;
            this.updateTurtlePosition();
        }
    }

    moveRight() {
        if (!this.gameStarted) this.startGame();
        if (this.currentLane < 2) {
            this.currentLane++;
            this.updateTurtlePosition();
        }
    }

    startGame() {
        this.gameStarted = true;
        const msg = document.getElementById('runner-start-msg');
        if(msg) msg.style.display = 'none';
    }

    updateTurtlePosition() {
        if (!this.track) return;
        // Cada lane é ~33.3% do track.
        const laneWidth = this.track.clientWidth / 3;
        // Centraliza a tartaruga (que tem 100px) na lane
        const leftPos = (this.currentLane * laneWidth) + (laneWidth / 2) - 50;
        this.turtleEl.style.left = `${leftPos}px`;
    }

    atualizar() {
        if (!this.gameStarted) return;
        
        this.frames++;
        
        // Aumentar dificuldade muito mais rápido (a cada 150 frames)
        if (this.frames % 150 === 0) {
            this.speed += 0.4;
        }
        
        // Spawn de itens muito mais frequente (Sequência intensa)
        const spawnRate = Math.max(12, Math.floor(60 - this.speed * 3));
        if (this.frames % spawnRate === 0) {
            this.spawnItem();
        }
        
        // Atualizar itens
        const trackHeight = this.track.clientHeight;
        
        for (let i = this.items.length - 1; i >= 0; i--) {
            let item = this.items[i];
            item.y += this.speed;
            item.el.style.top = `${item.y}px`;
            
            // Checar colisão
            // A tartaruga está fixada em bottom: 20px e tem height: 100px.
            // O trackHeight varia. Em termos de Y (top):
            const turtleTop = trackHeight - 120;
            const turtleBottom = trackHeight - 20;
            const itemTop = item.y;
            const itemBottom = item.y + 60; // Item tem 60px de altura
            
            if (item.lane === this.currentLane && 
                itemBottom > turtleTop && 
                itemTop < turtleBottom) {
                
                // Colidiu!
                if (item.type === 'obstacle') {
                    if (this.oceanManager) this.oceanManager.poluir(5);
                    this.gameOver();
                } else if (item.type === 'food') {
                    this.score += 10;
                    this.scoreEl.textContent = this.score;
                    
                    // Limpa o oceano ao comer comida saudável!
                    if (this.oceanManager) this.oceanManager.limpar(2);
                    item.el.remove();
                    this.items.splice(i, 1);
                    this.turtleEl.style.transform = "scale(1.2)";
                    setTimeout(() => { if(this.ativo) this.turtleEl.style.transform = "scale(1)"; }, 150);
                    continue;
                }
            }
            
            // Remover se saiu da tela pelo fundo
            if (item.y > trackHeight) {
                // Se desviou do lixo com sucesso, o oceano fica mais limpo!
                if (item.type === 'obstacle' && this.oceanManager) {
                    this.oceanManager.limpar(0.5);
                }
                item.el.remove();
                this.items.splice(i, 1);
            }
        }
    }

    spawnItem() {
        const lane = Math.floor(Math.random() * 3);
        const isFood = Math.random() > 0.7; // 30% chance de comida, 70% obstáculo
        
        const el = document.createElement('div');
        el.className = `runner-item ${isFood ? 'runner-food' : 'runner-obstacle'}`;
        
        // Randomizar visuais (Bolinha Verde para Água-Viva, Bolinha Vermelha para Sacola Plástica)
        if (isFood) {
            el.innerHTML = `
                <div style="width: 60px; height: 60px; background: #2ecc71; border-radius: 50%; box-shadow: 0 0 20px #2ecc71; display: flex; align-items: center; justify-content: center; border: 3px solid white;">
                    <img src="https://img.icons8.com/color/48/jellyfish.png" style="width: 40px; height: 40px;">
                </div>`;
        } else {
            el.innerHTML = `
                <div style="width: 60px; height: 60px; background: #e74c3c; border-radius: 50%; box-shadow: 0 0 20px #e74c3c; display: flex; align-items: center; justify-content: center; border: 3px solid white;">
                    <img src="https://img.icons8.com/color/48/plastic-bag.png" style="width: 40px; height: 40px;">
                </div>`;
        }
        
        // Posição inicial no topo
        el.style.top = '-60px';
        const laneWidth = this.track.clientWidth / 3;
        const leftPos = (lane * laneWidth) + (laneWidth / 2) - 30;
        el.style.left = `${leftPos}px`;
        
        this.track.appendChild(el);
        
        this.items.push({
            el,
            lane,
            y: -60,
            type: isFood ? 'food' : 'obstacle'
        });
    }

    gameOver() {
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this.handleInput);
        
        // Efeito visual de morte tóxica/lixo
        this.turtleEl.style.filter = "grayscale(1) brightness(0.5) sepia(1) hue-rotate(-50deg)";
        this.turtleEl.style.transform = "scale(1.2) rotate(15deg)";
        
        setTimeout(() => {
            this.finalizar({
                vitoria: false,
                xp: Math.floor(this.score / 5), // XP Escalado
                mensagem: `Game Over!\nVocê coletou ${this.score} pontos nas profundezas.`
            });
        }, 1500);
    }
}
