"use strict";
import * as db from './db.js';
const currentDate = new Date().getTime();

let images = {};

function loadImage(tomato) {
  return new Promise((resolve) => {
    if (images[tomato.id]) {
      resolve(images[tomato.id]);
    } else {
      let image = new Image();
      image.onload = function () {
        images[tomato.id] = image;
        resolve(image);
      };
      image.src = "../img/" + tomato.urlImage;
    }
  });
}
const body = document.getElementsByTagName("h1")[0];

navigator.mediaDevices
  .enumerateDevices()
  .then(function (devices) {
    let cameraId;

    // Trouver l'id de la caméra arrière
    devices.forEach(function (device) {
      if (device.kind === "videoinput" && device.label.includes("back")) {
        cameraId = device.deviceId;
      }
    });

    // Si on  n'a pas trouvé la caméra arrière, on utilise simplement la première caméra vidéo
    if (!cameraId && devices.length > 0) {
      cameraId = devices[0].deviceId;
    }

    // Demander l'accès à la caméra
    return navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: cameraId ? { exact: cameraId } : undefined,
      },
    });
  })
  .then(function (stream) {
    // Utiliser le flux de la caméra comme avant
    const videoElement = document.getElementById("camera");
    videoElement.srcObject = stream;
  })
  .catch(function (error) {
    if (error.name === "OverconstrainedError") {
      // Tenter d'accéder à la caméra avec des contraintes moins restrictives
      return navigator.mediaDevices.getUserMedia({ video: true });
    } else {
      console.log("Une erreur s'est produite : " + error);
      //teste toutes les erreurs possible avec error.name
      switch (error.name) {
        case "NotFoundError":
          body.innerHTML = "Aucune caméra n'a été trouvée";
          break;
        case "NotAllowedError":
          body.innerHTML = "Vous n'avez pas donné la permission d'accéder à la caméra";
          break;
        case "NotReadableError":
          body.innerHTML = "Impossible d'accéder à la caméra";
          break;
        case "SecurityError":
          body.innerHTML = "Une erreur de sécurité s'est produite";
          break;
        case "TypeError":
          body.innerHTML = "Une erreur s'est produite : " + error;
          break;
        case "AbortError":
          body.innerHTML = "Une erreur s'est produite : " + error;
          break;
        case "UnknownError":
          body.innerHTML = "Une erreur s'est produite : " + error;
          break;
        default:
          body.innerHTML = "Une erreur s'est produite : " + error;
          break;
      }
    }
  });

const video = document.getElementById("camera");
const canvasElement = document.getElementById("canvas");
const canvas = canvasElement.getContext("2d");
const resultElement = document.getElementById("result");

const overlayElement = document.getElementById("overlay");
const overlay = overlayElement.getContext("2d");

function tick() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;

    overlayElement.height = video.videoHeight;
    overlayElement.width = video.videoWidth;

    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

    const imageData = canvas.getImageData(
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    overlay.clearRect(0, 0, overlayElement.width, overlayElement.height);

    if (code) {
      resultElement.innerHTML = getTomatoInfo(parseInt(code.data));

      // Draw box
      overlay.beginPath();
      overlay.moveTo(
        code.location.topLeftCorner.x,
        code.location.topLeftCorner.y
      );
      overlay.lineTo(
        code.location.topRightCorner.x,
        code.location.topRightCorner.y
      );
      overlay.lineTo(
        code.location.bottomRightCorner.x,
        code.location.bottomRightCorner.y
      );
      overlay.lineTo(
        code.location.bottomLeftCorner.x,
        code.location.bottomLeftCorner.y
      );
      overlay.lineTo(
        code.location.topLeftCorner.x,
        code.location.topLeftCorner.y
      );
      overlay.lineWidth = 10;
      overlay.strokeStyle = "red";
      overlay.stroke();

      const tomato = db.getTomatoInfo(parseInt(code.data));
      /*tomatoes.find(
        (tomato) => tomato.id == parseInt(code.data)
      );*/
      if (tomato) {
        // Création d'une fonction asynchrone à l'intérieur de tick
        (async function () {
          const image = await loadImage(tomato);
          // Calcul de la largeur et de la hauteur du rectangle
          let rectWidth =
            (code.location.topRightCorner.x - code.location.topLeftCorner.x) *
            2;
          let rectHeight =
            (code.location.bottomLeftCorner.y - code.location.topLeftCorner.y) *
            2;
          // Position de l'image
          let imageX = code.location.topLeftCorner.x;
          let imageY = code.location.topLeftCorner.y - rectHeight;
          // Dessin de l'image avec la largeur et la hauteur du rectangle
          overlay.drawImage(image, imageX, imageY, rectWidth, rectHeight);

          // Dessin du nom de la tomate
          const padding = 5;  // Espacement autour du texte
          let textSize = 20;  // Taille du texte maximale
          
          overlay.font = `${textSize}px Arial`;
          let textWidth = overlay.measureText(tomato.nom).width;
          
          // Ajustez la taille du texte jusqu'à ce qu'il s'adapte à la largeur du rectangle
          while (textWidth + 2 * padding > rectWidth && textSize > 0) {
              textSize -= 1;  // Réduisez la taille du texte
              overlay.font = `${textSize}px Arial`;
              textWidth = overlay.measureText(tomato.nom).width;
          }
          
          // Dessiner un fond blanc derrière le texte
          overlay.fillStyle = "white";
          overlay.fillRect(imageX, imageY - textSize - 2 * padding, rectWidth, textSize + 2 * padding);
          
          // Dessiner le nom de la tomate en noir
          overlay.fillStyle = "black";
          overlay.fillText(tomato.nom, imageX + (rectWidth - textWidth) / 2, imageY - padding);
        })();
      } else {
        document.title = "Tomate non trouvée...";
      }
    }
  }
  requestAnimationFrame(tick);
}

function getTomatoInfo(id) {
  let tomate = db.getTomatoInfo(id); //tomatoes.find((tomate) => tomate.id == id);
  if (tomate) {
    let info = `<h2 class="text-white">${tomate.nom}</h2>`;
    info += `<img src='../img/${tomate.urlImage}' class='border rounded' height='200px;'>`;
    info += '<div class="flex-grow-1 ms-3">';
    info += `<p class=" text-white font-weight-bold">${tomate.description}</p>`;
    info += "<h3 class='text-white'>Avis</h3>";
    info += "<ul>";
    tomate.avis.forEach((avis) => {
      info += `<li class="text-white">${avis.Auteur}(${avis.date}) :${avis.avis}</li>`;
    });
    info += "</div>";
    return info;
  } else {
    return "<h2>Tomate non trouvée...</h2>";
  }
}
tick();
//});
