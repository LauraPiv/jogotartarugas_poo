import { Minigame } from './Minigame.js';

export class JogoNascimento extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
<<<<<<< HEAD
        this.tartarugas = [];
        this.gaivotas = [];
        this.frames = 0;
        this.salvas = 0;
        this.meta = 5; // Salvar 5 tartarugas para vencer
    }

    iniciar() {
        this.container.innerHTML = `
            <div id="nascimento-info" style="color: white; padding: 10px; font-weight: bold; position: absolute; top:0; left: 0; z-index: 10; text-shadow: 1px 1px 2px black;">
                Tartaruguinhas Salvas: <span id="nasc-score">0</span> / ${this.meta}
            </div>
            <!-- Fundo de areia -->
            <div style="position: absolute; width: 100%; height: 100%; background: #F4A460;"></div>
            <!-- Fundo do mar na parte inferior -->
            <div style="position: absolute; width: 100%; height: 20%; bottom: 0; background: rgba(0, 119, 182, 0.8);"></div>
        `;
        this.scoreLabel = document.getElementById('nasc-score');
        
        const style = document.createElement('style');
        style.innerHTML = `
            .t-hatchling {
                position: absolute;
                width: 40px;
                height: 40px;
                font-size: 30px;
                display: flex; justify-content: center; align-items: center;
                transition: transform 0.1s;
                user-select: none;
            }
            .s-seagull {
                position: absolute;
                width: 60px;
                height: 60px;
                font-size: 40px;
                cursor: crosshair;
                display: flex; justify-content: center; align-items: center;
                user-select: none;
                transition: transform 0.1s;
                z-index: 5;
            }
            .s-seagull:active { transform: scale(0.8); }
        `;
        this.container.appendChild(style);

        super.iniciar();
    }

    atualizar() {
        this.frames++;
        
        // Spawn tartarugas saindo do ninho (topo)
        if (this.frames % 80 === 0 && this.tartarugas.length < 5) {
            const el = document.createElement('div');
            el.classList.add('t-hatchling');
            el.innerHTML = '🐢';
            el.style.left = (20 + Math.random() * 60) + '%';
            el.style.top = '10%';
            this.container.appendChild(el);
            this.tartarugas.push({ el, y: 10, ativo: true });
        }

        // Spawn gaivotas atacando tartarugas
        if (this.frames % 60 === 0 && this.tartarugas.length > 0) {
            // Escolhe um alvo aleatório
            const alvo = this.tartarugas[Math.floor(Math.random() * this.tartarugas.length)];
            if (alvo.ativo) {
                const el = document.createElement('div');
                el.classList.add('s-seagull');
                el.innerHTML = '🦅';
                // Nasce perto do alvo
                const targetLeft = parseFloat(alvo.el.style.left);
                el.style.left = (targetLeft + (Math.random() * 10 - 5)) + '%';
                el.style.top = (alvo.y - 15) + '%'; // Pega de cima
                
                // Evento de "Tocar espanta a gaivota"
                el.addEventListener('mousedown', () => {
                    el.style.transform = 'scale(0) rotate(180deg)';
                    setTimeout(() => el.remove(), 200);
                    const idx = this.gaivotas.findIndex(g => g.el === el);
                    if (idx > -1) {
                         this.gaivotas[idx].ativo = false;
                         this.gaivotas.splice(idx, 1);
                    }
                });

                this.container.appendChild(el);
                this.gaivotas.push({ el, alvo, y: alvo.y - 15, x: parseFloat(el.style.left), ativo: true });
            }
        }

        // Mover tartarugas para o mar
        for (let i = this.tartarugas.length - 1; i >= 0; i--) {
            let t = this.tartarugas[i];
            if (!t.ativo) continue;

            t.y += 0.3; // Velocidade bem lenta
            t.el.style.top = (t.y) + '%';

            // Chegou no mar (80% da tela)
            if (t.y >= 80) {
                this.salvas++;
                this.scoreLabel.textContent = this.salvas;
                t.ativo = false;
                t.el.remove();
                this.tartarugas.splice(i, 1);

                if (this.salvas >= this.meta) {
                    this.encerrar(true);
                    return;
                }
            }
        }

        // Mover gaivotas até o alvo
        for (let i = this.gaivotas.length - 1; i >= 0; i--) {
            let g = this.gaivotas[i];
            if (!g.ativo) continue;
            
            // Move gaivota para a tartaruga alvo
            g.y += 0.8; // gaivota é mais veloz
            g.el.style.top = g.y + '%';

            // Checa Colisão com a tartaruga
            if (g.alvo && g.alvo.ativo) {
                if (Math.abs(g.y - g.alvo.y) < 5) { // Quase mesma altura
                     // Comeu a tartaruga :(
                     g.alvo.el.style.opacity = '0';
                     setTimeout(() => g.alvo.el.remove(), 200);
                     g.alvo.ativo = false; // tartaruga morta
                     
                     // Gaivota vai embora
                     g.ativo = false;
                     g.el.style.transform = 'translateY(-100px)';
                     setTimeout(() => g.el.remove(), 500);
                     this.gaivotas.splice(i, 1);

                     // Remove tartaruga das listas
                     const tIdx = this.tartarugas.indexOf(g.alvo);
                     if (tIdx > -1) this.tartarugas.splice(tIdx, 1);
                }
            } else {
                // Alvo não existe mais, vai emborq
                g.y -= 1; 
                g.el.style.top = g.y + '%';
                if (g.y < -10) {
                    g.ativo = false;
                    g.el.remove();
                    this.gaivotas.splice(i, 1);
                }
            }
=======
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
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        }
    }

    encerrar(vitoria) {
<<<<<<< HEAD
        const resultado = {
            xp: vitoria ? 150 : 20, 
            vitoria: vitoria,
            mensagem: vitoria ? "Uhuul! Você protegeu os filhotes até o mar!" : "As gaivotas foram mais rápidas dessa vez..."
        };
        this.finalizar(resultado);
=======
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this._onDown);
        window.removeEventListener('keyup', this._onUp);
        this.finalizar({
            vitoria,
            xp: vitoria ? 150 : 20,
            mensagem: vitoria ? "Incrível! Você sobreviveu à praia!" : "Uma gaivota te pegou! Tente novamente."
        });
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
    }
}
