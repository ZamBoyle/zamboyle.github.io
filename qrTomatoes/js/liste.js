import * as db from './db.js';
import * as planted  from './planted.js';

const tomatoesListDiv = document.getElementById('tomatoesList');

planted.getCurrentPlantedDetails().plants.forEach(x => {
    const tomato = db.getTomatoInfo(x);
    if (!tomato) return;
    const size = tomato.urlImage === '0_Unknown.jpg' ? 'style="width:50px"' : 'style="width:200px"';
    const tomatoCard = `
        <div class="col">
            <div class="card h-100 shadow">
                <img src="../img/${tomato.urlImage}" alt="${tomato.nom}" class="card-img-top" ${size}">
                <div class="card-body">
                    <h5 class="card-title">${tomato.nom}</h5>
                    <p class="card-text">${tomato.description}</p>
                </div>
            </div>
        </div>
    `;

    tomatoesListDiv.innerHTML += tomatoCard; 
});
