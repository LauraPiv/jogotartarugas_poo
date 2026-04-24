import { Tartaruga } from './Tartaruga.js';

/**
 * Especialização: Tartaruga de Couro.
 * Possui alta resistência devido ao seu grande porte.
 */
export class TartarugaDeCouro extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga de Couro");
        this.velocidade = 40;
        this.resistencia = 90;
        this.falaInicial = "Oi! Sou a Tartaruga de Couro, a maior de todas!";
    }

    /**
     * @override
     */
    interagir() {
        return "Uau! Adoro mergulhar fundo no oceano! 🌊🐢";
    }
}

/**
 * Especialização: Tartaruga Oliva.
 * Espécie equilibrada e resistente.
 */
export class TartarugaOliva extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga Oliva");
        this.velocidade = 50;
        this.resistencia = 80;
        this.falaInicial = "Sou a Tartaruga Oliva! Pequena mas a mais abundante nos mares!";
    }

    /**
     * @override
     */
    interagir() {
        return "Haha, que cócegas! Minha carapaça é dura mas sinto cócegas! 😄";
    }
}

/**
 * Especialização: Tartaruga de Pente.
 * Comum em recifes de corais.
 */
export class TartarugaDePente extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga de Pente (Marrom)");
        this.velocidade = 60;
        this.resistencia = 60;
        this.falaInicial = "Minha carapaça é marrom e adoro explorar recifes de corais em segurança.";
    }

    /**
     * @override
     */
    interagir() {
        return "Que carinho bom! Vou procurar uns corais pra gente explorar. 🥰🪸";
    }
}

