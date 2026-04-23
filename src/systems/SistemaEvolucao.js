export class SistemaEvolucao {
    constructor() {
        // Quantidade de XP necessária para cada estágio
        this.limiares = {
            'ovinho': 0,
<<<<<<< HEAD
            'filhote': 100,
            'adolescente': 300,
            'adulta': 600,
            'idosa': 1000
=======
            'filhote': 0,
            'adolescente': 20,
            'adulta': 50,
            'idosa': 100
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        };
    }

    verificarEvolucao(tartaruga) {
        let novaIdade = tartaruga.idade;
        
        if (tartaruga.experiencia >= this.limiares['idosa']) novaIdade = 'idosa';
        else if (tartaruga.experiencia >= this.limiares['adulta']) novaIdade = 'adulta';
        else if (tartaruga.experiencia >= this.limiares['adolescente']) novaIdade = 'adolescente';
        else if (tartaruga.experiencia >= this.limiares['filhote']) novaIdade = 'filhote';

        if (novaIdade !== tartaruga.idade) {
            tartaruga.idade = novaIdade;
            return true; // Evoluiu
        }
        return false; // Não evoluiu
    }
}
