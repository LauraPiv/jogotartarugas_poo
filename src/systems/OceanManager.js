export class OceanManager {
    constructor() {
        this.health = 80;
        this.pollutionRate = 0.05;
        this.stage = 'praia'; // Estágio atual (praia, oceano-raso, etc)
        
        this.ui = {
            label: document.querySelector('.ocean-health span'),
            bar: document.querySelector('.ocean-health .bar-fill'),
            gameEnv: document.getElementById('game-environment'),
            video: document.getElementById('main-bg-video')
        };

        this.videoMap = {
            'praia': '/telainicial.mp4',
            'oceano-raso': '/oceanoraso.mp4',
            'oceano-profundo': '/oceanofundo.mp4',
            'recifes': '/oceanocorais.mp4'
        };
    }

    iniciar() {
        const saved = localStorage.getItem('ocean_health');
        if (saved) this.health = parseFloat(saved);
        this.atualizarUI();
        this.loop();
    }

    setEstagio(fundoStr) {
        this.stage = fundoStr;
        this.atualizarUI();
    }

    limpar(valor) {
        this.health = Math.min(100, this.health + valor);
        this.salvar();
    }

    poluir(valor) {
        this.health = Math.max(0, this.health - valor);
        this.salvar();
    }

    salvar() {
        localStorage.setItem('ocean_health', this.health.toFixed(2));
    }

    atualizarUI() {
        if (this.ui.label) this.ui.label.textContent = `${Math.floor(this.health)}%`;
        if (this.ui.bar) this.ui.bar.style.width = `${this.health}%`;
        
        if (this.ui.gameEnv) {
            // Remove classes antigas
            this.ui.gameEnv.className = '';
            
            if (this.health < 40) {
                // ESTADO POLUÍDO
                this.ui.gameEnv.style.filter = `grayscale(0.8) brightness(0.6) sepia(0.3)`;
                if (this.ui.video) this.ui.video.style.opacity = '0';
                this.ui.gameEnv.classList.add('oceano-poluido');
            } else {
                // ESTADO SAUDÁVEL
                this.ui.gameEnv.style.filter = `none`;
                this.ui.gameEnv.classList.add(this.stage);
                
                if (this.ui.video) {
                    this.ui.video.style.opacity = '1';
                    const novoSrc = this.videoMap[this.stage];
                    if (novoSrc && !this.ui.video.src.includes(novoSrc)) {
                        this.ui.video.src = novoSrc;
                        this.ui.video.load();
                        this.ui.video.play().catch(e => console.log("Erro video:", e));
                    }
                }
            }
        }
    }

    loop() {
        if (this.health > 0) {
            this.health -= this.pollutionRate / 60;
            this.atualizarUI();
        }
        requestAnimationFrame(() => this.loop());
    }
}
