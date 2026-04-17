import { Minigame } from './Minigame.js';

export class JogoSelecao extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.itens = [];
        this.frames = 0;
        this.score = 0;
        this.vida = 3;
    }

    iniciar() {
        this.container.innerHTML = `
            <div id="selecao-info" style="color: white; padding: 10px; font-weight: bold; position: absolute; top:0; left: 0;">
                Pontos: <span id="sel-score">0</span> | Vidas: <span id="sel-vida">3</span>
            </div>
        `;
        this.scoreLabel = document.getElementById('sel-score');
        this.vidaLabel = document.getElementById('sel-vida');
        
        // CSS in line para protótipo
        const style = document.createElement('style');
        style.innerHTML = `
            .sel-item {
                position: absolute;
                width: 60px;
                height: 60px;
                cursor: pointer;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 30px;
                user-select: none;
                transition: transform 0.1s;
            }
            .sel-item:active { transform: scale(0.9); }
        `;
        this.container.appendChild(style);

        super.iniciar();
    }

    atualizar() {
        this.frames++;
        
        // Criar itens
        if (this.frames % 40 === 0) {
            const isBom = Math.random() > 0.4;
            const el = document.createElement('div');
            el.classList.add('sel-item');
            el.innerHTML = isBom ? '🪼' : '🛍️'; // Água-viva ou Sacola
            el.style.left = `${Math.random() * 80}%`;
            el.style.top = `-60px`;
            
            // Evento de clique
            el.addEventListener('click', () => {
                if (isBom) {
                    this.score += 10;
                    this.scoreLabel.textContent = this.score;
                    el.remove();
                } else {
                    this.vida--;
                    this.vidaLabel.textContent = this.vida;
                    el.style.background = 'red';
                    setTimeout(() => el.remove(), 200);
                    if (this.vida <= 0) this.encerrar(false);
                }
            });

            this.container.appendChild(el);
            this.itens.push({ el, y: -60, isBom, ativo: true });
        }

        // Mover itens
        for (let i = this.itens.length - 1; i >= 0; i--) {
            let item = this.itens[i];
            if (!item.ativo) continue;

            item.y += 3; // velocidade da agua-viva
            item.el.style.top = `${item.y}px`;

            // Se saiu da tela sem clicar
            if (item.y > this.container.clientHeight) {
                if (item.isBom) {
                    // Perdeu ponto se deixou de comer algo bom
                    this.vida--;
                    this.vidaLabel.textContent = this.vida;
                    if (this.vida <= 0) this.encerrar(false);
                }
                item.el.remove();
                this.itens.splice(i, 1);
            }
        }

        if (this.score >= 100) {
            this.encerrar(true);
        }
    }

    encerrar(vitoria) {
        const resultado = {
            xp: vitoria ? 250 : 30, // 250 ajuda a ir para adulto
            vitoria: vitoria,
            danoAmbiental: !vitoria ? 10 : 0, // Se perder por comer plástico, dano ambiental
            mensagem: vitoria ? "Você se alimentou super bem!" : "Cuidado! Sacolas plásticas fazem muito mal às tartarugas!"
        };
        this.finalizar(resultado);
    }
}
