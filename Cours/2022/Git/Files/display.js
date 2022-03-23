"use strict";
/**
 * Affiche une chaîne de caractères dans la page web
 * @param {string} str - Chaîne de caractères à afficher
 * @param {string} id - id de l'element où str sera affiché. Par défaut, c'est "display". Si l'id n'existe pas, l'element sera créé.
 * @param {boolean} append - indique si str doit être ajouté à l'innerHTML existant. Par défaut, oui.
 */
 function display(str, id = "display", append = true) {
    str= str.replace(/\n/ig, "<br>");    
    let display = document.getElementById(id);
    if (!display) {
        display = document.createElement("span");
        display.id = id;
        document.body.appendChild(display);
    }
    if (append) display.innerHTML += `<p> ${str} </p>`;
    else display.innerHTML = `<p> ${str} </p>`;
}