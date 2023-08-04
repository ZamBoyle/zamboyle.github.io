"use strict";
import { tomatoes } from "./db.js";

window.tomatoes = tomatoes;

tomatoes.forEach(tomato => {
    console.log(tomato);
});

let images = {};

function loadImage(tomato) {
    return new Promise(resolve => {
        if (images[tomato.id]) {
            resolve(images[tomato.id]);
        } else {
            let image = new Image();
            image.onload = function () {
                images[tomato.id] = image;
                resolve(image);
            };
            image.src = tomato.urlImage;
        }
    });
}

navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
        let cameraId;

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
        console.log("Une erreur s'est produite : " + error);
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

        canvas.drawImage(
            video,
            0,
            0,
            canvasElement.width,
            canvasElement.height
        );

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

            const tomato = tomatoes.find((tomato) => tomato.id == parseInt(code.data));
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
                    let rectWidth = (code.location.topRightCorner.x - code.location.topLeftCorner.x)*2;
                    let rectHeight = (code.location.bottomLeftCorner.y - code.location.topLeftCorner.y)*2;
                    // Position de l'image
                    let imageX = code.location.topLeftCorner.x;
                    let imageY = code.location.topLeftCorner.y - rectHeight;
                    // Dessin de l'image avec la largeur et la hauteur du rectangle
                    overlay.drawImage(image, imageX, imageY, rectWidth, rectHeight);
                })();


            }
            else {
                document.title = "Tomate non trouvée...";
            }
        }
    }

    requestAnimationFrame(tick);
}

tick();



function getTomatoInfo(id) {
    let tomate = tomatoes.find((tomate) => tomate.id == id);
    if (tomate) {
        let info = `<h2>${tomate.nom}</h2>`;
        info += `<img src='${tomate.urlImage}' class='border rounded' height='200px;'>`;
        info += '<div class="flex-grow-1 ms-3">';
        info += `<p class="font-weight-bold">${tomate.description}</p>`;
        info += "</div>";
        return info;
    } else {
        return "<h2>Tomate non trouvée...</h2>";
    }
}

tick();