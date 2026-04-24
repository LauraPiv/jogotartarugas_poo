import { Minigame } from './Minigame.js';

export class JogoRede extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.player = { x: 50, y: 50 };
        this.redePos = -100;
        this.obstacles = [];
        this.frames = 0;
        this.teclas = {};
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background: #0077b6; overflow: hidden; z-index: 1;">
                <!-- Efeito Ondas -->
                <div style="position: absolute; width: 200%; height: 200%; background: url('https://www.transparenttextures.com/patterns/water.png'); opacity: 0.1; animation: waterMove 20s linear infinite;"></div>
            </div>
            
            <div style="position: relative; z-index: 10; height: 100%;">
                <div class="mission-header" style="position: absolute; top: 20px; right: 20px; background: rgba(255,0,0,0.4); padding: 10px 25px; border-radius: 30px; color: white; border: 2px solid white; backdrop-filter: blur(5px);">
                    <span style="font-weight: 900; letter-spacing: 1px;">! FUJA DA REDE!</span>
                </div>

                <div id="net-overlay" style="position: absolute; left: -100%; top: 0; width: 80%; height: 100%; background: rgba(50,50,50,0.6); border-right: 15px solid #333; z-index: 5; box-shadow: 20px 0 50px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: flex-end; padding-right: 20px;">
                    <div style="font-size: 5rem; opacity: 0.3; transform: rotate(-20deg); font-weight: 900; color: #fff;">REDE</div>
                </div>

                <div id="rede-player" style="position: absolute; left: 50%; top: 50%; width: 120px; height: 120px; background-image: url('/turtle_teen.png'); background-size: contain; background-repeat: no-repeat; transform: translate(-50%, -50%) rotate(90deg); z-index: 20; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.4)); transition: all 0.1s linear;"></div>
            </div>

            <style>
                @keyframes waterMove { from { transform: translate(0,0); } to { transform: translate(-50%, -50%); } }
                .coral-spike {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    background: #8b4513;
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                    z-index: 15;
                    filter: brightness(0.7);
                }
            </style>
        `;

        this.playerEl = document.getElementById('rede-player');
        this.netEl = document.getElementById('net-overlay');
        
        this._keydown = (e) => this.teclas[e.key] = true;
        this._keyup = (e) => this.teclas[e.key] = false;
        window.addEventListener('keydown', this._keydown);
        window.addEventListener('keyup', this._keyup);

        this.loop();
    }

    atualizar() {
        if (!this.ativo) return;
        this.frames++;

        // Movimentação do Jogador
        const speed = 1.2;
        if (this.teclas['ArrowLeft'] || this.teclas['a']) this.player.x -= speed;
        if (this.teclas['ArrowRight'] || this.teclas['d']) this.player.x += speed * 0.8; // Mais difícil ir pra direita
        if (this.teclas['ArrowUp'] || this.teclas['w']) this.player.y -= speed;
        if (this.teclas['ArrowDown'] || this.teclas['s']) this.player.y += speed;

        // Limites
        this.player.x = Math.max(5, Math.min(95, this.player.x));
        this.player.y = Math.max(5, Math.min(95, this.player.y));

        this.playerEl.style.left = `${this.player.x}%`;
        this.playerEl.style.top = `${this.player.y}%`;

        // Movimentação da Rede (Acelera com o tempo)
        this.redePos += 0.12 + (this.frames / 10000);
        this.netEl.style.left = `calc(${this.redePos}% - 80%)`;

        // Colisão com a Rede
        if (this.player.x < this.redePos) {
            this.encerrar(false);
            return;
        }

        // Spawn de Obstáculos (Corais/Pedras)
        if (this.frames % 60 === 0) {
            const obs = document.createElement('div');
            obs.className = 'coral-spike';
            obs.style.left = '110%';
            obs.style.top = `${Math.random() * 90}%`;
            this.container.appendChild(obs);
            this.obstacles.push({ el: obs, x: 110, y: parseFloat(obs.style.top) });
        }

        // Mover Obstáculos
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            let o = this.obstacles[i];
            o.x -= 1.5;
            o.el.style.left = `${o.x}%`;

            const p = this.playerEl.getBoundingClientRect();
            const e = o.el.getBoundingClientRect();
            if (p.right > e.left + 10 && p.left < e.right - 10 && p.bottom > e.top + 10 && p.top < e.bottom - 10) {
                this.player.x -= 10; // Empurra pra trás (em direção à rede)
                o.el.remove();
                this.obstacles.splice(i, 1);
            }

            if (o.x < -10) {
                o.el.remove();
                this.obstacles.splice(i, 1);
            }
        }

        // Vitória por sobrevivência (20 segundos)
        if (this.frames > 1200) {
            this.encerrar(true);
        }
    }

    encerrar(vitoria) {
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this._keydown);
        window.removeEventListener('keyup', this._keyup);
        this.finalizar({
            vitoria,
            xp: vitoria ? 80 : 20,
            mensagem: vitoria ? "Você escapou da rede fantasma!" : "Você ficou preso por muito tempo e perdeu forças..."
        });
    }
}
