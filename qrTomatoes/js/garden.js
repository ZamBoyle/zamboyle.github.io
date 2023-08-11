"use strict";
import * as db from "./db.js";
import * as planted from "./planted.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const descriptionDiv = document.getElementById("description");

const tomatoImage = new Image();
tomatoImage.src = "../img/tomate.png";

let GAP;
let positions = [];
const currentPlantedDetails = planted.getCurrentPlantedDetails();
const currentPlants = currentPlantedDetails.plants;

const PLANTS_PER_ROW = currentPlantedDetails.plantsPerRow;
const MAX_CANVAS_WIDTH = currentPlantedDetails.showText? 400:1000;

let lastClickedTomatoIndex = -1; // initialiser à -1 pour indiquer qu'aucune tomate n'a encore été cliquée

function drawGarden() {
  positions = [];
  GAP = Math.min(
    Math.min(canvas.parentElement.offsetWidth, MAX_CANVAS_WIDTH) /
      (PLANTS_PER_ROW + 2),
    150
  );

  const TOTAL_TOMATOES = currentPlants.length; // Utilisez le tableau planted pour le nombre total de tomates
  const ACTUAL_ROWS = Math.ceil(TOTAL_TOMATOES / PLANTS_PER_ROW);

  canvas.width = (PLANTS_PER_ROW + 1) * GAP;
  canvas.height = (ACTUAL_ROWS + 1) * GAP;

  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = ACTUAL_ROWS - 1; row >= 0; row--) {
    for (let col = 0; col < PLANTS_PER_ROW; col++) {
      positions.push({ x: GAP * (col + 1), y: GAP * (row + 1) });
    }
  }

  currentPlants.forEach((tomatoId, index) => {
    const tomato = db.getTomatoInfo(tomatoId);
    if (!tomato) return; // Si on ne trouve pas de tomate correspondant à l'ID, on passe à la suivante

    if (index < positions.length) {
      const position = positions[index];
      const imageSize = GAP * 0.8;

      ctx.drawImage(
        tomatoImage,
        position.x - imageSize / 2,
        position.y - imageSize / 2,
        imageSize,
        imageSize
      );

      if (currentPlantedDetails.showText) {
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        const textWidth = ctx.measureText(tomato.id).width;
        const textHeight = 11;

        ctx.fillText(
          tomato.id,
          position.x - textWidth / 2,
          position.y + textHeight / 2
        );
      }
      if (index === lastClickedTomatoIndex) {
        roundRect(
          ctx,
          position.x - imageSize / 2,
          position.y - imageSize / 2,
          imageSize,
          imageSize,
          10
        ).stroke();
      }
    }
  });
}

drawGarden();
window.addEventListener("resize", drawGarden);

canvas.addEventListener("click", (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  const imageSize = GAP * 0.8;

  currentPlants.forEach((tomatoId, index) => {
    const tomato = db.getTomatoInfo(tomatoId);
    if (!tomato) return;

    if (index < positions.length) {
      const position = positions[index];
      const startX = position.x - imageSize / 2;
      const startY = position.y - imageSize / 2;
      const endX = startX + imageSize;
      const endY = startY + imageSize;

      if (x > startX && x < endX && y > startY && y < endY) {
        descriptionDiv.innerHTML = `
                    <h2>${tomato.nom}</h2>
                    <img class="border rounded-2" src="../img/${tomato.urlImage}" alt="${tomato.nom}" width="200">
                    <p>${tomato.description}</p>
                `;
        lastClickedTomatoIndex = index;
        drawGarden();
      }
    }
  });
});

function roundRect(ctx, x, y, width, height, radius) {
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  return ctx;
}

window.addEventListener("load", function () {
  drawGarden();
});
