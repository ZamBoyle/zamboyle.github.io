"use strict";
import { tomatoes } from "./db.js";
const currentDate = new Date().getTime();

// Utilisez import() pour importer dynamiquement db.js avec un paramètre de cache-busting
//import(`./db.js?${currentDate}`).then((module) => {
//  const { tomatoes } = module;

tomatoes.forEach((tomato) => {
  console.log(tomato);
});

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
      image.src = "img/" + tomato.urlImage;
    }
  });
}
const body = document.getElementsByTagName("h1")[0];
//const nl = "<br>";
//body.innerHTML = "1. Begin" + nl;
/*
if (navigator && navigator.mediaDevices){// && navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices
        .enumerateDevices()
        .then(function (devices) {
            body.innerHTML += "2. enumerateDevices" + nl;
            const hasCamera = devices.some(device => device.kind === "videoinput");
            if (hasCamera) {
                body.innerHTML += "3. Caméra détectée!" + nl;
            } else {
                body.innerHTML += "3. Aucune caméra trouvée." + nl;
            }
        })
        .catch(function (error) {
            body.innerHTML += "3. Une erreur s'est produite : " + error + nl;
        });
} else {
    body.innerHTML += "2. Pas de navigator" + nl;
}
body.innerHTML += "4. End" + nl;
*/
//body.innerHTML = navigator.mediaDevices ? "2. navigator.mediaDevices" + nl : "2. Pas de navigator" + nl;
navigator.mediaDevices
  .enumerateDevices()
  .then(function (devices) {
    let cameraId;
    //body.innerHTML += devices.length + " caméras trouvées"+nl;

    // Trouvez l'id de la caméra arrière
    devices.forEach(function (device) {
      if (device.kind === "videoinput" && device.label.includes("back")) {
        cameraId = device.deviceId;
      }
    });

    // Si vous n'avez pas trouvé la caméra arrière, utilisez simplement la première caméra vidéo
    if (!cameraId && devices.length > 0) {
      cameraId = devices[0].deviceId;
    }

    // Demandez l'accès à la caméra
    return navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: cameraId ? { exact: cameraId } : undefined,
      },
    });
  })
  .then(function (stream) {
    // Utilisez le flux de la caméra comme avant
    const videoElement = document.getElementById("camera");
    videoElement.srcObject = stream;
  })
  .catch(function (error) {
    if (error.name === "OverconstrainedError") {
      // Tentez d'accéder à la caméra avec des contraintes moins restrictives
      return navigator.mediaDevices.getUserMedia({ video: true });
    } else {
      console.log("Une erreur s'est produite : " + error);
      document.getElementsByTagName("body")[0].innerHTML =
        "Une erreur s'est produite : " + error;
    }
  });

const video = document.getElementById("camera");
const canvasElement = document.getElementById("canvas");
const canvas = canvasElement.getContext("2d");
const resultElement = document.getElementById("result");

const overlayElement = document.getElementById("overlay");
const overlay = overlayElement.getContext("2d");
/* 
         function tick() {
              if (video.readyState === video.HAVE_ENOUGH_DATA) {
                  canvasElement.hidden = false;
  
                  canvasElement.height = video.videoHeight;
                  canvasElement.width = video.videoWidth;
                  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
                  const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                  const code = jsQR(imageData.data, imageData.width, imageData.height, {
                      inversionAttempts: 'dontInvert',
                  });
  
                  if (code) {
                      resultElement.innerHTML = getTomatoInfo(code.data);
                  }
              }
  
              requestAnimationFrame(tick);
          }  */

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
      resultElement.innerHTML = getTomatoInfo(code.data);

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

      const tomato = tomatoes.find(
        (tomato) => tomato.id == parseInt(code.data)
      );
      if (tomato) {
        /*                         let h1 = document.querySelector('h1');
                                        let p = document.createElement('p');
                                        p.innerHTML = tomato.urlImage;
                                        h1.appendChild(p); */
        // On charge l'image de la tomate
        /*                         let image = new Image();
                                        image.onload = function () {
                                            // Une fois l'image chargée, on la dessine au-dessus du rectangle
                                            let imageX = code.location.topLeftCorner.x;
                                            let imageY = code.location.topLeftCorner.y - image.height; // On dessine l'image juste au-dessus du rectangle
                                            overlay.drawImage(image, imageX, imageY, image.width, image.height);
                                        };
                                        image.src = tomato.urlImage; // On suppose que imageUrl est une propriété de l'objet tomato     */
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
  let tomate = tomatoes.find((tomate) => tomate.id == id);
  if (tomate) {
    let info = `<h2>${tomate.nom}</h2>`;
    info += `<img src='img/${tomate.urlImage}' class='border rounded' height='200px;'>`;
    info += '<div class="flex-grow-1 ms-3">';
    info += `<p class="font-weight-bold">${tomate.description}</p>`;
    info += "</div>";
    return info;
  } else {
    return "<h2>Tomate non trouvée...</h2>";
  }
}
tick();
//});
