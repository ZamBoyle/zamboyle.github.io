import { tomatoes } from './db.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const descriptionDiv = document.getElementById("description");

const PLANTS_PER_ROW = 5;  // nombre de plants par ligne
const GAP = 100;           // espace entre les plants sur le canvas

const TOTAL_TOMATOES = tomatoes.length;
const ACTUAL_ROWS = Math.ceil(TOTAL_TOMATOES / PLANTS_PER_ROW);

// Ajustements de la taille du canvas
canvas.width = (PLANTS_PER_ROW + 1) * GAP;
canvas.height = (ACTUAL_ROWS + 1) * GAP;

canvas.style.border = '2px solid #000';

ctx.fillStyle = 'green'; // Par exemple: 'blue', '#FF5733', 'rgba(255,0,0,0.5)', etc.
ctx.fillRect(0, 0, canvas.width, canvas.height);

const positions = [];

for (let row = ACTUAL_ROWS - 1; row >= 0; row--) {
    for (let col = 0; col < PLANTS_PER_ROW; col++) {
        positions.push({ x: GAP * (col + 1), y: GAP * (row + 1) });
    }
}

tomatoes.forEach((tomato, index) => {
    if (index < positions.length) {
        const position = positions[index];
        ctx.beginPath();
        ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.font = "15px Arial";
        ctx.fillText(tomato.id, position.x - 5, position.y - 15); // décalage pour le numéro au-dessus du point
        ctx.closePath();
    }
});

canvas.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    tomatoes.forEach((tomato, index) => {
        if (index < positions.length) {
            const position = positions[index];
            const distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2));

            if (distance < 10) {
                descriptionDiv.innerHTML = `
                    <h2>${tomato.nom}</h2>
                    <img src="./img/${tomato.urlImage}" alt="${tomato.nom}" width="200">
                    <p>${tomato.description}</p>
                `;
            }
        }
    });
});

/*import { tomatoes } from './db.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const descriptionDiv = document.getElementById("description");

const PLANTS_PER_ROW = 5;  // nombre de plants par ligne
const GAP = 100;           // espace entre les plants sur le canvas

const TOTAL_TOMATOES = tomatoes.length;
const ACTUAL_ROWS = Math.ceil(TOTAL_TOMATOES / PLANTS_PER_ROW);

// Ajustements de la taille du canvas
canvas.width = (PLANTS_PER_ROW + 1) * GAP;
canvas.height = (ACTUAL_ROWS + 1) * GAP;

canvas.style.border = '2px solid #000';

const positions = [];

for (let row = ACTUAL_ROWS - 1; row >= 0; row--) {
    for (let col = 0; col < PLANTS_PER_ROW; col++) {
        positions.push({ x: GAP * (col + 1), y: GAP * (row + 1) });
    }
}

tomatoes.forEach((tomato, index) => {
    if (index < positions.length) {
        const position = positions[index];
        ctx.beginPath();
        ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.font = "15px Arial";
        ctx.fillText(tomato.id, position.x - 5, position.y - 15); // décalage pour le numéro au-dessus du point
        ctx.closePath();
    }
});

canvas.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    tomatoes.forEach((tomato, index) => {
        if (index < positions.length) {
            const position = positions[index];
            const distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2));

            if (distance < 10) {
                descriptionDiv.innerHTML = `
                    <h2>${tomato.nom}</h2>
                    <img src="./images/${tomato.urlImage}" alt="${tomato.nom}" width="200">
                    <p>${tomato.description}</p>
                `;
            }
        }
    });
});
*/