export class Tartaruga {
    constructor(nome, especie) {
        this.nome = nome;
        this.especie = especie;
        this.idade = 'filhote'; // filhote, adolescente, adulta, idosa
        this.saude = 100;
        this.energia = 100;
        this.fome = 50; // 0 é saciada, 100 é fome máxima
        this.felicidade = 50;
        this.experiencia = 0;
        this.isDormindo = false;
    }

    ganharExperiencia(pontos) {
        this.experiencia += pontos;
        return this.experiencia;
    }

    cicloDeVida() {
        if (this.isDormindo) {
            // Dormindo: recupera energia rapidamente
            this.energia = Math.min(100, this.energia + 10);
            if (this.energia >= 100) this.isDormindo = false; // Acorda naturalmente
        } else {
            // Acordado: degradação natural com o tempo
            this.energia = Math.max(0, this.energia - 1);
            this.fome = Math.min(100, this.fome + 2);
            this.felicidade = Math.max(0, this.felicidade - 1);
        }

        // Consequência: Dano na Saúde se estiver esgotada ou com fome
        if (this.fome >= 100 || this.energia <= 0) {
            this.saude = Math.max(0, this.saude - 2);
        } else {
            // Recupera vida aos poucos se estiver bem
            if (this.fome < 50 && this.energia > 50) {
                this.saude = Math.min(100, this.saude + 1);
            }
        }
        
        return this.saude <= 0; // retorna true se morreu/game over
    }

    alimentar() {
        this.fome = Math.max(0, this.fome - 30);
        this.energia = Math.min(100, this.energia + 5);
        // Felicidade removida daqui
        return "Nham nham! Estava uma delícia!";
    }

    fazerCarinho() {
        // Felicidade removida daqui
        return this.interagir(); // Polimorfismo
    }

    ganharFelicidade(pontos) {
        this.felicidade = Math.min(100, this.felicidade + pontos);
    }

    // Método abstrato que será sobrescrito nas subclasses
    interagir() {
        return "Você fez carinho na tartaruga.";
    }
}
