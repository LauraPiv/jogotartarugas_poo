import { Tartaruga } from './Tartaruga.js';

export class TartarugaVerde extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga Verde");
        this.velocidade = 80;
        this.resistencia = 40;
        this.falaInicial = "Oi! Eu sou muito rápida e gosto de algas!";
    }
}

export class TartarugaOliva extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga Oliva");
        this.velocidade = 50;
        this.resistencia = 80;
        this.falaInicial = "Sou a Tartaruga Oliva! Pequena mas a mais abundante nos mares!";
    }
}

export class TartarugaDePente extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga de Pente (Marrom)");
        this.velocidade = 60;
        this.resistencia = 60;
        this.falaInicial = "Minha carapaça é marrom e adoro explorar recifes de corais em segurança.";
    }
}
