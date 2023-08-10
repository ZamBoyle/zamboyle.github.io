import * as db from './db.js';
import { planted } from './planted.js';

const tomatoesListDiv = document.getElementById('tomatoesList');

planted.forEach(x => {
    const tomato = db.getTomatoInfo(x);
    if (!tomato) return;
    const tomatoCard = `
        <div class="col">
            <div class="card h-100 shadow">
                <img src="../img/${tomato.urlImage}" alt="${tomato.nom}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${tomato.nom}</h5>
                    <p class="card-text">${tomato.description.length > 80 ? tomato.description.substring(0, 77) + '...' : tomato.description}</p>
                </div>
            </div>
        </div>
    `;

    tomatoesListDiv.innerHTML += tomatoCard; 
});
