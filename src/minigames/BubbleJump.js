import { Minigame } from './Minigame.js';

export class BubbleJump extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.width = 400; 
        this.height = container.clientHeight || 600;
        
        // Turtle State com Inércia
        this.turtle = {
            x: 200,
            y: this.height / 2,
            width: 100,
            height: 100,
            vx: 0,
            vy: 0,
            scaleX: 1
        };
        
        // Físicas (Doodle Jump feelings)
        this.gravity = 0.35;      // Mais flutuante (água)
        this.jumpForce = -11;     // Pulo mais forte
        this.acceleration = 1.5;  // Aceleração horizontal
        this.friction = 0.85;     // Atrito (deslizamento suave quando solta a tecla)
        
        // Jogo
        this.score = 0;
        this.platforms = [];
        this.keys = { left: false, right: false };
        this.gameStarted = false;
        
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <!-- Fundo Padronizado Arcade -->
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background-image: url('/fundomemoria.png'); background-size: cover; background-position: center; z-index: 0; filter: brightness(0.7);"></div>
            
            <div style="position: relative; z-index: 10; height: 100%;">
                <div class="runner-score-display">Altura: <span id="jump-score">0</span>m</div>
                <div id="jump-start-msg" style="position:absolute; top:40%; left:50%; transform:translate(-50%, -50%); color:white; font-size:2rem; font-weight:bold; z-index:20; text-align:center; text-shadow: 2px 2px 5px rgba(0,0,0,0.5);">Pressione ⬅️ ou ➡️<br>para começar!</div>
                <div class="jump-track" id="jump-track">
                    <div class="jump-turtle" id="jump-turtle"></div>
                </div>
            </div>
        `;
        
        this.track = document.getElementById('jump-track');
        this.turtleEl = document.getElementById('jump-turtle');
        this.scoreEl = document.getElementById('jump-score');
        
        setTimeout(() => {
            if(this.track) this.width = this.track.clientWidth;
        }, 10);
        
        this.turtle.x = this.width / 2 - this.turtle.width / 2;
        this.turtle.y = this.height / 2;
        
        this.createInitialPlatforms();
        
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        
        this.container.addEventListener('mousedown', (e) => {
            if (e.clientX < window.innerWidth / 2) this.keys.left = true;
            else this.keys.right = true;
            if(!this.gameStarted) this.startGame();
        });
        this.container.addEventListener('mouseup', () => {
            this.keys.left = false;
            this.keys.right = false;
        });
        
        this.loop();
    }

    createInitialPlatforms() {
        // Bolha inicial de segurança exatamente abaixo
        this.addPlatform(this.turtle.x - 5, this.turtle.y + 60);
        
        let y = this.height - 50;
        while (y > 0) {
            this.addPlatform(Math.random() * (this.width - 60), y);
            y -= 60 + Math.random() * 60; // Gaps mais previsíveis no começo
        }
    }

    addPlatform(x, y) {
        let el = document.createElement('div');
        el.className = 'jump-bubble';
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        this.track.appendChild(el);
        
        this.platforms.push({ x, y, width: 60, height: 20, el });
    }

    handleKeyDown(e) {
        if (!this.ativo) return;
        if (e.code === 'ArrowLeft') this.keys.left = true;
        if (e.code === 'ArrowRight') this.keys.right = true;
        if (!this.gameStarted && (e.code === 'ArrowLeft' || e.code === 'ArrowRight')) {
            this.startGame();
        }
    }

    handleKeyUp(e) {
        if (e.code === 'ArrowLeft') this.keys.left = false;
        if (e.code === 'ArrowRight') this.keys.right = false;
    }

    startGame() {
        this.gameStarted = true;
        const msg = document.getElementById('jump-start-msg');
        if(msg) msg.style.display = 'none';
        this.turtle.vy = this.jumpForce;
    }

    atualizar() {
        if (!this.gameStarted) return;
        
        // FÍSICA SUAVE (Inércia e Aceleração)
        if (this.keys.left) this.turtle.vx -= this.acceleration;
        if (this.keys.right) this.turtle.vx += this.acceleration;
        
        // Aplica atrito para deslizar gostoso
        this.turtle.vx *= this.friction;
        this.turtle.x += this.turtle.vx;
        
        // Pac-Man Effect (Sai de um lado entra do outro de forma invisível)
        if (this.turtle.x < -this.turtle.width) this.turtle.x = this.width;
        if (this.turtle.x > this.width) this.turtle.x = -this.turtle.width;
        
        // Gravidade
        this.turtle.vy += this.gravity;
        this.turtle.y += this.turtle.vy;
        
        // Virar o Sprite para a direção do movimento
        if (this.turtle.vx < -0.5) this.turtle.scaleX = -1;
        else if (this.turtle.vx > 0.5) this.turtle.scaleX = 1;
        
        this.turtleEl.style.transform = `scaleX(${this.turtle.scaleX})`;
        
        // Colisão com Bolhas (Hitbox muito generosa focada nos pés)
        if (this.turtle.vy > 0) {
            let feetY = this.turtle.y + this.turtle.height;
            let centerFeetX = this.turtle.x + (this.turtle.width / 2);
            
            for (let p of this.platforms) {
                // Checa se os "pés" da tartaruga cruzaram o topo da bolha
                if (feetY > p.y && feetY < p.y + p.height + 15) {
                    // Checa se o centro da tartaruga está dentro da largura da bolha (+ margem)
                    if (centerFeetX > p.x - 10 && centerFeetX < p.x + p.width + 10) {
                        
                        this.turtle.vy = this.jumpForce;
                        
                        // Efeito visual na bolha ao ser pisada
                        p.el.style.transform = "scale(0.8) translateY(10px)";
                        setTimeout(() => { if(p.el) p.el.style.transform = "scale(1) translateY(0)"; }, 150);
                        break; 
                    }
                }
            }
        }
        
        // Câmera Suave e Geração Infinita
        let midScreen = this.height / 2;
        if (this.turtle.y < midScreen) {
            let offset = midScreen - this.turtle.y;
            this.turtle.y = midScreen;
            
            this.score += Math.floor(offset / 10);
            this.scoreEl.textContent = this.score;
            
            for (let i = this.platforms.length - 1; i >= 0; i--) {
                let p = this.platforms[i];
                p.y += offset;
                p.el.style.top = `${p.y}px`;
                
                if (p.y > this.height) {
                    p.el.remove();
                    this.platforms.splice(i, 1);
                    
                    // Geração procedural de plataformas
                    // Diminui o gap e cria mais aleatoriedade conforme sobe
                    let gap = 50 + Math.random() * (80 + Math.min(this.score / 5, 60)); 
                    let newY = this.platforms.length > 0 ? this.platforms[this.platforms.length-1].y - gap : -50;
                    
                    // Prevenção para garantir que não spawna muito alto
                    if (newY < -this.height) newY = -50; 
                    
                    this.addPlatform(Math.random() * (this.width - 60), newY);
                }
            }
        }
        
        // Atualiza a View
        this.turtleEl.style.left = `${this.turtle.x}px`;
        this.turtleEl.style.top = `${this.turtle.y}px`;
        
        // Game Over
        if (this.turtle.y > this.height + 50) {
            this.gameOver();
        }
    }

    gameOver() {
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        
        setTimeout(() => {
            this.finalizar({
                vitoria: false,
                xp: this.score,
                mensagem: `Game Over!\nVocê subiu ${this.score} metros!\nE ganhou ${this.score} XP.`
            });
        }, 1000);
    }
}
