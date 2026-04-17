import { Tartaruga } from './Tartaruga.js';

export class TartarugaVerde extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga Verde");
        this.velocidade = 80;
        this.resistencia = 40;
        this.falaInicial = "Oi! Eu sou muito rápida e gosto de algas!";
    }
}

export class TartarugaCabecuda extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga Cabeçuda");
        this.velocidade = 40;
        this.resistencia = 90;
        this.falaInicial = "Minha cabeça é dura para quebrar carapaças!";
    }
}

export class TartarugaDePente extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga de Pente");
        this.velocidade = 60;
        this.resistencia = 60;
        this.falaInicial = "Adoro explorar recifes de corais em segurança.";
    }
}
