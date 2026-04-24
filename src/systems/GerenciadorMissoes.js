class Fase {
    constructor(id, titulo, descricao, idadeMinima, statusRequisito) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.idadeMinima = idadeMinima;
        this.status = 'locked'; // locked, disponivel, completed
        this.requisito = statusRequisito; 
    }
}

export class GerenciadorMissoes {
    constructor(containerElement, onIniciarFaseCallback) {
        this.container = containerElement;
        this.onIniciarFase = onIniciarFaseCallback;
        
        // Inicializa fases baseadas no ciclo de vida
        this.fases = [
            new Fase('1', 'Fase 1: Nascimento', 'Proteja os filhotes das gaivotas até o mar!', 'filhote', null),
            new Fase('2', 'Fase 2: Sobrevivência', 'Coma águas-vivas e evite o lixo!', 'filhote', '1'),
            new Fase('3', 'Fase 3: Pesca Fantasma', 'Escape das redes de pesca perdidas.', 'adolescente', '2'),
            new Fase('4', 'Fase 4: Poluição Oculta', 'Limpe o oceano profundo e os recifes.', 'adulta', '3')
        ];
    }

    atualizarProgresso(idadeAtual, faseConcluidaId) {
        if (faseConcluidaId) {
            const f = this.fases.find(f => f.id === faseConcluidaId);
            if (f) f.status = 'completed';
        }

        // Verifica desbloqueios
        const idades = ['filhote', 'adolescente', 'adulta', 'idosa'];
        const indiceIdadeAtual = idades.indexOf(idadeAtual);

        this.fases.forEach(fase => {
            if (fase.status === 'locked') {
                const indiceRequisito = idades.indexOf(fase.idadeMinima);
                const nivelIdadeAtingido = indiceIdadeAtual >= indiceRequisito;
                
                let faseAnteriorConcluida = true;
                if (fase.requisito) {
                    const req = this.fases.find(f => f.id === fase.requisito);
                    if (req && req.status !== 'completed') faseAnteriorConcluida = false;
                }

                if (nivelIdadeAtingido && faseAnteriorConcluida) {
                    fase.status = 'disponivel';
                }
            }
        });

        this.renderizar();
    }

    renderizar() {
        this.container.innerHTML = '';
        this.fases.forEach(fase => {
            const btn = document.createElement('button');
            btn.className = `mission-btn ${fase.status}`;
            
            // Ícone removido

            btn.innerHTML = `
                <h3>${fase.titulo}</h3>
                <p>${fase.descricao}</p>
                <small style="opacity: 0.7;">Requer: ${fase.idadeMinima}</small>
            `;

            if (fase.status === 'disponivel') {
                btn.addEventListener('click', () => this.onIniciarFase(fase.id));
            } else if (fase.status === 'locked') {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            } else {
                // completed
                btn.style.borderColor = 'green';
                btn.addEventListener('click', () => this.onIniciarFase(fase.id)); // Permite jogar de novo
            }

            this.container.appendChild(btn);
        });
    }
}
