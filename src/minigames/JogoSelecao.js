import { Minigame } from './Minigame.js';

export class JogoSelecao extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.energia = 0;
        this.saude = 100;
        this.itens = [];
        this.frames = 0;
        this.teclas = {};
        this.playerXPos = 50; // Em porcentagem para fluidez
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <div id="ocean-bg-fase2" style="position: absolute; top:0; left:0; width: 100%; height: 100%; background: linear-gradient(to bottom, #48cae4 0%, #0077b6 100%); z-index: 1; overflow: hidden;">
                <!-- Raios de Sol -->
                <div style="position: absolute; width: 100%; height: 100%; background: repeating-linear-gradient(110deg, rgba(255,255,255,0.1) 0px, transparent 150px, rgba(255,255,255,0.05) 300px); animation: raysMove 15s linear infinite; filter: blur(30px);"></div>
                
                <!-- Algas do Fundo -->
                <div style="position: absolute; bottom: -20px; left: 15%; width: 60px; height: 180px; background: #1b4332; opacity: 0.3; clip-path: polygon(50% 0%, 100% 100%, 0% 100%); filter: blur(5px); animation: sway 6s ease-in-out infinite;"></div>
                <div style="position: absolute; bottom: -20px; right: 10%; width: 80px; height: 220px; background: #1b4332; opacity: 0.2; clip-path: polygon(50% 0%, 100% 100%, 0% 100%); filter: blur(10px); animation: sway 8s ease-in-out infinite alternate;"></div>
            </div>
            
            <div style="position: relative; z-index: 10; height: 100%; overflow: hidden;">
                <div style="position: absolute; top: 20px; left: 20px; display: flex; gap: 20px;">
                    <div style="background: rgba(0,0,0,0.7); padding: 10px 25px; border-radius: 50px; color: white; border: 2px solid #90be6d; backdrop-filter: blur(10px); box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                        <span style="font-size: 1.1rem; font-weight: 800; letter-spacing: 1px;">🔋 ENERGIA: <span id="sel-energy" style="color: #b5e48c;">${this.energia}</span>/10</span>
                    </div>
                </div>

                <div id="sel-player" style="position: absolute; bottom: 80px; left: 50%; width: 120px; height: 120px; background-image: url('/turtle_baby.png'); background-size: contain; background-repeat: no-repeat; transform: translateX(-50%); z-index: 20; filter: drop-shadow(0 15px 10px rgba(0,0,0,0.4));"></div>
            </div>

            <style>
                @keyframes raysMove { from { transform: translateX(-30%); } to { transform: translateX(30%); } }
                @keyframes sway { 0%, 100% { transform: skewX(-8deg); } 50% { transform: skewX(8deg); } }
                .food-item, .trash-item {
                    position: absolute;
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 25;
                    pointer-events: none;
                }
                .food-emoji { font-size: 4rem; filter: drop-shadow(0 8px 10px rgba(0,0,0,0.4)); }
                .trash-img { width: 65px; height: 65px; filter: drop-shadow(0 8px 10px rgba(0,0,0,0.5)); }
            </style>
        `;

        this.playerEl = document.getElementById('sel-player');
        this.energyEl = document.getElementById('sel-energy');
        this.healthEl = document.getElementById('sel-health');

        this._onDown = (e) => this.teclas[e.key.toLowerCase()] = true;
        this._onUp = (e) => this.teclas[e.key.toLowerCase()] = false;
        
        window.addEventListener('keydown', this._onDown);
        window.addEventListener('keyup', this._onUp);
        
        this.animate(); 
    }

    animate() {
        if (!this.ativo) return;
        this.atualizar();
        requestAnimationFrame(() => this.animate());
    }

    atualizar() {
        this.frames++;

        // Movimentação Fluida Horizontal
        const vel = 1.2;
        if (this.teclas['arrowleft'] || this.teclas['a']) this.playerXPos = Math.max(10, this.playerXPos - vel);
        if (this.teclas['arrowright'] || this.teclas['d']) this.playerXPos = Math.min(90, this.playerXPos + vel);
        this.playerEl.style.left = `${this.playerXPos}%`;

        // Spawn de itens a cada 25 frames
        if (this.frames % 25 === 0) {
            this.createItem();
        }

        // Atualizar posição dos itens e colisões
        for (let i = this.itens.length - 1; i >= 0; i--) {
            let item = this.itens[i];
            item.y += item.speed;
            item.el.style.top = `${item.y}px`;

            const p = this.playerEl.getBoundingClientRect();
            const e = item.el.getBoundingClientRect();

            if (p.right > e.left + 25 && p.left < e.right - 25 && p.bottom > e.top + 25 && p.top < e.bottom - 25) {
                if (item.type === 'food') {
                    this.energia++;
                    this.energyEl.textContent = this.energia;
                    if (this.energia >= 10) this.encerrar(true);
                } else {
                    this.saude -= 20;
                    this.healthEl.textContent = this.saude;
                    if (this.saude <= 0) this.encerrar(false);
                }
                item.el.remove();
                this.itens.splice(i, 1);
                continue;
            }

            if (item.y > this.container.clientHeight) {
                item.el.remove();
                this.itens.splice(i, 1);
            }
        }
    }

    createItem() {
        const isFood = Math.random() > 0.4;
        const el = document.createElement('div');
        el.className = isFood ? 'food-item' : 'trash-item';
        
        if (isFood) {
            el.innerHTML = `<span class="food-emoji">${Math.random() > 0.5 ? '🦐' : '🌿'}</span>`;
        } else {
            el.innerHTML = `<img src="https://img.icons8.com/color/96/plastic-bag.png" class="trash-img">`;
        }

        el.style.left = `${Math.random() * 80 + 10}%`;
        el.style.top = '-80px';
        this.container.appendChild(el);

        this.itens.push({ el, y: -80, type: isFood ? 'food' : 'trash', speed: 4 + Math.random() * 4 });
    }

    encerrar(vitoria) {
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this._onDown);
        window.removeEventListener('keyup', this._onUp);
        this.finalizar({
            vitoria,
            xp: vitoria ? 60 : 15,
            mensagem: vitoria ? "Sua tartaruga se alimentou muito bem!" : "Tente comer mais águas-vivas e evitar o plástico solto no mar, sua tartaruga passou mal!",
        });
    }
}
