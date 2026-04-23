export class SistemaEducacao {
    constructor() {
        this.curiosidades = [
            "Você sabia? Tartarugas confundem sacolas de plástico com águas-vivas!",
            "O sexo dos filhotes é determinado pela temperatura da areia do ninho.",
            "De cada mil filhotes que nascem, só um ou dois chegam à idade adulta.",
            "As tartarugas marinhas existem há mais de 100 milhões de anos!",
            "A poluição luminosa nas cidades desorienta os filhotes que nascem na praia."
        ];

        this.conteudo = {
            especies: {
                titulo: "Tartarugas do Brasil",
                texto: "O Brasil é área de desova de 5 das 7 espécies de tartarugas marinhas existentes no mundo. Todas estão sob proteção do Projeto Tamar.",
                itens: [
                    { nome: "Tartaruga Cabeçuda", desc: "A mais comum a desovar em nosso litoral. Tem cabeça grande e mandíbulas fortes.", foto: "/tartarugacabecuda.jpg" },
                    { nome: "Tartaruga de Pente", desc: "Considerada a mais bela, sua carapaça era usada para fazer objetos. Vive nos recifes.", foto: "/tartarugadepente.jfif" },
                    { nome: "Tartaruga de Couro", desc: "A maior de todas, pode chegar a 2 metros e pesar 700kg. Vive no mar profundo.", foto: "/tartarugadecouro.jpg" },
                    { nome: "Tartaruga Verde", desc: "Herbívora quando adulta, é fundamental para o ecossistema das pradarias marinhas.", foto: "/tartaruga verde.jpg" },
                    { nome: "Tartaruga Oliva", desc: "A menor das tartarugas marinhas brasileiras, desova principalmente em Sergipe.", foto: "/tartaruga oliva.jpg" }
                ],
                imagem: "/icon_oliva.png"
            },
            ameacas: {
                titulo: "Perigos no Oceano",
                texto: "Infelizmente, a ação humana criou muitos obstáculos para a sobrevivência desses animais milenares.",
                itens: [
                    { nome: "Poluição Plástica", desc: "Sacolas e canudos são confundidos com comida e causam asfixia." },
                    { nome: "Pesca Incidental", desc: "Redes de pesca abandonadas ou mal usadas capturam tartarugas por descuido." },
                    { nome: "Luz na Praia", desc: "Luzes de cidades confundem os filhotes, que devem seguir o brilho da lua no mar." },
                    { nome: "Aquecimento Global", desc: "Areia muito quente gera apenas fêmeas, desequilibrando a população." }
                ],
                imagem: "/bg_poluido.png"
            },
            tamar: {
                titulo: "O Projeto Tamar",
                texto: "Criado nos anos 80, o Tamar é referência mundial em conservação marinha, unindo ciência e comunidades locais.",
                itens: [
                    { nome: "Proteção de Ninhos", desc: "Mais de 40 milhões de tartarugas já foram devolvidas ao mar pelo projeto." },
                    { nome: "Educação Ambiental", desc: "Centros de visitantes ajudam a conscientizar milhares de pessoas todos os anos." },
                    { nome: "Inclusão Social", desc: "Antigos caçadores hoje trabalham protegendo as tartarugas e seus ovos." }
                ],
                imagem: "/telainicial.mp4"
            }
        };
    }

    getCuriosidade() {
        const index = Math.floor(Math.random() * this.curiosidades.length);
        return this.curiosidades[index];
    }

    getConteudo(categoria) {
        return this.conteudo[categoria] || this.conteudo.especies;
    }
}
