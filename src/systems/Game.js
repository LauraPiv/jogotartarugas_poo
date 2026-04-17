import { TartarugaVerde, TartarugaOliva, TartarugaDePente } from '../entities/Especies.js';
import { ComportamentoTartaruga } from '../entities/ComportamentoTartaruga.js';
import { SistemaEducacao } from './SistemaEducacao.js';
import { SistemaEvolucao } from './SistemaEvolucao.js';
import { SistemaImpactoAmbiental } from './SistemaImpactoAmbiental.js';
import { GerenciadorMissoes } from './GerenciadorMissoes.js';
import { JogoNascimento } from '../minigames/JogoDesvio.js';
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
            missionsList: document.querySelector('.mission-list'),
            btnAlbum: document.getElementById('btn-album'),
            albumMenu: document.getElementById('album-menu'),
            btnExitMinigame: document.getElementById('btn-exit-minigame')
        };
        
        this.gerenciadorMissoes = new GerenciadorMissoes(this.ui.missionsList, (faseId) => this.iniciarMinigame(faseId));

        this.comportamento = null;

        this.bindEvents();
    }

    bindEvents() {
        // Tela Inicial -> Seleção de Espécie
        document.getElementById('btn-start').addEventListener('click', () => {
            document.getElementById('start-screen').classList.add('hidden');
            document.getElementById('character-select').classList.remove('hidden');
        });

        // Seleção de Espécie
        let selectedSpeciesStr = null;
        document.querySelectorAll('.species-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove selected de todos
                document.querySelectorAll('.species-btn').forEach(b => b.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                selectedSpeciesStr = e.currentTarget.dataset.species;
                document.getElementById('naming-section').classList.remove('hidden');
            });
        });

        // Confirmação do Nome e Nascimento
        document.getElementById('btn-confirm-turtle').addEventListener('click', () => {
             const inputStr = document.getElementById('turtle-name-input').value.trim();
             if(!selectedSpeciesStr) return;
             const nomeDaTartaruga = inputStr || "Tartaruguinha";
             this.selecionarEspecie(selectedSpeciesStr, nomeDaTartaruga);
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

        // Iniciar Missão movido para o GerenciadorMissoes

        // Sair Minigame
        this.ui.btnExitMinigame.addEventListener('click', () => {
             this.voltarParaHub();
        });
    }

    selecionarEspecie(especieStr, nome) {
        document.getElementById('character-select').classList.add('hidden');
        document.getElementById('egg-hatch-screen').classList.remove('hidden');
        
        switch (especieStr) {
            case 'verde': this.playerTartaruga = new TartarugaVerde(nome); break;
            case 'oliva': this.playerTartaruga = new TartarugaOliva(nome); break;
            case 'pente': this.playerTartaruga = new TartarugaDePente(nome); break;
        }

        const sprite = document.getElementById('turtle-sprite');
        const bubble = document.getElementById('turtle-speech-bubble');
        this.comportamento = new ComportamentoTartaruga(sprite, bubble);
        
        this.atualizarUIInfo();
        
        // Simula o chocar do ovo
        setTimeout(() => {
             document.getElementById('egg-hatch-screen').classList.add('hidden');
             this.comportamento.falar(this.playerTartaruga.falaInicial);
             this.comportamento.atualizarVisualidadeIdade('filhote'); // Começa como filhote
             
             // Inicializa missões liberando da primeira
             // Consideraremos que a primeira fase ('1') é o nascimento
             this.gerenciadorMissoes.atualizarProgresso('filhote', null);
             this.sisImpacto.modificarFundo('praia');
        }, 3000);
    }

    ganharXP(quantidade) {
        this.playerTartaruga.ganharExperiencia(quantidade);
        this.atualizarUIInfo();
        
        if (this.sisEvolucao.verificarEvolucao(this.playerTartaruga)) {
            this.comportamento.atualizarVisualidadeIdade(this.playerTartaruga.idade);
            this.comportamento.falar(`Eba! Eu evoluí para ${this.playerTartaruga.idade}!`);
            
            // Muda fundo dependendo da evolução
            if (this.playerTartaruga.idade === 'adolescente') this.sisImpacto.modificarFundo('oceano-raso');
            if (this.playerTartaruga.idade === 'adulta') this.sisImpacto.modificarFundo('oceano-profundo');
            if (this.playerTartaruga.idade === 'idosa') this.sisImpacto.modificarFundo('recifes');
        }
        
        // Sempre checa missões ao ganhar XP ou mudar idade
        this.gerenciadorMissoes.atualizarProgresso(this.playerTartaruga.idade, null);
    }

    atualizarUIInfo() {
        this.ui.xpLabel.textContent = this.playerTartaruga.experiencia;
    }

    iniciarMinigame(fase) {
        this.ui.missionsMenu.classList.add('hidden');
        this.ui.hubScreen.classList.remove('active');
        this.ui.minigameScreen.classList.add('active');
        this.ui.minigameTitle.textContent = `Fase ${fase}`;
        this.faseAtualEmAndamento = fase;

        if (fase === '1') {
            this.minigameAtual = new JogoNascimento(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        } else if (fase === '2') {
            this.minigameAtual = new JogoSelecao(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        }
    }

    finalizarMinigame(resultado) {
        alert(resultado.mensagem + `\nXP Ganho: ${resultado.xp}`);
        this.ganharXP(resultado.xp);
        
        // Atualiza missoes com a que acabou de passar
        this.gerenciadorMissoes.atualizarProgresso(this.playerTartaruga.idade, this.faseAtualEmAndamento);
        this.album.desbloquearPorId(this.faseAtualEmAndamento); // desbloqueia figurinha ao passar fase
        
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
