export class Figurinha {
    constructor(id, nome, descricao, imgEmoji, tipo, raridade = 'comum') {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.imgEmoji = imgEmoji;
        this.tipo = tipo; // especie, ameaca, ambiente, conquista
        this.raridade = raridade; // comum, rara, lendaria
        this.desbloqueada = false;
        this.quantidade = 0;
    }

    desbloquear() {
        this.desbloqueada = true;
        this.quantidade++;
    }
}
