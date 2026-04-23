import { Minigame } from './Minigame.js';

export class JogoNascimento extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.player = { x: 50, y: 5 };
        this.targetPos = { x: 50, y: 5 }; // for mouse tracking
        this.gaivotas = [];
        this.frames = 0;
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background: linear-gradient(180deg, #d4a373 0%, #faedcd 100%); z-index: 1;">
                <div style="position: absolute; width: 100%; height: 100%; background-image: url('https://www.transparenttextures.com/patterns/sandpaper.png'); opacity: 0.6;"></div>
            </div>
            
            <div id="sea-bg" style="position: absolute; bottom: 0; width: 100%; height: 25%; background: linear-gradient(to bottom, #90e0ef, #0077b6); z-index: 2; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 15px 25px rgba(255,255,255,0.4);">
                <div class="wave" style="position: absolute; top: -5px; width: 200%; height: 20px; background: #fff; border-radius: 50%; filter: blur(5px); opacity: 0.7; animation: waveAnim 3s infinite alternate ease-in-out;"></div>
                <h3 style="color: white; font-family: 'Outfit', sans-serif; letter-spacing: 15px; opacity: 0.9; font-weight: 900; z-index: 5; text-shadow: 0 4px 15px rgba(0,0,0,0.5);">OCEANO</h3>
            </div>
            
            <div style="position: relative; z-index: 10; height: 100%; overflow: hidden; pointer-events: none;">
                <div class="mission-status" style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.6); padding: 12px 25px; border-radius: 50px; color: white; display: flex; align-items: center; gap: 15px; border: 3px solid #f4a261; backdrop-filter: blur(10px);">
                    <span style="font-size: 1.8rem; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));">🐢</span>
                    <div>
                        <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; color: #ffdd72; letter-spacing: 1.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Missão Principal</strong>
                        <span style="font-size: 1.2rem; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Chegue ao Mar!</span>
                    </div>
                </div>
                
                <div id="turtle-nascimento" style="position: absolute; top: 5%; left: 50%; width: 100px; height: 100px; background-image: url('/turtle_baby.png'); background-size: contain; background-repeat: no-repeat; transform: translateX(-50%) rotate(180deg); z-index: 20; filter: drop-shadow(0 15px 20px rgba(0,0,0,0.5)); transition: transform 0.1s ease-out;"></div>
            </div>
            
            <style>
                @keyframes waveAnim {
                    to { transform: translateX(-5%); height: 30px; opacity: 0.3; }
                }
                .seagull-premium {
                    position: absolute;
                    width: 70px;
                    height: 70px;
                    background: url('https://img.icons8.com/color/96/seagull.png') no-repeat center;
                    background-size: contain;
                    z-index: 30;
                    filter: drop-shadow(0 15px 15px rgba(0,0,0,0.4));
                    animation: seagullFly 0.5s infinite alternate ease-in-out;
                }
                .seagull-premium.flip {
                    animation: seagullFlyFlip 0.5s infinite alternate ease-in-out;
                }
                @keyframes seagullFly {
                    from { transform: translateY(0px); }
                    to { transform: translateY(-10px); }
                }
                @keyframes seagullFlyFlip {
                    from { transform: scaleX(-1) translateY(0px); }
                    to { transform: scaleX(-1) translateY(-10px); }
                }
            </style>
        `;

        this.playerEl = document.getElementById('turtle-nascimento');
        
        this._onMouseMove = (e) => {
            const rect = this.container.getBoundingClientRect();
            // Calcula a posição do mouse em % da tela
            let targetX = ((e.clientX - rect.left) / rect.width) * 100;
            let targetY = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Centraliza o cursor no meio da tartaruga
            this.targetPos.x = Math.max(5, Math.min(95, targetX));
            this.targetPos.y = Math.max(5, Math.min(85, targetY));
        };
        
        this.container.addEventListener('mousemove', this._onMouseMove);
        
        this.loop();
    }

    atualizar() {
        if (!this.ativo) return;
        this.frames++;

        // Animação de nado em direção ao mouse com suavização (lerp)
        const lerpSpeed = 0.08;
        let dx = this.targetPos.x - this.player.x;
        let dy = this.targetPos.y - this.player.y;
        
        this.player.x += dx * lerpSpeed;
        this.player.y += dy * lerpSpeed;
        
        this.playerEl.style.left = `${this.player.x}%`;
        this.playerEl.style.top = `${this.player.y}%`;

        // Rotação dinâmica fluida: aponta suavemente para o eixo x onde o mouse está
        // Reduzindo o ângulo base para criar uma leve virada
        let angle = 180 - (dx * 1.5); 
        
        // Crie um movimento de pezinho (wobble) enquanto se move
        let speed = Math.sqrt(dx*dx + dy*dy);
        let wobble = (speed > 1) ? Math.sin(this.frames * 0.3) * 10 : 0;
        
        this.playerEl.style.transform = `translateX(-50%) rotate(${angle + wobble}deg)`;

        // Spawn gaivotas
        if (this.frames % 30 === 0) {
            const el = document.createElement('div');
            el.className = 'seagull-premium';
            const fromLeft = Math.random() > 0.5;
            let x = fromLeft ? -10 : 110;
            let y = 10 + Math.random() * 70;
            el.style.left = `${x}%`;
            el.style.top = `${y}%`;
            if (!fromLeft) el.classList.add('flip');
            this.container.appendChild(el);
            this.gaivotas.push({ el, x, y, vx: fromLeft ? 0.5 : -0.5 });
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
        window.removeEventListener('mousemove', this._onMouseMove);
        this.finalizar({
            vitoria,
            xp: vitoria ? 40 : 10,
            mensagem: vitoria ? "Você chegou ao mar em segurança!" : "Cuidado com as gaivotas! Tente novamente."
        });
    }
}
