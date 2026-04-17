export class SistemaEducacao {
    constructor() {
        this.curiosidades = [
            "Você sabia? Tartarugas confundem sacolas de plástico com águas-vivas!",
            "O sexo dos filhotes é determinado pela temperatura da areia do ninho.",
            "De cada mil filhotes que nascem, só um ou dois chegam à idade adulta.",
            "As tartarugas marinhas existem há mais de 100 milhões de anos!",
            "A poluição luminosa nas cidades desorienta os filhotes que nascem na praia."
        ];
    }

    getCuriosidade() {
        const index = Math.floor(Math.random() * this.curiosidades.length);
        return this.curiosidades[index];
    }
}
