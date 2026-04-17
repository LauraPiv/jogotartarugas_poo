import { TartarugaVerde, TartarugaCabecuda, TartarugaDePente } from '../entities/Especies.js';
import { ComportamentoTartaruga } from '../entities/ComportamentoTartaruga.js';
import { SistemaEducacao } from './SistemaEducacao.js';
import { SistemaEvolucao } from './SistemaEvolucao.js';
import { SistemaImpactoAmbiental } from './SistemaImpactoAmbiental.js';
import { JogoDesvio } from '../minigames/JogoDesvio.js';
import { JogoSelecao } from '../minigames/JogoSelecao.js';
import { Album } from '../collections/Album.js';

export class Game {
    constructor() {
        this.estadoAtual = 'selecao'; // selecao, hub, minigame
        this.playerTartaruga = null;
        
        // Inicializa Sistemas
        this.sisEducacao = new SistemaEducacao();
        this.sisEvolucao = new SistemaEvolucao();
        this.sisImpacto = new SistemaImpactoAmbiental(document.getElementById('ocean-health'));
        this.album = new Album(document.getElementById('album-grid'));

        // Elementos de UI
        this.ui = {
            xpLabel: document.getElementById('player-xp').querySelector('span'),
            hubScreen: document.getElementById('home-hub'),
            minigameScreen: document.getElementById('minigame-screen'),
            minigameContainer: document.getElementById('minigame-container'),
            minigameTitle: document.getElementById('minigame-title'),
            btnMissions: document.getElementById('btn-missions'),
            missionsMenu: document.getElementById('missions-menu'),
            btnAlbum: document.getElementById('btn-album'),
            albumMenu: document.getElementById('album-menu'),
            btnExitMinigame: document.getElementById('btn-exit-minigame')
        };

        this.comportamento = null;

        this.bindEvents();
    }

    bindEvents() {
        // Seleção de Espécie
        document.querySelectorAll('.species-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selecionarEspecie(e.currentTarget.dataset.species));
        });

        // Interação no Hub
        document.getElementById('turtle-container').addEventListener('click', () => {
             if (this.comportamento) {
                 this.comportamento.reagirClique(this.sisEducacao);
                 // Ganha 1 de XP a cada clique para incentivar interação
                 this.ganharXP(1);
             }
        });

        // Abrir Menu Missões
        this.ui.btnMissions.addEventListener('click', () => {
            this.ui.missionsMenu.classList.remove('hidden');
        });

        // Abrir Álbum
        this.ui.btnAlbum.addEventListener('click', () => {
            this.album.renderizar();
            this.ui.albumMenu.classList.remove('hidden');
        });

        // Iniciar Missão
        document.querySelectorAll('.mission-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const fase = e.currentTarget.dataset.phase;
                if (!e.currentTarget.classList.contains('locked')) {
                    this.iniciarMinigame(fase);
                }
            });
        });

        // Sair Minigame
        this.ui.btnExitMinigame.addEventListener('click', () => {
             this.voltarParaHub();
        });
    }

    selecionarEspecie(especieStr) {
        document.getElementById('character-select').classList.add('hidden');
        
        switch (especieStr) {
            case 'verde': this.playerTartaruga = new TartarugaVerde("Verdinha"); break;
            case 'cabecuda': this.playerTartaruga = new TartarugaCabecuda("Cabeção"); break;
            case 'pente': this.playerTartaruga = new TartarugaDePente("Pentinha"); break;
        }

        const sprite = document.getElementById('turtle-sprite');
        const bubble = document.getElementById('turtle-speech-bubble');
        this.comportamento = new ComportamentoTartaruga(sprite, bubble);
        
        this.atualizarUIInfo();
        this.comportamento.falar(this.playerTartaruga.falaInicial);
        this.comportamento.atualizarVisualidadeIdade('filhote'); // Começa como filhote
    }

    ganharXP(quantidade) {
        this.playerTartaruga.ganharExperiencia(quantidade);
        this.atualizarUIInfo();
        
        if (this.sisEvolucao.verificarEvolucao(this.playerTartaruga)) {
            // Se evoluiu, atualiza a UI
            this.comportamento.atualizarVisualidadeIdade(this.playerTartaruga.idade);
            this.comportamento.falar(`Eba! Eu evoluí para ${this.playerTartaruga.idade}!`);
            
            // Se virou bebê, desbloqueia fase 2 etc (Lógica simplificada)
            if (this.playerTartaruga.idade === 'filhote') {
                 document.querySelector('.mission-btn[data-phase="2"]')?.classList.remove('locked');
            }
        }
    }

    atualizarUIInfo() {
        this.ui.xpLabel.textContent = this.playerTartaruga.experiencia;
    }

    iniciarMinigame(fase) {
        this.ui.missionsMenu.classList.add('hidden');
        this.ui.hubScreen.classList.remove('active');
        this.ui.minigameScreen.classList.add('active');
        this.ui.minigameTitle.textContent = `Fase ${fase}`;

        if (fase === '1') {
            this.minigameAtual = new JogoDesvio(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        } else if (fase === '2') {
            this.minigameAtual = new JogoSelecao(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        }
    }

    finalizarMinigame(resultado) {
        alert(resultado.mensagem + `\nXP Ganho: ${resultado.xp}`);
        this.ganharXP(resultado.xp);
        
        if (!resultado.vitoria && typeof resultado.danoAmbiental !== "undefined") {
            this.sisImpacto.modificarSaude(-10);
        }

        this.voltarParaHub();
    }

    voltarParaHub() {
        if(this.minigameAtual) {
            this.minigameAtual.ativo = false;
        }
        this.ui.minigameScreen.classList.remove('active');
        this.ui.hubScreen.classList.add('active');
        this.ui.minigameContainer.innerHTML = '';
        
        setTimeout(() => {
            this.comportamento.falar(this.sisEducacao.getCuriosidade());
        }, 1000);
    }
}
