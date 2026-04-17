import { Minigame } from './Minigame.js';

export class JogoDesvio extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.playerX = 50; // percentage
        this.obstaculos = [];
        this.frames = 0;
        this.score = 0;
    }

    iniciar() {
        this.container.innerHTML = `
            <div id="desvio-player" class="desvio-player"></div>
        `;
        this.playerElement = document.getElementById('desvio-player');
        
        // Controles simples
        this.handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') this.playerX = Math.max(0, this.playerX - 10);
            if (e.key === 'ArrowRight') this.playerX = Math.min(90, this.playerX + 10);
            this.playerElement.style.left = `${this.playerX}%`;
        };
        window.addEventListener('keydown', this.handleKeyDown);

        super.iniciar();
    }

    atualizar() {
        this.frames++;
        
        // Criar obstáculos
        if (this.frames % 30 === 0) {
            const obs = document.createElement('div');
            obs.classList.add('desvio-obstacle');
            obs.style.left = `${Math.random() * 90}%`;
            obs.style.top = `-50px`;
            this.container.appendChild(obs);
            this.obstaculos.push({ el: obs, y: -50, x: parseFloat(obs.style.left) });
        }

        // Mover obstáculos e checar colisão
        for (let i = this.obstaculos.length - 1; i >= 0; i--) {
            let obs = this.obstaculos[i];
            obs.y += 5; // velocidade
            obs.el.style.top = `${obs.y}px`;

            // Colisão simples baseada em bounding box
            const pRect = this.playerElement.getBoundingClientRect();
            const oRect = obs.el.getBoundingClientRect();

            if (pRect.left < oRect.right && pRect.right > oRect.left &&
                pRect.top < oRect.bottom && pRect.bottom > oRect.top) {
                // Game Over (colisão)
                this.encerrar(false);
                return;
            }

            // Remove se saiu da tela (marcando ponto)
            if (obs.y > this.container.clientHeight) {
                obs.el.remove();
                this.obstaculos.splice(i, 1);
                this.score += 10;
            }
        }

        // Ganha após 200 pontos
        if (this.score >= 200) {
            this.encerrar(true);
        }
    }

    encerrar(vitoria) {
        window.removeEventListener('keydown', this.handleKeyDown);
        const resultado = {
            xp: vitoria ? 150 : 20, /* 150 garante evoluir para filhote (limiar 100) */
            vitoria: vitoria,
            mensagem: vitoria ? "Você chegou ao mar em segurança!" : "Cuidado com os predadores da praia!"
        };
        this.finalizar(resultado);
    }
}
