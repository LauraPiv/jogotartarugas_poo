import { Figurinha } from './Figurinha.js';

/**
 * Classe que gerencia a coleção de figurinhas (Álbum).
 * Lida com o sorteio, desbloqueio e persistência local dos dados.
 */
export class Album {
    /**
     * @param {HTMLElement} elementUI - Container onde o álbum será renderizado.
     */
    constructor(elementUI) {
        this.container = elementUI;
        
        // Base de dados das figurinhas do jogo
        this.figurinhas = [
            // Categoria: ESPÉCIES
            new Figurinha(1, "Tartaruga Cabeçuda", "A mais comum no Brasil.", "/figurinha1.png", "especie", "comum"),
            new Figurinha(2, "Tartaruga de Pente", "Linda e ameaçada.", "/figurinha2.png", "especie", "rara"),
            new Figurinha(3, "Tartaruga Verde", "Navegadora dos mares.", "/figura3.jpg", "especie", "comum"),
            new Figurinha(4, "Tartaruga Oliva", "Pequena e valente.", "/figurinha4.jpg", "especie", "rara"),
            new Figurinha(5, "Tartaruga de Couro", "A gigante das profundezas.", "/figurinha5.jpg", "especie", "lendaria"),

            // Categoria: AMEAÇAS (Educativo)
            new Figurinha(6, "Rede Fantasma", "Armadilha no fundo do mar.", "/figurinha6.png", "educativo", "comum"),
            new Figurinha(7, "Poluição Plástica", "Sacolas não são águas-vivas!", "/figurinha7.png", "educativo", "comum"),
            new Figurinha(8, "Fotopoluição", "Luzes que desorientam.", "/figurinha8.png", "educativo", "rara"),
            new Figurinha(9, "Mudanças Climáticas", "Perigo para os corais.", "/figurinha9.png", "educativo", "lendaria"),
            new Figurinha(10, "Mancha de Óleo", "Cuidado na superfície!", "/figurinha10.png", "educativo", "rara"),

            // Categoria: ECOSSISTEMA
            new Figurinha(11, "O Nascimento", "O início da jornada.", "/figurinha11.png", "ambiente", "comum"),
            new Figurinha(12, "Recife de Coral", "A cidade do oceano.", "/figurinha12.png", "ambiente", "rara"),
            new Figurinha(13, "Água-Viva", "O manjar predileto.", "/figurinha13.png", "ambiente", "comum"),
            new Figurinha(14, "Siri Atrevido", "Cuidado com as pinças!", "/figurinha14.png", "ambiente", "comum"),
            new Figurinha(15, "Estrela do Mar", "Habitante dos recifes.", "/figurinha15.png", "ambiente", "rara"),

            // Categoria: CONQUISTAS
            new Figurinha('flappy', "Rei do Coral", "Mestre do Arcade!", "/figurinha16.jpg", "conquista", "lendaria"),
            new Figurinha('memory', "Mente Brilhante", "Memória de elefante!", "/figurinha17.png", "conquista", "lendaria"),
            new Figurinha('guardiao', "Guardião Tamar", "Parceiro da preservação.", "/figurinha18.jpg", "conquista", "lendaria"),
            new Figurinha('explorador', "Explorador Marinho", "Conhece todos os cantos.", "/figurinha19.png", "conquista", "rara"),
            new Figurinha('ancestral', "Evolução Ancestral", "A jornada completa.", "/figurinha20.jpg", "conquista", "lendaria")
        ];
        
        // Tenta carregar o progresso salvo no navegador
        this.carregarProgresso();
    }

    /**
     * Recupera os dados de desbloqueio do localStorage.
     */
    carregarProgresso() {
        const salvo = localStorage.getItem('jogopoo_album');
        if (salvo) {
            const dados = JSON.parse(salvo);
            dados.forEach(d => {
                const fig = this.figurinhas.find(f => f.id == d.id);
                if (fig) {
                    fig.desbloqueada = d.desbloqueada;
                    fig.quantidade = d.quantidade;
                }
            });
        }
    }

    /**
     * Persiste o estado atual da coleção no localStorage.
     */
    salvarProgresso() {
        const dados = this.figurinhas.map(f => ({
            id: f.id,
            desbloqueada: f.desbloqueada,
            quantidade: f.quantidade
        }));
        localStorage.setItem('jogopoo_album', JSON.stringify(dados));
    }

    /**
     * Renderiza visualmente o álbum na tela.
     */
    renderizar() {
        this.container.innerHTML = '';
        this.figurinhas.forEach(fig => {
            const el = document.createElement('div');
            el.className = `figurinha-card ${fig.desbloqueada ? 'unlocked' : 'locked'} type-${fig.tipo} raridade-${fig.raridade}`;
            
            const isVisual = fig.imgEmoji.includes('.');
            const mediaStr = isVisual 
                ? `<img src="${fig.imgEmoji}" alt="${fig.nome}" class="sticker-img" style="width:100%; height:100%; object-fit:contain; padding: 10px; border-radius: 10px;">`
                : `<div style="font-size: 1.5rem; font-weight: bold; display: flex; align-items: center; justify-content: center; height: 100%; text-shadow: 0 2px 4px rgba(0,0,0,0.5); color: #fff; text-align: center; padding: 5px;">${fig.imgEmoji}</div>`;

            const content = fig.desbloqueada 
                ? `${mediaStr}
                   ${fig.quantidade > 1 ? `<div class="sticker-badge">${fig.quantidade}</div>` : ''}`
                : `<div class="sticker-placeholder">
                       <img src="/cartavesso.png" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px; filter: grayscale(0.5) brightness(0.8);">
                       <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 3rem; font-weight: 900; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">?</div>
                   </div>`;

            el.innerHTML = `
                <div class="figurinha-inner">
                    <div class="figurinha-front">
                        <div class="sticker-glow"></div>
                        <div class="sticker-media">${content}</div>
                        <div class="sticker-info">
                            <h4>${fig.desbloqueada ? fig.nome : 'Bloqueado'}</h4>
                            <span style="color: ${this.getCorRaridade(fig.raridade)}">${fig.raridade}</span>
                            <p>${fig.desbloqueada ? fig.descricao : 'Continue a jornada para liberar!'}</p>
                        </div>
                    </div>
                </div>
            `;
            this.container.appendChild(el);
        });
    }

    /**
     * Retorna a cor hexadecimal associada à raridade.
     * @param {string} raridade 
     * @returns {string} Cor em hex.
     */
    getCorRaridade(raridade) {
        const cores = {
            'comum': '#a0a0a0',
            'rara': '#3498db',
            'lendaria': '#f1c40f'
        };
        return cores[raridade] || '#fff';
    }

    /**
     * Realiza um sorteio de figurinha baseado em probabilidades de raridade.
     * @returns {Object|null} Objeto contendo a figurinha e se ela é nova.
     */
    sortearFigurinha() {
        const roll = Math.random();
        let rarityTarget = 'comum';
        
        if (roll > 0.65) rarityTarget = 'rara';
        if (roll > 0.90) rarityTarget = 'lendaria';

        const pool = this.figurinhas.filter(f => f.raridade === rarityTarget);
        if(pool.length === 0) return null;

        const drawn = pool[Math.floor(Math.random() * pool.length)];
        const isNew = drawn.quantidade === 0;
        
        drawn.desbloquear();
        this.salvarProgresso();
        
        return { figurinha: drawn, isNew: isNew };
    }

    /**
     * Desbloqueia uma figurinha específica pelo seu ID.
     * @param {string|number} id 
     * @returns {boolean} Sucesso da operação.
     */
    desbloquearPorId(id) {
        const fig = this.figurinhas.find(f => f.id == id);
        if (fig && !fig.desbloqueada) {
            fig.desbloquear();
            this.salvarProgresso();
            return true;
        }
        return false;
    }
}

