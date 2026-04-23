import { Minigame } from './Minigame.js';

export class JogoNascimento extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.player = { x: 50, y: 5 };
        this.gaivotas = [];
        this.frames = 0;
        this.teclas = {};
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background: #e9c46a; background-image: url('https://www.transparenttextures.com/patterns/sandpaper.png'); z-index: 1;"></div>
            <div id="sea-bg" style="position: absolute; bottom: 0; width: 100%; height: 20%; background: linear-gradient(to bottom, #48cae4, #0077b6); z-index: 2; border-top: 4px solid white; display: flex; align-items: center; justify-content: center;">
                <h3 style="color: white; font-family: 'Outfit', sans-serif; letter-spacing: 10px; opacity: 0.6; font-weight: 900;">OCEANO</h3>
            </div>
            
            <div style="position: relative; z-index: 10; height: 100%; overflow: hidden;">
                <div class="mission-status" style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.7); padding: 12px 25px; border-radius: 50px; color: white; display: flex; align-items: center; gap: 15px; border: 3px solid #f4a261; backdrop-filter: blur(10px);">
                    <span style="font-size: 1.8rem;">🐢</span>
                    <div>
                        <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: #f4a261; letter-spacing: 1px;">Missão Principal</strong>
                        <span style="font-size: 1.2rem; font-weight: 800;">Chegue ao Mar!</span>
                    </div>
                </div>
                
                <div id="turtle-nascimento" style="position: absolute; top: 5%; left: 50%; width: 100px; height: 100px; background-image: url('/turtle_baby.png'); background-size: contain; background-repeat: no-repeat; transform: translateX(-50%) rotate(180deg); z-index: 20; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.4));"></div>
            </div>
            
            <style>
                .seagull-premium {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    background: url('https://img.icons8.com/color/96/seagull.png') no-repeat center;
                    background-size: contain;
                    z-index: 30;
                    filter: drop-shadow(0 8px 10px rgba(0,0,0,0.3));
                }
            </style>
        `;

        this.playerEl = document.getElementById('turtle-nascimento');
        
        this._onDown = (e) => this.teclas[e.key.toLowerCase()] = true;
        this._onUp = (e) => this.teclas[e.key.toLowerCase()] = false;
        
        window.addEventListener('keydown', this._onDown);
        window.addEventListener('keyup', this._onUp);
        
        this.loop();
    }

    atualizar() {
        if (!this.ativo) return;
        this.frames++;

        // Movimentação Fluida
        const vel = 0.8;
        if (this.teclas['arrowleft'] || this.teclas['a']) this.player.x = Math.max(5, this.player.x - vel);
        if (this.teclas['arrowright'] || this.teclas['d']) this.player.x = Math.min(95, this.player.x + vel);
        if (this.teclas['arrowup'] || this.teclas['w']) this.player.y = Math.max(5, this.player.y - vel);
        if (this.teclas['arrowdown'] || this.teclas['s']) this.player.y = Math.min(85, this.player.y + vel);
        
        this.playerEl.style.left = `${this.player.x}%`;
        this.playerEl.style.top = `${this.player.y}%`;

        // Rotação dinâmica baseada na direção
        if (this.teclas['arrowleft'] || this.teclas['a']) this.playerEl.style.transform = 'translateX(-50%) rotate(165deg)';
        else if (this.teclas['arrowright'] || this.teclas['d']) this.playerEl.style.transform = 'translateX(-50%) rotate(195deg)';
        else this.playerEl.style.transform = 'translateX(-50%) rotate(180deg)';

        // Spawn gaivotas
        if (this.frames % 30 === 0) {
            const el = document.createElement('div');
            el.className = 'seagull-premium';
            const fromLeft = Math.random() > 0.5;
            let x = fromLeft ? -10 : 110;
            let y = 10 + Math.random() * 70;
            el.style.left = `${x}%`;
            el.style.top = `${y}%`;
            if (!fromLeft) el.style.transform = 'scaleX(-1)';
            this.container.appendChild(el);
            this.gaivotas.push({ el, x, y, vx: fromLeft ? 1.1 : -1.1 });
        }

        for (let i = this.gaivotas.length - 1; i >= 0; i--) {
            let g = this.gaivotas[i];
            g.x += g.vx;
            g.el.style.left = `${g.x}%`;

            const p = this.playerEl.getBoundingClientRect();
            const e = g.el.getBoundingClientRect();
            if (p.right > e.left + 25 && p.left < e.right - 25 && p.bottom > e.top + 25 && p.top < e.bottom - 25) {
                this.encerrar(false);
                return;
            }

            if (g.x < -20 || g.x > 120) {
                g.el.remove();
                this.gaivotas.splice(i, 1);
            }
        }

        if (this.player.y > 78) {
            this.encerrar(true);
        }
    }

    encerrar(vitoria) {
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this._onDown);
        window.removeEventListener('keyup', this._onUp);
        this.finalizar({
            vitoria,
            xp: vitoria ? 150 : 20,
            mensagem: vitoria ? "Incrível! Você sobreviveu à praia!" : "Uma gaivota te pegou! Tente novamente."
        });
    }
}
