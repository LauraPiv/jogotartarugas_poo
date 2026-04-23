import { Minigame } from './Minigame.js';

export class JogoBarco extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.player = { x: 50, y: 88 };
        this.alert = 0;
        this.boats = [];
        this.rocks = [];
        this.frames = 0;
        this.teclas = {};
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background: #000b1a; overflow: hidden; z-index: 1;">
                <!-- Mar Noturno Profundo -->
                <div style="position: absolute; width: 100%; height: 100%; background: radial-gradient(circle at 50% 100%, #001d3d 0%, #000b1a 100%); opacity: 0.9;"></div>
                <!-- Efeito Neblina -->
                <div style="position: absolute; width: 200%; height: 200%; background: url('https://www.transparenttextures.com/patterns/fog.png'); opacity: 0.1; animation: fogMove 30s linear infinite;"></div>
            </div>
            
            <div style="position: relative; z-index: 10; height: 100%;">
                <div class="stealth-ui" style="position: absolute; top: 25px; left: 50%; transform: translateX(-50%); width: 350px; z-index: 100;">
                    <div style="background: rgba(0,0,0,0.85); padding: 10px 20px; border-radius: 15px; border: 2px solid #ffd60a; backdrop-filter: blur(10px);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #ffd60a; font-weight: 900; font-size: 0.9rem; letter-spacing: 2px;">⚠️ ALERTA DE DETECÇÃO</span>
                            <span id="alert-val" style="color: white; font-weight: 900;">0%</span>
                        </div>
                        <div style="width: 100%; height: 12px; background: #222; border-radius: 6px; overflow: hidden; border: 1px solid #444;">
                            <div id="alert-bar" style="width: 0%; height: 100%; background: linear-gradient(to right, #ffd60a, #ff9f1c); transition: width 0.1s linear;"></div>
                        </div>
                    </div>
                </div>

                <div id="finish-area" style="position: absolute; top: 0; width: 100%; height: 60px; background: rgba(0,255,100,0.05); border-bottom: 5px solid #00ff88; box-shadow: 0 10px 30px rgba(0,255,136,0.2); display: flex; align-items: center; justify-content: center; color: #00ff88; font-weight: 900; letter-spacing: 8px; font-size: 1.2rem; text-shadow: 0 0 10px #00ff88;">META: ÁGUAS PROTEGIDAS</div>

                <div id="stealth-player" style="position: absolute; left: 50%; top: 88%; width: 110px; height: 110px; background-image: url('/turtle_adult.png'); background-size: contain; background-repeat: no-repeat; transform: translate(-50%, -50%); z-index: 60; filter: drop-shadow(0 0 20px rgba(0,255,200,0.1)); transition: left 0.1s linear, top 0.1s linear;"></div>
            </div>

            <style>
                @keyframes fogMove { from { transform: translate(0,0); } to { transform: translate(-50%, -50%); } }
                .searchlight-v2 {
                    position: absolute;
                    width: 200px;
                    height: 350px;
                    background: conic-gradient(from 180deg at top center, rgba(255,214,10,0.4) 0deg, rgba(255,214,10,0) 40deg, rgba(255,214,10,0) 320deg, rgba(255,214,10,0.4) 360deg);
                    z-index: 20;
                    pointer-events: none;
                    transform-origin: top center;
                    filter: blur(15px);
                }
                .boat-v2 {
                    position: absolute;
                    width: 100px;
                    height: 50px;
                    background: #111;
                    border-radius: 10px 10px 30px 30px;
                    z-index: 30;
                    border: 1px solid #333;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.8);
                }
                .underwater-rock {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    background: url('https://www.transparenttextures.com/patterns/dark-matter.png'), #1a1a1a;
                    border-radius: 40% 60% 50% 50%;
                    z-index: 15;
                    filter: brightness(0.6) drop-shadow(0 0 10px rgba(0,0,0,0.5));
                }
            </style>
        `;

        this.playerEl = document.getElementById('stealth-player');
        this.alertBar = document.getElementById('alert-bar');
        this.alertVal = document.getElementById('alert-val');
        
        this._handleDown = (e) => this.teclas[e.key.toLowerCase()] = true;
        this._handleUp = (e) => this.teclas[e.key.toLowerCase()] = false;
        window.addEventListener('keydown', this._handleDown);
        window.addEventListener('keyup', this._handleUp);

        // Spawn de Obstáculos Estáticos
        for(let i=0; i<6; i++) {
            const rock = document.createElement('div');
            rock.className = 'underwater-rock';
            const rx = 10 + Math.random() * 80;
            const ry = 150 + Math.random() * 500;
            rock.style.left = `${rx}%`;
            rock.style.top = `${ry}px`;
            this.container.appendChild(rock);
            this.rocks.push({ el: rock, x: rx, y: ry });
        }

        // Spawn de Barcos Móveis
        this.spawnBoat(180, 2.5);
        this.spawnBoat(400, -3.2);
        this.spawnBoat(620, 1.8);

        this.loop();
    }

    spawnBoat(y, vx) {
        const boatEl = document.createElement('div');
        boatEl.className = 'boat-v2';
        boatEl.style.top = `${y}px`;
        
        const lightEl = document.createElement('div');
        lightEl.className = 'searchlight-v2';
        lightEl.style.top = '30px';
        lightEl.style.left = '-50px';
        boatEl.appendChild(lightEl);
        
        this.container.appendChild(boatEl);
        this.boats.push({ 
            el: boatEl, 
            light: lightEl, 
            x: Math.random()*70 + 15, 
            y, 
            vx, 
            angle: 0, 
            rotSpeed: 0.02 + Math.random()*0.02 
        });
    }

    atualizar() {
        if (!this.ativo) return;
        this.frames++;

        // Movimentação Fluida + Correnteza leve para a esquerda
        const vel = 0.6;
        const currentForce = -0.05; // Empurra pro lado
        
        if (this.teclas['arrowleft'] || this.teclas['a']) this.player.x -= vel;
        if (this.teclas['arrowright'] || this.teclas['d']) this.player.x += vel;
        if (this.teclas['arrowup'] || this.teclas['w']) this.player.y -= vel;
        if (this.teclas['arrowdown'] || this.teclas['s']) this.player.y += vel;
        
        this.player.x += currentForce; // Aplica correnteza
        this.player.x = Math.max(5, Math.min(95, this.player.x));
        this.player.y = Math.max(5, Math.min(95, this.player.y));
        
        this.playerEl.style.left = `${this.player.x}%`;
        this.playerEl.style.top = `${this.player.y}%`;

        let detectionLevel = 0;

        // Atualizar Barcos e Faróis
        this.boats.forEach(b => {
            b.x += b.vx;
            if (b.x > 88 || b.x < 5) b.vx *= -1;
            b.el.style.left = `${b.x}%`;

            // Girar o farol
            b.angle = Math.sin(this.frames * b.rotSpeed) * 35;
            b.light.style.transform = `rotate(${b.angle}deg)`;

            // Detecção por Luz (Aproximada por área)
            const p = this.playerEl.getBoundingClientRect();
            const l = b.light.getBoundingClientRect();
            if (p.right > l.left && p.left < l.right && p.bottom > l.top && p.top < l.bottom) {
                detectionLevel += 1.2;
            }
            
            // Detecção por Proximidade (Motor)
            const dx = (p.left + p.width/2) - (l.left + l.width/2);
            const dy = (p.top + p.height/2) - (l.top);
            if (Math.sqrt(dx*dx + dy*dy) < 120) {
                detectionLevel += 0.4;
            }
        });

        // Colisão com Pedras
        this.rocks.forEach(r => {
            const p = this.playerEl.getBoundingClientRect();
            const rockRect = r.el.getBoundingClientRect();
            if (p.right > rockRect.left + 20 && p.left < rockRect.right - 20 && p.bottom > rockRect.top + 20 && p.top < rockRect.bottom - 20) {
                detectionLevel += 2; // Fazer barulho ao bater na pedra!
                this.player.y += 0.5; // Empurra um pouco
            }
        });

        if (detectionLevel > 0) {
            this.alert = Math.min(100, this.alert + detectionLevel);
            this.playerEl.style.filter = `drop-shadow(0 0 25px rgba(255, 214, 10, ${this.alert/100})) brightness(${1 + this.alert/100})`;
        } else {
            this.alert = Math.max(0, this.alert - 0.3);
            this.playerEl.style.filter = 'drop-shadow(0 0 20px rgba(0,255,200,0.1))';
        }

        this.alertBar.style.width = `${this.alert}%`;
        this.alertVal.textContent = `${Math.floor(this.alert)}%`;

        if (this.alert >= 100) this.encerrar(false);
        if (this.player.y < 8) this.encerrar(true);
    }

    encerrar(vitoria) {
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this._handleDown);
        window.removeEventListener('keyup', this._handleUp);
        this.finalizar({
            vitoria,
            xp: vitoria ? 400 : 80,
            mensagem: vitoria ? "Incrível! Você atravessou a patrulha ilegal com maestria!" : "Você foi detectado pelos holofotes! Mergulhe mais fundo da próxima vez."
        });
    }
}
