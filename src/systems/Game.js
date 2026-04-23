import { TartarugaVerde, TartarugaOliva, TartarugaDePente } from '../entities/Especies.js';
import { ComportamentoTartaruga } from '../entities/ComportamentoTartaruga.js';
import { SistemaEducacao } from './SistemaEducacao.js';
import { SistemaEvolucao } from './SistemaEvolucao.js';
<<<<<<< HEAD
import { SistemaImpactoAmbiental } from './SistemaImpactoAmbiental.js';
import { GerenciadorMissoes } from './GerenciadorMissoes.js';
import { JogoNascimento } from '../minigames/JogoDesvio.js';
import { JogoSelecao } from '../minigames/JogoSelecao.js';
import { Album } from '../collections/Album.js';
=======
import { OceanManager } from './OceanManager.js';
import { GerenciadorMissoes } from './GerenciadorMissoes.js';
import { JogoNascimento } from '../minigames/JogoDesvio.js';
import { JogoSelecao } from '../minigames/JogoSelecao.js';
import { JogoRede } from '../minigames/JogoRede.js';
import { JogoBarco } from '../minigames/JogoBarco.js';
import { Album } from '../collections/Album.js';
import { FlappyTurtle } from '../minigames/FlappyTurtle.js';
import { MemoryGame } from '../minigames/MemoryGame.js';
import { RunnerGame } from '../minigames/RunnerGame.js';
import { Game2048 } from '../minigames/Game2048.js';
import { BubbleJump } from '../minigames/BubbleJump.js';
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406

export class Game {
    constructor() {
        this.estadoAtual = 'selecao'; // selecao, hub, minigame
        this.playerTartaruga = null;
        
        // Inicializa Sistemas
        this.sisEducacao = new SistemaEducacao();
        this.sisEvolucao = new SistemaEvolucao();
<<<<<<< HEAD
        this.sisImpacto = new SistemaImpactoAmbiental(document.getElementById('ocean-health'));
=======
        this.sisOcean = new OceanManager(); 
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
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
            btnExitMinigame: document.getElementById('btn-exit-minigame'),
            hatchVideo: document.getElementById('hatch-video'),
<<<<<<< HEAD
            mainBgVideo: document.getElementById('main-bg-video')
=======
            btnFeed: document.getElementById('btn-feed'),
            btnPet: document.getElementById('btn-pet'),
            btnSleep: document.getElementById('btn-sleep'),
            sleepOverlay: document.getElementById('sleep-overlay'),
            statusPanel: document.getElementById('turtle-status-panel'),
            draggableFood: document.getElementById('draggable-food'),
            bars: {
                health: document.getElementById('bar-health'),
                hunger: document.getElementById('bar-hunger'),
                energy: document.getElementById('bar-energy'),
                happiness: document.getElementById('bar-happiness')
            },
            petActions: document.getElementById('pet-actions'),
            btnArcade: document.getElementById('btn-arcade'),
            arcadeMenu: document.getElementById('arcade-menu'),
            btnEducativo: document.getElementById('btn-educativo'),
            educativoMenu: document.getElementById('educativo-menu'),
            eduContent: document.getElementById('edu-content')
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        };
        
        this.gerenciadorMissoes = new GerenciadorMissoes(this.ui.missionsList, (faseId) => this.iniciarMinigame(faseId));

        this.comportamento = null;
<<<<<<< HEAD
=======
        this.gameLoopInterval = null;
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406

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
<<<<<<< HEAD
                 // Ganha 1 de XP a cada clique para incentivar interação
                 this.ganharXP(1);
=======
                 // XP removido: ganharXP(1)
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
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

<<<<<<< HEAD
=======
        // Abrir Menu Arcade
        if(this.ui.btnArcade) {
            this.ui.btnArcade.addEventListener('click', () => {
                this.ui.arcadeMenu.classList.remove('hidden');
            });
        }

        // Abrir Menu Educativo
        if(this.ui.btnEducativo) {
            this.ui.btnEducativo.addEventListener('click', () => {
                this.abrirEducativo();
            });
        }

        // Navegação abas educativas
        document.querySelectorAll('.edu-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.edu-tab-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.renderizarConteudoEducativo(e.currentTarget.dataset.tab);
            });
        });

        // Clicar em um jogo do Arcade
        document.querySelectorAll('.arcade-game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if(!e.currentTarget.classList.contains('locked')) {
                    const gameId = e.currentTarget.dataset.minigame;
                    this.iniciarArcade(gameId);
                }
            });
        });

>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        // Sair Minigame
        this.ui.btnExitMinigame.addEventListener('click', () => {
             this.voltarParaHub();
        });
<<<<<<< HEAD
=======

        if(this.ui.btnFeed) {
            this.ui.btnFeed.addEventListener('click', (e) => {
                e.stopPropagation();
                if(!this.playerTartaruga || !this.comportamento) return;
                
                // Spawn the food item to be dragged
                this.ui.draggableFood.classList.remove('hidden');
                
                // Position it at the center
                this.ui.draggableFood.style.left = '50%';
                this.ui.draggableFood.style.top = '30%';
                this.ui.draggableFood.style.transform = 'translate(-50%, -50%)';
            });
        }

        // --- LÓGICA DE DRAG AND DROP (TALKING TOM STYLE) ---
        let isDragging = false;
        
        const moveAt = (pageX, pageY) => {
            const el = this.ui.draggableFood;
            el.style.left = pageX - (el.offsetWidth / 2) + 'px';
            el.style.top = pageY - (el.offsetHeight / 2) + 'px';
        };

        const onDragStart = (e) => {
            isDragging = true;
            this.ui.draggableFood.style.transform = 'none'; // Reset para o offsetWidth funcionar bem
            moveAt(e.pageX || (e.touches && e.touches[0].pageX), e.pageY || (e.touches && e.touches[0].pageY));
        };

        const onDragMove = (e) => {
            if(!isDragging) return;
            moveAt(e.pageX || (e.touches && e.touches[0].pageX), e.pageY || (e.touches && e.touches[0].pageY));
        };

        const onDragEnd = (e) => {
            if(!isDragging) return;
            isDragging = false;
            
            // Checar colisão AABB
            const spriteRect = document.getElementById('turtle-sprite').getBoundingClientRect();
            const foodRect = this.ui.draggableFood.getBoundingClientRect();
            
            const intersecta = (
                foodRect.left < spriteRect.right &&
                foodRect.right > spriteRect.left &&
                foodRect.top < spriteRect.bottom &&
                foodRect.bottom > spriteRect.top
            );

            this.ui.draggableFood.classList.add('hidden'); // Some

            if(intersecta) {
                // A tartaruga come a maçã
                if(this.playerTartaruga && this.comportamento) {
                    const fala = this.playerTartaruga.alimentar();
                    this.comportamento.falar(fala);
                    this.comportamento.pular();
                    // XP removido: ganharXP(2)
                    this.atualizarUIInfo();
                }
            }
        };

        if(this.ui.draggableFood) {
            this.ui.draggableFood.addEventListener('mousedown', onDragStart);
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);
            
            this.ui.draggableFood.addEventListener('touchstart', onDragStart, {passive: true});
            document.addEventListener('touchmove', onDragMove, {passive: true});
            document.addEventListener('touchend', onDragEnd);
        }

        if(this.ui.btnPet) {
            this.ui.btnPet.addEventListener('click', (e) => {
                e.stopPropagation();
                if(this.playerTartaruga && this.comportamento) {
                    const fala = this.playerTartaruga.fazerCarinho(); // Polimorfismo aqui!
                    this.comportamento.falar(fala);
                    this.comportamento.pular();
                    // XP removido: ganharXP(2)
                    this.atualizarUIInfo();
                }
            });
        }

        if(this.ui.btnSleep) {
            this.ui.btnSleep.addEventListener('click', (e) => {
                e.stopPropagation();
                if(this.playerTartaruga && this.comportamento) {
                    this.playerTartaruga.isDormindo = !this.playerTartaruga.isDormindo;
                    if(this.playerTartaruga.isDormindo) {
                        this.ui.sleepOverlay.classList.remove('hidden');
                        this.comportamento.falar("Zzz...");
                    } else {
                        this.ui.sleepOverlay.classList.add('hidden');
                        this.comportamento.falar("Bom dia!");
                    }
                    this.atualizarUIInfo();
                }
            });
        }
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
    }

    selecionarEspecie(especieStr, nome) {
        document.getElementById('character-select').classList.add('hidden');
        document.getElementById('egg-hatch-screen').classList.remove('hidden');
        
        if (this.ui.hatchVideo) {
            this.ui.hatchVideo.play().catch(e => console.log("Erro ao tocar vídeo:", e));
        }

        switch (especieStr) {
            case 'verde': this.playerTartaruga = new TartarugaVerde(nome); break;
            case 'oliva': this.playerTartaruga = new TartarugaOliva(nome); break;
            case 'pente': this.playerTartaruga = new TartarugaDePente(nome); break;
        }

        const sprite = document.getElementById('turtle-sprite');
        const bubble = document.getElementById('turtle-speech-bubble');
        this.comportamento = new ComportamentoTartaruga(sprite, bubble);
        
        this.atualizarUIInfo();
        
        // Simula o chocar do ovo ou espera o vídeo terminar
        const tempoHatch = 4500; // Tempo estimado do vídeo de nascimento
        setTimeout(() => {
             document.getElementById('egg-hatch-screen').classList.add('hidden');
             this.comportamento.falar(this.playerTartaruga.falaInicial);
             this.comportamento.atualizarVisualidadeIdade('filhote'); // Começa como filhote
             
             this.gerenciadorMissoes.atualizarProgresso('filhote', null);
<<<<<<< HEAD
             this.sisImpacto.modificarFundo('praia');
=======
             this.sisOcean.iniciar();
             this.sisOcean.setEstagio('praia');
             
             if(this.ui.petActions) {
                 this.ui.petActions.classList.remove('hidden');
             }
             if(this.ui.statusPanel) {
                 this.ui.statusPanel.classList.remove('hidden');
             }
             this.iniciarGameLoop();
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        }, tempoHatch);
    }

    ganharXP(quantidade) {
        this.playerTartaruga.ganharExperiencia(quantidade);
        this.atualizarUIInfo();
        
        if (this.sisEvolucao.verificarEvolucao(this.playerTartaruga)) {
            this.comportamento.atualizarVisualidadeIdade(this.playerTartaruga.idade);
            this.comportamento.falar(`Eba! Eu evoluí para ${this.playerTartaruga.idade}!`);
<<<<<<< HEAD
            
            // Muda fundo dependendo da evolução
            if (this.playerTartaruga.idade === 'adolescente') this.sisImpacto.modificarFundo('oceano-raso');
            if (this.playerTartaruga.idade === 'adulta') this.sisImpacto.modificarFundo('oceano-profundo');
            if (this.playerTartaruga.idade === 'idosa') this.sisImpacto.modificarFundo('recifes');
=======
                        // Muda fundo dependendo da evolução
             if (this.playerTartaruga.idade === 'adolescente') this.sisOcean.setEstagio('oceano-raso');
             if (this.playerTartaruga.idade === 'adulta') this.sisOcean.setEstagio('oceano-profundo');
             if (this.playerTartaruga.idade === 'idosa') this.sisOcean.setEstagio('recifes');
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        }
        
        // Sempre checa missões ao ganhar XP ou mudar idade
        this.gerenciadorMissoes.atualizarProgresso(this.playerTartaruga.idade, null);
<<<<<<< HEAD
    }

    atualizarUIInfo() {
        this.ui.xpLabel.textContent = this.playerTartaruga.experiencia;
=======

        // Desbloqueia figurinha por evolução
        if (this.playerTartaruga.idade === 'adolescente') this.album.desbloquearPorId('evolve_teen');
        if (this.playerTartaruga.idade === 'adulta') this.album.desbloquearPorId('evolve_adult');
    }

    iniciarGameLoop() {
        if(this.gameLoopInterval) clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = setInterval(() => {
            if(this.playerTartaruga && !this.ui.hubScreen.classList.contains('hidden')) {
                const morreu = this.playerTartaruga.cicloDeVida();
                
                // Acordou naturalmente
                if(!this.playerTartaruga.isDormindo && !this.ui.sleepOverlay.classList.contains('hidden')) {
                    this.ui.sleepOverlay.classList.add('hidden');
                    this.comportamento.falar("Bom dia! Estou cheia de energia!");
                }
                
                this.atualizarUIInfo();

                if(morreu) {
                    alert("Sua tartaruga precisou ser resgatada pelo Projeto Tamar!\nEla estava muito fraca ou com fome. Lembre-se de cuidar dela.");
                    this.playerTartaruga.saude = 50;
                    this.playerTartaruga.energia = 100;
                    this.playerTartaruga.fome = 0;
                    this.playerTartaruga.isDormindo = false;
                    this.ui.sleepOverlay.classList.add('hidden');
                }
            }
        }, 2000); // Roda a cada 2 segundos
    }

    atualizarUIInfo() {
        if(!this.playerTartaruga) return;
        this.ui.xpLabel.textContent = this.playerTartaruga.experiencia;
        
        if(this.ui.bars.health) this.ui.bars.health.style.width = `${this.playerTartaruga.saude}%`;
        if(this.ui.bars.hunger) this.ui.bars.hunger.style.width = `${100 - this.playerTartaruga.fome}%`;
        if(this.ui.bars.energy) this.ui.bars.energy.style.width = `${this.playerTartaruga.energia}%`;
        if(this.ui.bars.happiness) this.ui.bars.happiness.style.width = `${this.playerTartaruga.felicidade}%`;
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
    }

    iniciarMinigame(fase) {
        this.ui.missionsMenu.classList.add('hidden');
<<<<<<< HEAD
        this.ui.hubScreen.classList.remove('active');
        this.ui.minigameScreen.classList.add('active');
=======
        this.ui.hubScreen.classList.add('hidden');
        this.ui.minigameScreen.classList.remove('hidden');
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        this.ui.minigameTitle.textContent = `Fase ${fase}`;
        this.faseAtualEmAndamento = fase;

        if (fase === '1') {
            this.minigameAtual = new JogoNascimento(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        } else if (fase === '2') {
            this.minigameAtual = new JogoSelecao(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
<<<<<<< HEAD
=======
        } else if (fase === '3') {
            this.minigameAtual = new JogoRede(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        } else if (fase === '4') {
            this.minigameAtual = new JogoBarco(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        }
    }

    iniciarArcade(gameId) {
        this.ui.arcadeMenu.classList.add('hidden');
        this.ui.hubScreen.classList.add('hidden');
        this.ui.minigameScreen.classList.remove('hidden');
        this.ui.minigameTitle.textContent = `Arcade: ${gameId.toUpperCase()}`;
        this.faseAtualEmAndamento = gameId;
        
        if (gameId === 'flappy') {
            this.minigameAtual = new FlappyTurtle(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        } else if (gameId === 'memory') {
            this.minigameAtual = new MemoryGame(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        } else if (gameId === 'runner') {
            this.minigameAtual = new RunnerGame(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado), this.sisOcean);
            this.minigameAtual.iniciar();
        } else if (gameId === '2048') {
            this.minigameAtual = new Game2048(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado));
            this.minigameAtual.iniciar();
        } else if (gameId === 'jump') {
            this.minigameAtual = new BubbleJump(this.ui.minigameContainer, (resultado) => this.finalizarMinigame(resultado), this.sisOcean);
            this.minigameAtual.iniciar();
        } else {
            this.ui.minigameContainer.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:100%;"><h2 style="color:white;">Construindo em breve... 🔨</h2></div>';
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        }
    }

    finalizarMinigame(resultado) {
        alert(resultado.mensagem + `\nXP Ganho: ${resultado.xp}`);
        this.ganharXP(resultado.xp);
        
<<<<<<< HEAD
        // Atualiza missoes com a que acabou de passar
        this.gerenciadorMissoes.atualizarProgresso(this.playerTartaruga.idade, this.faseAtualEmAndamento);
        this.album.desbloquearPorId(this.faseAtualEmAndamento); // desbloqueia figurinha ao passar fase
        
        if (!resultado.vitoria && typeof resultado.danoAmbiental !== "undefined") {
            this.sisImpacto.modificarSaude(-10);
        }

        this.voltarParaHub();
=======
        // Aumenta felicidade apenas ao jogar minigames
        if(this.playerTartaruga) {
            this.playerTartaruga.ganharFelicidade(30);
        }
        
        // Desbloquear figurinha por performance no arcade
        if (this.faseAtualEmAndamento === 'flappy' && resultado.xp > 40) this.album.desbloquearPorId('flappy');
        if (this.faseAtualEmAndamento === 'memory' && resultado.vitoria) this.album.desbloquearPorId('memory');
        
        // Atualiza missoes com a que acabou de passar
        this.gerenciadorMissoes.atualizarProgresso(this.playerTartaruga.idade, this.faseAtualEmAndamento);
        this.album.desbloquearPorId(this.faseAtualEmAndamento); // desbloqueia figurinha ao passar fase (ID 1, 2, 3, etc)
                if (!resultado.vitoria && typeof resultado.danoAmbiental !== "undefined") {
             this.sisOcean.poluir(10);
         }
 
         this.voltarParaHub();
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
    }

    voltarParaHub() {
        if(this.minigameAtual) {
            this.minigameAtual.ativo = false;
        }
<<<<<<< HEAD
        this.ui.minigameScreen.classList.remove('active');
        this.ui.hubScreen.classList.add('active');
=======
        this.ui.minigameScreen.classList.add('hidden');
        this.ui.hubScreen.classList.remove('hidden');
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
        this.ui.minigameContainer.innerHTML = '';
        
        setTimeout(() => {
            this.comportamento.falar(this.sisEducacao.getCuriosidade());
        }, 1000);
    }
<<<<<<< HEAD
=======

    abrirEducativo() {
        this.ui.educativoMenu.classList.remove('hidden');
        // Reset para a primeira aba
        document.querySelectorAll('.edu-tab-btn').forEach(b => b.classList.remove('active'));
        const firstTab = document.querySelector('.edu-tab-btn[data-tab="especies"]');
        if(firstTab) firstTab.classList.add('active');
        this.renderizarConteudoEducativo('especies');
    }

    renderizarConteudoEducativo(categoria) {
        const data = this.sisEducacao.getConteudo(categoria);
        if(!data) return;

        let html = `
            <div class="edu-info-card ${categoria === 'especies' ? 'no-side-img' : ''}">
                ${categoria !== 'especies' ? `
                <div class="edu-img-side">
                    ${data.imagem.endsWith('.mp4') ? 
                        `<video src="${data.imagem}" autoplay muted loop style="width:100%; border-radius:20px;"></video>` :
                        `<img src="${data.imagem}" alt="${data.titulo}">`
                    }
                </div>
                ` : ''}
                <div class="edu-text-side">
                    <h3>${data.titulo}</h3>
                    <p>${data.texto}</p>
                    <div class="edu-grid ${categoria === 'especies' ? 'species-grid' : ''}">
                        ${data.itens.map(item => `
                            <div class="edu-subcard">
                                ${item.foto ? `<img src="${item.foto}" alt="${item.nome}" class="edu-subcard-img">` : ''}
                                <div class="edu-subcard-text">
                                    <h4>${item.nome}</h4>
                                    <p>${item.desc}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        this.ui.eduContent.innerHTML = html;

        // Desbloqueia figurinha por curiosidade educativa
        if (categoria === 'ameacas') this.album.desbloquearPorId('edu_threats');
        if (categoria === 'tamar') this.album.desbloquearPorId('edu_tamar');
    }
>>>>>>> ac35f340c660fb3285426aca9eeec2561995a406
}
