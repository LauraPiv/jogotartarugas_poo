export class Figurinha {
    constructor(id, nome, descricao, imgEmoji, tipo) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.imgEmoji = imgEmoji;
        this.tipo = tipo; // especie, ameaca, ambiente
        this.desbloqueada = false;
    }

    desbloquear() {
        this.desbloqueada = true;
    }
}
