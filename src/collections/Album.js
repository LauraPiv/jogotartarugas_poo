import { Figurinha } from './Figurinha.js';

export class Album {
    constructor(elementUI) {
        this.container = elementUI;
        this.figurinhas = [
            // ESPÉCIES (Arte Gerada por IA!)
            new Figurinha(1, "Tartaruga Cabeçuda", "A mais comum no Brasil.", "/fig_01.png", "especie", "comum"),
            new Figurinha(2, "Tartaruga de Pente", "Linda e ameaçada.", "/fig_02.png", "especie", "rara"),
            new Figurinha(3, "Tartaruga Verde", "Navegadora dos mares.", "/fig_03.png", "especie", "comum"),
            new Figurinha(4, "Tartaruga Oliva", "Pequena e valente.", "/fig_04.png", "especie", "rara"),
            new Figurinha(5, "Tartaruga de Couro", "A gigante das profundezas.", "/fig_05.png", "especie", "lendaria"),

            // AMEAÇAS (EDU)
            new Figurinha(6, "Rede Fantasma", "Armadilha no fundo do mar.", "🕸️", "educativo", "comum"),
            new Figurinha(7, "Poluição Plástica", "Sacolas não são águas-vivas!", "🛍️", "educativo", "comum"),
            new Figurinha(8, "Fotopoluição", "Luzes que desorientam.", "💡", "educativo", "rara"),
            new Figurinha(9, "Mudanças Climáticas", "Perigo para os corais.", "🌡️", "educativo", "lendaria"),
            new Figurinha(10, "Mancha de Óleo", "Cuidado na superfície!", "🛢️", "educativo", "rara"),

            // ECOSSISTEMA
            new Figurinha(11, "O Nascimento", "O início da jornada.", "🥚", "ambiente", "comum"),
            new Figurinha(12, "Recife de Coral", "A cidade do oceano.", "🪸", "ambiente", "rara"),
            new Figurinha(13, "Água-Viva", "O manjar predileto.", "🪼", "ambiente", "comum"),
            new Figurinha(14, "Siri Atrevido", "Cuidado com as pinças!", "🦀", "ambiente", "comum"),
            new Figurinha(15, "Estrela do Mar", "Habitante dos recifes.", "⭐", "ambiente", "rara"),

            // CONQUISTAS
            new Figurinha('flappy', "Rei do Coral", "Mestre do Arcade!", "👑", "conquista", "lendaria"),
            new Figurinha('memory', "Mente Brilhante", "Memória de elefante!", "🧠", "conquista", "lendaria"),
            new Figurinha('guardiao', "Guardião Tamar", "Parceiro da preservação.", "🦸", "conquista", "lendaria"),
            new Figurinha('explorador', "Explorador Marinho", "Conhece todos os cantos.", "🔭", "conquista", "rara"),
            new Figurinha('ancestral', "Evolução Ancestral", "A jornada completa.", "🧬", "conquista", "lendaria")
        ];
        
        // As 3 espécies iniciais começam desbloqueadas
        for(let i=0; i<3; i++) this.figurinhas[i].desbloquear();
    }

    renderizar() {
        this.container.innerHTML = '';
        this.figurinhas.forEach(fig => {
            const el = document.createElement('div');
            el.className = `figurinha-card ${fig.desbloqueada ? 'unlocked' : 'locked'} type-${fig.tipo} raridade-${fig.raridade}`;
            
            // Verifica se é um arquivo de imagem ou um emoji
            const isVisual = fig.imgEmoji.includes('.');
            const mediaStr = isVisual 
                ? `<img src="${fig.imgEmoji}" alt="${fig.nome}" class="sticker-img" style="width:100%; height:100%; object-fit:contain; padding: 10px; border-radius: 10px;">`
                : `<div style="font-size: 5rem; display: flex; align-items: center; justify-content: center; height: 100%; text-shadow: 0 5px 10px rgba(0,0,0,0.2);">${fig.imgEmoji}</div>`;

            const content = fig.desbloqueada 
                ? `${mediaStr}
                   ${fig.quantidade > 1 ? `<div class="sticker-badge" style="position:absolute; top:-10px; right:-10px; background:red; color:white; border-radius:50%; width:25px; height:25px; display:flex; align-items:center; justify-content:center; font-weight:bold; z-index:10;">${fig.quantidade}</div>` : ''}`
                : `<div class="sticker-placeholder">?</div>`;

            el.innerHTML = `
                <div class="figurinha-inner">
                    <div class="figurinha-front">
                        <div class="sticker-glow"></div>
                        <div class="sticker-media" style="position:relative;">${content}</div>
                        <div class="sticker-info" style="padding-top: 5px;">
                            <h4 style="font-size: 0.9rem; margin-bottom: 2px;">${fig.desbloqueada ? fig.nome : 'Bloqueado'}</h4>
                            <span style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; color: ${this.getCorRaridade(fig.raridade)}">${fig.raridade}</span>
                            <p style="margin-top: 5px;">${fig.desbloqueada ? fig.descricao : 'Continue a jornada para liberar!'}</p>
                        </div>
                    </div>
                </div>
            `;
            this.container.appendChild(el);
        });
    }

    getCorRaridade(raridade) {
        if(raridade === 'comum') return '#a0a0a0';
        if(raridade === 'rara') return '#3498db';
        if(raridade === 'lendaria') return '#f1c40f';
        return '#fff';
    }

    sortearFigurinha() {
        // Roll rarity
        const roll = Math.random();
        let rarityTarget = 'comum';
        if (roll > 0.65) rarityTarget = 'rara';
        if (roll > 0.90) rarityTarget = 'lendaria';

        const pool = this.figurinhas.filter(f => f.raridade === rarityTarget);
        if(pool.length === 0) return null;

        const drawn = pool[Math.floor(Math.random() * pool.length)];
        const isNew = drawn.quantidade === 0;
        drawn.desbloquear();
        return { figurinha: drawn, isNew: isNew };
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
