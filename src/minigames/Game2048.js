import { Minigame } from './Minigame.js';

export class Game2048 extends Minigame {
    constructor(container, onComplete) {
        super(container, onComplete);
        this.size = 4;
        this.grid = [];
        this.score = 0;
        this.highestVal = 0;
        this.tileIdCounter = 0;
        
        this.handleInput = this.handleInput.bind(this);
    }

    iniciar() {
        this.ativo = true;
        this.container.innerHTML = `
            <!-- Fundo Padronizado Arcade -->
            <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; background-image: url('/fundomemoria.png'); background-size: cover; background-position: center; z-index: 0; filter: brightness(0.6);"></div>
            
            <div class="game-2048-container" style="position: relative; z-index: 10;">
                <div class="runner-score-display" style="position:relative; margin-bottom:20px;">Pontos: <span id="score-2048">0</span></div>
                <div class="grid-2048" id="grid-2048">
                    ${Array(16).fill('<div class="cell-2048"></div>').join('')}
                    <div id="tiles-container"></div>
                </div>
                <p style="color:white; margin-top:20px; text-align:center; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Use as Setas Direcionais para combinar iguais!</p>
            </div>
        `;
        
        this.tilesContainer = document.getElementById('tiles-container');
        this.scoreEl = document.getElementById('score-2048');
        
        // Inicializa a matriz com nulos
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = null;
            }
        }
        
        this.addRandomTile();
        this.addRandomTile();
        
        window.addEventListener('keydown', this.handleInput);
        this.loop();
    }

    addRandomTile() {
        let emptyCells = [];
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === null) {
                    emptyCells.push({r, c});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            let rand = Math.floor(Math.random() * emptyCells.length);
            let cell = emptyCells[rand];
            let val = Math.random() < 0.9 ? 2 : 4;
            
            // Criar DOM Wrapper (para a transição de slide)
            let wrapper = document.createElement('div');
            wrapper.className = 'tile-2048-wrapper';
            
            // Criar Inner Tile (para a animação de pop e cor)
            let inner = document.createElement('div');
            inner.className = `tile-2048 val-${val} tile-new`;
            inner.textContent = val;
            
            wrapper.appendChild(inner);
            this.tilesContainer.appendChild(wrapper);
            
            let tile = {
                id: this.tileIdCounter++,
                val: val,
                elWrapper: wrapper,
                elInner: inner
            };
            
            this.grid[cell.r][cell.c] = tile;
            this.updateTilePosition(tile, cell.r, cell.c);
            
            // Remove a classe de animação new após concluída para não repetir
            setTimeout(() => {
                if(tile.elInner) tile.elInner.classList.remove('tile-new');
            }, 200);
        }
    }

    updateTilePosition(tile, r, c) {
        const padding = 10;
        const gap = 10;
        const cellSize = (350 - (padding * 2) - (gap * 3)) / 4; 
        
        let left = padding + c * (cellSize + gap);
        let top = padding + r * (cellSize + gap);
        
        tile.elWrapper.style.transform = `translate(${left}px, ${top}px)`;
    }

    handleInput(e) {
        if (!this.ativo) return;
        
        // Prevenir scroll default da página
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
        
        let moved = false;
        
        // Direções de deslocamento [row, col]
        if (e.code === 'ArrowUp') moved = this.move(-1, 0);
        else if (e.code === 'ArrowDown') moved = this.move(1, 0);
        else if (e.code === 'ArrowLeft') moved = this.move(0, -1);
        else if (e.code === 'ArrowRight') moved = this.move(0, 1);
        
        if (moved) {
            // Aguarda a animação de transição acabar para adicionar nova peça
            setTimeout(() => {
                this.addRandomTile();
                if (this.isGameOver()) {
                    this.gameOver();
                }
            }, 150); 
        }
    }

    move(rDir, cDir) {
        let moved = false;
        
        // Determina a ordem de iteração para que as peças da "frente" se movam primeiro
        let rStart = rDir === 1 ? 3 : 0;
        let rStep = rDir === 1 ? -1 : 1;
        let rEnd = rDir === 1 ? -1 : 4;
        
        let cStart = cDir === 1 ? 3 : 0;
        let cStep = cDir === 1 ? -1 : 1;
        let cEnd = cDir === 1 ? -1 : 4;
        
        for (let r = rStart; r !== rEnd; r += rStep) {
            for (let c = cStart; c !== cEnd; c += cStep) {
                let tile = this.grid[r][c];
                
                if (tile !== null) {
                    let currR = r;
                    let currC = c;
                    
                    // Raycast para encontrar onde a peça vai parar
                    while (true) {
                        let nextR = currR + rDir;
                        let nextC = currC + cDir;
                        
                        // Bateu na parede?
                        if (nextR < 0 || nextR >= 4 || nextC < 0 || nextC >= 4) break;
                        
                        let nextTile = this.grid[nextR][nextC];
                        
                        // Célula vazia, pode avançar
                        if (nextTile === null) {
                            currR = nextR;
                            currC = nextC;
                        } 
                        // Bateu em uma peça do mesmo valor que ainda não "evoluiu" neste turno
                        else if (nextTile.val === tile.val && !nextTile.merged) {
                            currR = nextR;
                            currC = nextC;
                            tile.mergedInto = nextTile; // Marca que este tile vai ser absorvido pelo nextTile
                            break;
                        } 
                        // Peça diferente ou já mesclada
                        else {
                            break;
                        }
                    }
                    
                    // Se a peça realmente mudou de lugar
                    if (currR !== r || currC !== c) {
                        this.grid[r][c] = null; // Libera o espaço antigo
                        
                        if (tile.mergedInto) {
                            // Animação de colisão (manda o wrapper para cima da outra peça)
                            this.updateTilePosition(tile, currR, currC);
                            tile.elWrapper.style.zIndex = 5; 
                            
                            let target = tile.mergedInto;
                            target.merged = true;
                            
                            // Após a animação (0.15s), deleta a velha e atualiza a nova
                            setTimeout(() => {
                                target.val *= 2;
                                target.elInner.className = `tile-2048 val-${target.val} tile-merged`;
                                target.elInner.textContent = target.val;
                                tile.elWrapper.remove(); // Adeus peça velha
                                
                                this.score += target.val;
                                this.scoreEl.textContent = this.score;
                                if (target.val > this.highestVal) this.highestVal = target.val;
                                
                                setTimeout(() => target.elInner.classList.remove('tile-merged'), 200);
                            }, 150);
                            
                        } else {
                            // Apenas um slide simples
                            this.grid[currR][currC] = tile;
                            this.updateTilePosition(tile, currR, currC);
                        }
                        moved = true;
                    }
                }
            }
        }
        
        // Reseta o estado "merged" no final do turno
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (this.grid[r][c]) {
                    this.grid[r][c].merged = false;
                }
            }
        }
        
        return moved;
    }

    isGameOver() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (this.grid[r][c] === null) return false;
            }
        }
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                let tile = this.grid[r][c];
                if (c < 3 && this.grid[r][c+1] && tile.val === this.grid[r][c+1].val) return false;
                if (r < 3 && this.grid[r+1][c] && tile.val === this.grid[r+1][c].val) return false;
            }
        }
        return true;
    }

    gameOver() {
        if (!this.ativo) return;
        this.ativo = false;
        window.removeEventListener('keydown', this.handleInput);
        
        setTimeout(() => {
            this.finalizar({
                vitoria: false,
                xp: Math.floor(this.score / 60),
                mensagem: `Fim de Jogo!\nVocê fez ${this.score} pontos e chegou na peça: ${this.highestVal}`
            });
        }, 1500);
    }
}
