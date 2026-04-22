import { Minigame } from './Minigame.js';

export class JogoNascimento extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
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
        }
    }

    encerrar(vitoria) {
        const resultado = {
            xp: vitoria ? 150 : 20, 
            vitoria: vitoria,
            mensagem: vitoria ? "Uhuul! Você protegeu os filhotes até o mar!" : "As gaivotas foram mais rápidas dessa vez..."
        };
        this.finalizar(resultado);
    }
}
