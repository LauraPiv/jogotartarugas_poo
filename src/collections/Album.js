import { Figurinha } from './Figurinha.js';

export class Album {
    constructor(elementUI) {
        this.container = elementUI;
        this.figurinhas = [
            // ESPÉCIES
            new Figurinha(1, "Tartaruga Cabeçuda", "A mais comum no Brasil.", "fig_01.png", "especie"),
            new Figurinha(2, "Tartaruga de Pente", "Linda e ameaçada.", "fig_02.png", "especie"),
            new Figurinha(3, "Tartaruga Verde", "Navegadora dos mares.", "fig_03.png", "especie"),
            new Figurinha(4, "Tartaruga Oliva", "Pequena e valente.", "fig_04.png", "especie"),
            new Figurinha(5, "Tartaruga de Couro", "A gigante das profundezas.", "fig_05.png", "especie"),

            // AMEAÇAS (EDU)
            new Figurinha(6, "Rede Fantasma", "Armadilha no fundo do mar.", "fig_06.png", "educativo"),
            new Figurinha(7, "Poluição Plástica", "Sacolas não são águas-vivas!", "fig_07.png", "educativo"),
            new Figurinha(8, "Fotopoluição", "Luzes que desorientam.", "fig_08.png", "educativo"),
            new Figurinha(9, "Mudanças Climáticas", "Perigo para os corais.", "fig_09.png", "educativo"),
            new Figurinha(10, "Mancha de Óleo", "Cuidado na superfície!", "fig_10.png", "educativo"),

            // ECOSSISTEMA
            new Figurinha(11, "O Nascimento", "O início da jornada.", "fig_11.png", "ambiente"),
            new Figurinha(12, "Recife de Coral", "A cidade do oceano.", "fig_12.png", "ambiente"),
            new Figurinha(13, "Água-Viva", "O manjar predileto.", "fig_13.png", "ambiente"),
            new Figurinha(14, "Siri Atrevido", "Cuidado com as pinças!", "fig_14.png", "ambiente"),
            new Figurinha(15, "Estrela do Mar", "Habitante dos recifes.", "fig_15.png", "ambiente"),

            // CONQUISTAS
            new Figurinha('flappy', "Rei do Coral", "Mestre do Arcade!", "fig_16.png", "conquista"),
            new Figurinha('memory', "Mente Brilhante", "Memória de elefante!", "fig_17.png", "conquista"),
            new Figurinha('guardiao', "Guardião Tamar", "Parceiro da preservação.", "fig_18.png", "conquista"),
            new Figurinha('explorador', "Explorador Marinho", "Conhece todos os cantos.", "fig_19.png", "conquista"),
            new Figurinha('ancestral', "Evolução Ancestral", "A jornada completa.", "fig_20.png", "conquista")
        ];
        
        // As 5 espécies começam desbloqueadas para o usuário conhecer o projeto
        for(let i=0; i<5; i++) this.figurinhas[i].desbloquear();
    }

    renderizar() {
        this.container.innerHTML = '';
        this.figurinhas.forEach(fig => {
            const el = document.createElement('div');
            el.className = `figurinha-card ${fig.desbloqueada ? 'unlocked' : 'locked'} type-${fig.tipo}`;
            
            // Se estiver desbloqueada, mostra a imagem. Se não, mostra o padrão de bloqueio.
            const content = fig.desbloqueada 
                ? `<img src="/${fig.imgEmoji}" alt="${fig.nome}" class="sticker-img">`
                : `<div class="sticker-placeholder">?</div>`;

            el.innerHTML = `
                <div class="figurinha-inner">
                    <div class="figurinha-front">
                        <div class="sticker-glow"></div>
                        <div class="sticker-media">${content}</div>
                        <div class="sticker-info">
                            <h4>${fig.desbloqueada ? fig.nome : 'Bloqueado'}</h4>
                            <p>${fig.desbloqueada ? fig.descricao : 'Continue a jornada para liberar!'}</p>
                        </div>
                    </div>
                </div>
            `;
            this.container.appendChild(el);
        });
    }

    desbloquearPorId(id) {
        const fig = this.figurinhas.find(f => f.id == id);
        if (fig && !fig.desbloqueada) {
            fig.desbloquear();
            // Efeito visual poderia ser disparado aqui
            return true;
        }
        return false;
    }
}
