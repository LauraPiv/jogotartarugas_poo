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
            this.bgElement.classList.remove('praia', 'oceano-raso', 'oceano-profundo', 'recifes', 'oceano-poluido');
            if (this.saudeOceano < 40) {
                this.bgElement.classList.add('oceano-poluido');
            } else {
                this.bgElement.classList.add(this.estagioFundo);
            }
        }
    }
}
