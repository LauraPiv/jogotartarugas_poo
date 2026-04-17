import { Figurinha } from './Figurinha.js';

export class Album {
    constructor(elementUI) {
        this.container = elementUI;
        this.figurinhas = [
            new Figurinha(1, "Tartaruga Verde", "Herbívora, adora algas", "🐢", "especie"),
            new Figurinha(2, "Plástico", "Vilão dos mares", "🛍️", "ameaca"),
            new Figurinha(3, "Água-viva", "Parece plástico, mas é alimento!", "🪼", "ambiente")
        ];
        
        // Simular que a primeira já vem desbloqueada
        this.figurinhas[0].desbloquear();
    }

    renderizar() {
        this.container.innerHTML = '';
        this.figurinhas.forEach(fig => {
            const el = document.createElement('div');
            el.className = `figurinha-card ${fig.desbloqueada ? '' : 'locked'}`;
            el.innerHTML = `
                <div class="figurinha-img" style="display:flex; justify-content:center; align-items:center; font-size:40px">${fig.imgEmoji}</div>
                <h4>${fig.nome}</h4>
            `;
            this.container.appendChild(el);
        });
    }

    desbloquearPorId(id) {
        const fig = this.figurinhas.find(f => f.id === id);
        if (fig) {
            fig.desbloquear();
            this.renderizar();
        }
    }
}
