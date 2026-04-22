export class Minigame {
    constructor(container, onComplete) {
        this.container = container;
        this.onComplete = onComplete; // Callback com resultados (XP ganho, dano ambiental, etc)
        this.ativo = false;
        this.loopId = null;
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = ''; // Limpa o container
        this.loop();
    }

    loop() {
        if (!this.ativo) return;
        this.atualizar();
        this.loopId = requestAnimationFrame(() => this.loop());
    }

    atualizar() {
        // Implementado nas subclasses
    }

    finalizar(resultado) {
        this.ativo = false;
        cancelAnimationFrame(this.loopId);
        this.container.innerHTML = '';
        if (this.onComplete) {
            this.onComplete(resultado);
        }
    }
}
