/**
 * Classe base que representa uma Tartaruga no sistema.
 * Gerencia os atributos vitais e o ciclo de vida do pet.
 */
export class Tartaruga {
    /**
     * @param {string} nome - Nome atribuído pelo jogador.
     * @param {string} especie - Nome da espécie da tartaruga.
     */
    constructor(nome, especie) {
        this.nome = nome;
        this.especie = especie;
        this.idade = 'filhote'; // Estágios: filhote, adolescente, adulta, idosa
        
        // Atributos Vitais (0-100)
        this.saude = 100;
        this.energia = 100;
        this.fome = 50; // 0 é saciada, 100 é fome máxima
        this.felicidade = 50;
        
        this.experiencia = 0;
        this.isDormindo = false;
    }

    /**
     * Adiciona pontos de experiência ao progresso da tartaruga.
     * @param {number} pontos - Quantidade de XP a ganhar.
     * @returns {number} O total de experiência atual.
     */
    ganharExperiencia(pontos) {
        this.experiencia += pontos;
        return this.experiencia;
    }

    /**
     * Processa a passagem do tempo e as necessidades vitais.
     * Deve ser chamado em intervalos regulares.
     * @returns {boolean} True se a saúde chegar a zero (Fim de jogo).
     */
    cicloDeVida() {
        if (this.isDormindo) {
            // No modo sono, recupera energia rapidamente
            this.energia = Math.min(100, this.energia + 10);
            if (this.energia >= 100) this.isDormindo = false; // Acorda automaticamente ao completar energia
        } else {
            // Degradação natural enquanto acordada
            this.energia = Math.max(0, this.energia - 1);
            this.fome = Math.min(100, this.fome + 2);
            this.felicidade = Math.max(0, this.felicidade - 1);
        }

        // Sistema de Consequências: Dano se as necessidades básicas não forem atendidas
        if (this.fome >= 100 || this.energia <= 0) {
            this.saude = Math.max(0, this.saude - 2);
        } else {
            // Recuperação passiva se estiver bem cuidada
            if (this.fome < 50 && this.energia > 50) {
                this.saude = Math.min(100, this.saude + 1);
            }
        }
        
        return this.saude <= 0;
    }

    /**
     * Reduz o nível de fome e recupera um pouco de energia.
     * @returns {string} Mensagem de feedback.
     */
    alimentar() {
        this.fome = Math.max(0, this.fome - 30);
        this.energia = Math.min(100, this.energia + 5);
        return "Nham nham! Estava uma delícia! 😋";
    }

    /**
     * Executa a interação de carinho, disparando o comportamento polimórfico.
     * @returns {string} Resposta específica da espécie.
     */
    fazerCarinho() {
        return this.interagir();
    }

    /**
     * Aumenta o nível de felicidade.
     * @param {number} pontos - Quantidade a adicionar.
     */
    ganharFelicidade(pontos) {
        this.felicidade = Math.min(100, this.felicidade + pontos);
    }

    /**
     * Método polimórfico que define a resposta visual/textual de cada espécie.
     * Deve ser sobrescrito nas subclasses em Especies.js.
     * @returns {string}
     */
    interagir() {
        return "Você fez carinho na tartaruga.";
    }
}

