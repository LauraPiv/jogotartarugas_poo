import { Tartaruga } from './Tartaruga.js';

export class TartarugaVerde extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga Verde");
        this.velocidade = 80;
        this.resistencia = 40;
        this.falaInicial = "Oi! Eu sou muito rápida e gosto de algas!";
    }
<<<<<<< HEAD
=======

    interagir() {
        return "Uhuu! Adoro brincar! *nada rápido* 💚";
    }
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
}

export class TartarugaOliva extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga Oliva");
        this.velocidade = 50;
        this.resistencia = 80;
        this.falaInicial = "Sou a Tartaruga Oliva! Pequena mas a mais abundante nos mares!";
    }
<<<<<<< HEAD
=======

    interagir() {
        return "Haha, que cócegas! Minha carapaça é dura mas sinto cócegas! 😆";
    }
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
}

export class TartarugaDePente extends Tartaruga {
    constructor(nome) {
        super(nome, "Tartaruga de Pente (Marrom)");
        this.velocidade = 60;
        this.resistencia = 60;
        this.falaInicial = "Minha carapaça é marrom e adoro explorar recifes de corais em segurança.";
    }
<<<<<<< HEAD
=======

    interagir() {
        return "Que carinho bom! Vou procurar uns corais pra gente explorar. 🪸";
    }
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
}
