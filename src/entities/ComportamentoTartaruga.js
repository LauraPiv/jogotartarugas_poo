export class ComportamentoTartaruga {
    constructor(uiSprite, uiBubble) {
        this.spriteElement = uiSprite;
        this.bubbleElement = uiBubble;
        this.estado = 'ativo'; // ativo, inativo, dormindo
        
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.turtleX = 0;
        this.turtleY = 0;
        
        this.inactivityTimer = null;
        this.awakeTimeoutDuration = 5000; // 5 segundos sem mover o mouse = dorme

        this.bindEvents();
        this.loop();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.acordar();
        });
    }

    acordar() {
        if (this.estado === 'dormindo') {
            this.spriteElement.style.filter = 'brightness(1)';
            this.estado = 'ativo';
            this.falar("Oi!");
        }
        
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = setTimeout(() => this.dormir(), this.awakeTimeoutDuration);
    }

    dormir() {
        this.estado = 'dormindo';
        this.falar("Zzz...");
        this.spriteElement.style.filter = 'brightness(0.7)';
    }

    loop() {
        if (this.estado !== 'dormindo') {
            // Mover a tartaruga um pouco em direção ao mouse
            const rect = this.spriteElement.parentElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const dx = (this.mouseX - centerX) * 0.05; 
            const dy = (this.mouseY - centerY) * 0.05;
            
            // Suaviza a posição
            this.turtleX += (dx - this.turtleX) * 0.1;
            this.turtleY += (dy - this.turtleY) * 0.1;
            
            this.spriteElement.style.transform = `translate(${this.turtleX}px, ${this.turtleY}px)`;
        } else {
            // Animação de respiração dormindo
            this.spriteElement.style.transform = `scale(${1 + Math.sin(Date.now() / 500) * 0.02})`;
        }
        
        requestAnimationFrame(() => this.loop());
    }

    pular() {
        this.acordar();
        this.spriteElement.style.transform = `translate(${this.turtleX}px, ${this.turtleY - 30}px) scale(1.1)`;
        setTimeout(() => {
            this.spriteElement.style.transform = `translate(${this.turtleX}px, ${this.turtleY}px) scale(1)`;
        }, 200);
    }

    reagirClique(sistemaEducacao) {
        this.pular();

        const curiosidade = sistemaEducacao.getCuriosidade();
        this.falar(curiosidade);
    }

    falar(texto) {
        this.bubbleElement.textContent = texto;
        this.bubbleElement.classList.remove('hidden');
        
        clearTimeout(this.bubbleTimeout);
        this.bubbleTimeout = setTimeout(() => {
            if (this.estado !== 'dormindo') { // Só esconde se não tiver dormindo (pois "Zzz..." fica fixo)
                this.bubbleElement.classList.add('hidden');
            }
        }, 4000);
    }

    atualizarVisualidadeIdade(novaIdade) {
        this.spriteElement.classList.remove('ovinho', 'filhote', 'adolescente', 'adulta', 'idosa');
        this.spriteElement.classList.add(novaIdade);
    }
}
