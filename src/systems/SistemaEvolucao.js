export class SistemaEvolucao {
    constructor() {
        // Quantidade de XP necessária para cada estágio
        this.limiares = {
            'ovinho': 0,
            'filhote': 0,
            'adolescente': 100,
            'adulta': 300,
            'idosa': 800
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
