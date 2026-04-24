import { Minigame } from './Minigame.js';

export class FlappyTurtle extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.turtle = null;
        this.scoreElement = null;
        this.obstacles = [];
        
        // Físicas (Gravidade e Pulo)
        this.y = 200;
        this.velocity = 0;
        this.gravity = 0.4;
        this.jumpStrength = -7;
        
        // Estado
        this.score = 0;
        this.frames = 0;
        this.gameStarted = false;
        
        this.handleInput = this.handleInput.bind(this);
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <!-- Fundo Personalizado Flappy -->
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background-image: url('/fundoflapturtle.png'); background-size: cover; background-position: center; z-index: 0; filter: brightness(0.85);"></div>
            
            <div class="flappy-score" id="flappy-score" style="position: relative; z-index: 10;">0</div>
            <div id="flappy-start-msg" style="position:absolute; top:40%; left:50%; transform:translate(-50%, -50%); color:white; font-size:2rem; font-weight:bold; z-index:20; text-align:center; text-shadow: 2px 2px 5px rgba(0,0,0,0.5);">Pressione ESPAÇO ou Clique<br>para começar</div>
            <div class="flappy-turtle" id="flappy-turtle" style="z-index: 15;"></div>
        `;
        this.turtle = document.getElementById('flappy-turtle');
        this.scoreElement = document.getElementById('flappy-score');
        
        // Posição inicial
        this.turtle.style.left = '100px';
        this.y = this.container.clientHeight / 2 - 50; // Centralizando 100px/2
        
        // Eventos
        this.container.addEventListener('mousedown', this.handleInput);
        window.addEventListener('keydown', this.handleInput);
        
        // Começa o loop da classe base Minigame
        this.loop();
    }

    handleInput(e) {
        if (!this.ativo) return;
        if (e.type === 'keydown' && e.code !== 'Space') return;
        
        if (!this.gameStarted) {
            this.gameStarted = true;
            const startMsg = document.getElementById('flappy-start-msg');
            if (startMsg) startMsg.style.display = 'none';
        }
        
        this.velocity = this.jumpStrength;
    }

    atualizar() {
        if (!this.gameStarted) return; // Aguarda o jogador
        
        this.frames++;
        
        // Física
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        // Atualiza a DOM da Tartaruga
        this.turtle.style.top = `${this.y}px`;
        // Rotação visual baseada na velocidade
        const rotation = Math.min(Math.max(this.velocity * 4, -25), 90);
        this.turtle.style.transform = `rotate(${rotation}deg)`;
        
        // Colisão com Teto e Chão
        if (this.y > this.container.clientHeight - 60 || this.y < 0) {
            this.gameOver();
        }
        
        // Spawn de Obstáculos (Corais)
        if (this.frames % 100 === 0) {
            this.spawnObstacle();
        }
        
        // Atualiza Obstáculos
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            let obs = this.obstacles[i];
            obs.x -= 4; // Velocidade do obstáculo
            
            obs.topEl.style.left = `${obs.x}px`;
            obs.bottomEl.style.left = `${obs.x}px`;
            
            // Pontuação
            if (!obs.passed && obs.x < 100) {
                this.score++;
                this.scoreElement.textContent = this.score;
                obs.passed = true;
            }
            
            // Verificação de Colisão
            if (this.checkCollision(obs)) {
                this.gameOver();
            }
            
            // Remoção se sair da tela
            if (obs.x < -80) {
                obs.topEl.remove();
                obs.bottomEl.remove();
                this.obstacles.splice(i, 1);
            }
        }
    }

    spawnObstacle() {
        const gap = 160; // Espaço para passar
        const minHeight = 50;
        const maxHeight = this.container.clientHeight - gap - minHeight;
        
        const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        const bottomHeight = this.container.clientHeight - topHeight - gap;
        
        const topEl = document.createElement('div');
        topEl.className = 'flappy-obstacle top';
        topEl.style.height = `${topHeight}px`;
        topEl.style.top = '0';
        topEl.style.left = `${this.container.clientWidth}px`;
        
        const bottomEl = document.createElement('div');
        bottomEl.className = 'flappy-obstacle bottom';
        bottomEl.style.height = `${bottomHeight}px`;
        bottomEl.style.bottom = '0';
        bottomEl.style.left = `${this.container.clientWidth}px`;
        
        this.container.appendChild(topEl);
        this.container.appendChild(bottomEl);
        
        this.obstacles.push({
            x: this.container.clientWidth,
            topEl,
            bottomEl,
            topHeight,
            bottomHeight,
            passed: false
        });
    }

    checkCollision(obs) {
        // Hitbox menor que a imagem (100px) para ficar justo: 20px de margem interna
        const turtleRect = { left: 100 + 20, right: 100 + 100 - 20, top: this.y + 20, bottom: this.y + 100 - 20 };
        const obsRectX = { left: obs.x, right: obs.x + 80 };
        
        if (turtleRect.right > obsRectX.left && turtleRect.left < obsRectX.right) {
            // Bateu no tubo superior
            if (turtleRect.top < obs.topHeight) return true;
            // Bateu no tubo inferior
            if (turtleRect.bottom > this.container.clientHeight - obs.bottomHeight) return true;
        }
        return false;
    }

    gameOver() {
        if (!this.ativo) return;
        this.ativo = false;
        this.container.removeEventListener('mousedown', this.handleInput);
        window.removeEventListener('keydown', this.handleInput);
        
        // Efeito visual de morte
        this.turtle.style.filter = "grayscale(1) brightness(2)";
        this.turtle.style.transform = "rotate(180deg) scale(1.5)";
        
        setTimeout(() => {
            this.finalizar({
                vitoria: false, // Minigame infinito
                xp: this.score * 2, // 2 XP por cano passado
                mensagem: `Fim de Jogo!\nVocê passou por ${this.score} recifes de corais.`
            });
        }, 1200);
    }
}
