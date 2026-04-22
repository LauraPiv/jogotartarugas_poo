export class Tartaruga {
    constructor(nome, especie) {
        this.nome = nome;
        this.especie = especie;
        this.idade = 'filhote'; // filhote, adolescente, adulta, idosa
        this.energia = 100;
        this.experiencia = 0;
        this.resistencia = 50;
        this.velocidade = 50;
    }

    ganharExperiencia(pontos) {
        this.experiencia += pontos;
        return this.experiencia;
    }

    gastarEnergia(quantidade) {
        this.energia = Math.max(0, this.energia - quantidade);
    }

    recuperarEnergia(quantidade) {
        this.energia = Math.min(100, this.energia + quantidade);
    }

    getInfo() {
        return `${this.nome} (${this.especie}) - Idade: ${this.idade} | XP: ${this.experiencia}`;
    }
}
