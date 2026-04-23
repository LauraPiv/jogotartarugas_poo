export class SistemaImpactoAmbiental {
    constructor(elementUI) {
        this.saudeOceano = 100;
        this.elementUI = elementUI; // O elemento do DOM
        this.bgElement = document.getElementById('game-environment');
        this.estagioFundo = 'praia';
    }

    modificarSaude(valor) {
        this.saudeOceano += valor;
        if (this.saudeOceano > 100) this.saudeOceano = 100;
        if (this.saudeOceano < 0) this.saudeOceano = 0;
        
        this.atualizarUI();
    }
    
    modificarFundo(fundoStr) {
        this.estagioFundo = fundoStr;
        this.atualizarUI();
    }

    atualizarUI() {
        if (this.elementUI) {
            this.elementUI.querySelector('span').textContent = `${this.saudeOceano}%`;
        }

        if (this.bgElement) {
            // Gerenciamento de classes para fundos estáticos ou efeitos
            this.bgElement.classList.remove('praia', 'oceano-raso', 'oceano-profundo', 'recifes', 'oceano-poluido');
            
            const videoElement = document.getElementById('main-bg-video');
            const videoMap = {
                'praia': '/telainicial.mp4',
                'oceano-raso': '/oceanoraso.mp4',
                'oceano-profundo': '/oceanofundo.mp4',
                'recifes': '/oceanocorais.mp4'
            };

            if (this.saudeOceano < 40) {
                this.bgElement.classList.add('oceano-poluido');
                if (videoElement) videoElement.style.opacity = '0'; // Esconde vídeo se estiver poluído
            } else {
                this.bgElement.classList.add(this.estagioFundo);
                
                // Troca dinâmica do vídeo
                if (videoElement && videoMap[this.estagioFundo]) {
                    videoElement.style.opacity = '1';
                    const novoSrc = videoMap[this.estagioFundo];
                    
                    // Só recarrega se o vídeo for diferente do atual
                    if (!videoElement.src.includes(novoSrc)) {
                        videoElement.src = novoSrc;
                        videoElement.load();
                        videoElement.play().catch(e => console.log("Erro auto-play vídeo fundo:", e));
                    }
                }
            }
        }
    }
}
