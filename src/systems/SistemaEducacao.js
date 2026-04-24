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
                    { 
                        nome: "Tartaruga Cabeçuda", 
                        desc: "A mais comum a desovar em nosso litoral. Tem cabeça grande e mandíbulas fortes.", 
                        foto: "/tartarugacabecuda.jpg",
                        detalhes: {
                            "Habitat": "Zonas costeiras e oceanos abertos temperados e subtropicais.",
                            "Regiões": "Principais desovas no Brasil: Bahia, Sergipe, Espírito Santo e Rio de Janeiro.",
                            "Alimentação": "Predominantemente carnívora (caranguejos, caramujos, moluscos e águas-vivas).",
                            "Reprodução": "Atinge maturidade aos 25-30 anos; a fêmea faz até 5 ninhos por temporada com cerca de 120 ovos cada."
                        }
                    },
                    { 
                        nome: "Tartaruga de Pente", 
                        desc: "Considerada a mais bela, sua carapaça era usada para fazer objetos. Vive nos recifes.", 
                        foto: "/tartarugadepente.jfif",
                        detalhes: {
                            "Habitat": "Recifes de coral e águas costeiras rasas tropicais.",
                            "Regiões": "No Brasil, as principais áreas de desova são o litoral norte da Bahia e o Rio Grande do Norte.",
                            "Alimentação": "Esponjas do mar, anêmonas, lulas e camarões.",
                            "Reprodução": "Maturidade entre 20 e 35 anos; desova até 4 vezes por temporada, com ninhos de cerca de 130 ovos."
                        }
                    },
                    { 
                        nome: "Tartaruga de Couro", 
                        desc: "A maior de todas, pode chegar a 2 metros e pesar 700kg. Vive no mar profundo.", 
                        foto: "/tartarugadecouro.jpg",
                        detalhes: {
                            "Habitat": "Oceano aberto e zonas pelágicas, com capacidade de mergulhar a grandes profundidades.",
                            "Regiões": "Distribuição global. No Brasil, o principal local de desova é no litoral norte do Espírito Santo.",
                            "Alimentação": "Exclusivamente animais gelatinosos, como águas-vivas e salpas.",
                            "Reprodução": "Desova até 7 vezes por ano; seus ovos são os maiores entre as tartarugas marinhas."
                        }
                    },
                    { 
                        nome: "Tartaruga Verde", 
                        desc: "Herbívora quando adulta, é fundamental para o ecossistema das pradarias marinhas.", 
                        foto: "/tartaruga verde.jpg",
                        detalhes: {
                            "Habitat": "Pradarias marinhas, áreas costeiras e ilhas oceânicas.",
                            "Regiões": "No Brasil, desova principalmente nas ilhas oceânicas: Atol das Rocas, Fernando de Noronha e Trindade.",
                            "Alimentação": "É a única espécie estritamente herbívora quando adulta (alimenta-se de algas e capim-marinho).",
                            "Reprodução": "Maturidade entre 25 e 40 anos; faz de 3 a 5 ninhos por temporada com cerca de 115 ovos cada."
                        }
                    },
                    { 
                        nome: "Tartaruga Oliva", 
                        desc: "A menor das tartarugas marinhas brasileiras, desova principalmente em Sergipe.", 
                        foto: "/tartaruga oliva.jpg",
                        detalhes: {
                            "Habitat": "Oceanos tropicais, águas costeiras rasas e zonas de mar aberto.",
                            "Regiões": "No Brasil, o estado de Sergipe concentra a imensa maioria das desovas desta espécie.",
                            "Alimentação": "Onívora: alimenta-se de peixes, moluscos, crustáceos e algas.",
                            "Reprodução": "Maturidade precoce (12-15 anos); no Brasil desovam isoladamente, formando ninhos com cerca de 100 ovos."
                        }
                    }
                ],
                imagem: "/icon_oliva.png"
            },
            ameacas: {
                titulo: "Perigos no Oceano",
                texto: "Infelizmente, a ação humana criou muitos obstáculos para a sobrevivência desses animais milenares.",
                itens: [
                    { 
                        nome: "Poluição Plástica", 
                        desc: "Sacolas e canudos são confundidos com comida e causam asfixia.",
                        detalhes: {
                            "O Problema": "O lixo plástico não se decompõe rapidamente, formando microplásticos que envenenam a água.",
                            "Impacto Direto": "As tartarugas ingerem plásticos achando que são águas-vivas, o que causa bloqueios gastrointestinais letais.",
                            "Como Ajudar": "Reduza o uso de plásticos descartáveis, recicle corretamente e participe de limpezas de praia."
                        }
                    },
                    { 
                        nome: "Pesca Incidental", 
                        desc: "Redes de pesca abandonadas ou mal usadas capturam tartarugas por descuido.",
                        detalhes: {
                            "O Problema": "Conhecida como 'bycatch', milhares de tartarugas morrem afogadas presas acidentalmente em redes de pesca industriais.",
                            "Redes Fantasma": "Redes perdidas no mar continuam 'pescando' e matando animais marinhos por décadas.",
                            "Soluções": "O uso de anzóis circulares e dispositivos de exclusão de tartarugas (TEDs) nas redes de arrasto salva muitas vidas."
                        }
                    },
                    { 
                        nome: "Luz na Praia", 
                        desc: "Luzes de cidades confundem os filhotes, que devem seguir o brilho da lua no mar.",
                        detalhes: {
                            "Fototaxia": "Ao nascer, os filhotes procuram a luz mais brilhante no horizonte para chegar ao mar (o reflexo das estrelas e da lua na água).",
                            "Desorientação": "Luzes fortes em ruas ou casas à beira-mar atraem os filhotes para a cidade, onde sofrem com desidratação e atropelamentos.",
                            "Manejo": "Projetos de conservação atuam protegendo ninhos ou adequando a iluminação costeira nas áreas de desova."
                        }
                    },
                    { 
                        nome: "Aquecimento Global", 
                        desc: "Areia muito quente gera apenas fêmeas, desequilibrando a população.",
                        detalhes: {
                            "Determinação do Sexo": "O sexo das tartarugas é definido pela temperatura da areia. Temperaturas mais altas geram fêmeas, mais baixas geram machos.",
                            "Desequilíbrio": "Com o aquecimento das praias, o nascimento quase exclusivo de fêmeas ameaça seriamente a continuidade das espécies.",
                            "Outros Impactos": "O aumento do nível do mar inunda e destrói ninhos, e altera as correntes oceânicas vitais para as migrações."
                        }
                    }
                ],
                imagem: "/bg_poluido.png"
            },
            tamar: {
                titulo: "O Projeto Tamar",
                texto: "Criado nos anos 80, o Tamar é referência mundial em conservação marinha, unindo ciência e comunidades locais.",
                itens: [
                    { 
                        nome: "Proteção de Ninhos", 
                        desc: "Mais de 40 milhões de tartarugas já foram devolvidas ao mar pelo projeto.",
                        detalhes: {
                            "Monitoramento": "Pesquisadores monitoram quilômetros de praia durante a madrugada para identificar, catalogar e proteger novos ninhos.",
                            "Transferência": "Quando a maré ou luzes da cidade ameaçam um ninho, os ovos são realocados para cercados de incubação seguros na praia."
                        }
                    },
                    { 
                        nome: "Educação Ambiental", 
                        desc: "Centros de visitantes ajudam a conscientizar milhares de pessoas todos os anos.",
                        detalhes: {
                            "Visitação": "Os centros de visitação mostram o trabalho de perto, e são mantidos com recursos de ingressos e das lojas oficiais.",
                            "Conscientização": "O projeto promove palestras, eventos solturas de filhotes e trabalha junto a escolas locais litorâneas."
                        }
                    },
                    { 
                        nome: "Inclusão Social", 
                        desc: "Antigos caçadores hoje trabalham protegendo as tartarugas e seus ovos.",
                        detalhes: {
                            "Emprego Local": "O projeto oferece alternativas de renda (artesanato, turismo) e emprega os moradores locais.",
                            "Transformação": "Ao integrar a comunidade costeira nos esforços, antigos coletores de ovos e pescadores tornaram-se os maiores defensoores das tartarugas."
                        }
                    }
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
