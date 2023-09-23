window.onload = function () {
  toggleCss();
  // Créez un div pour contenir le code source
  var h2 = document.createElement("h2");
  h2.innerHTML = "Code source de la page ";
  var cssButton = `
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;`;
  h2.innerHTML += `<button id="btnCopy" type="button" onclick="CopyToClipboard('codeId')" style="${cssButton}">Copier code</button>`;

  var container = document.createElement("div");
  container.id = "source-code-container";
  container.style = `border: 4px solid ;padding: 10px;font-weight: bold; font-size: 20px;`;

  // Obtenez le code source de la page
  var html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;

  // Remove the base tag from the html string
  html = html.replace(/<base[^>]*>/gi, "");
  html = html.replace(/<\/body>\n<\/html>/, "</body>\n\n</html>");

  // Retirez toutes les balises <script src="..."></script> du code source
  // Dans le but de ne pas perturber les étudiants.
  var cleanedHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  //html = html.replace(/<div id="source-code-container">[\s\S]*?<\/div>/, '');

  // Échappez les caractères spéciaux pour qu'ils soient affichés correctement
  var escapedHtml = cleanedHtml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  // Insérez le code source échappé dans le div
  container.innerHTML = `<pre id="codeId" style="word-break: break-all;white-space: pre-wrap;"><code class="language-html">${escapedHtml}</code></pre>`;
  document.body.appendChild(h2);
  document.body.appendChild(container);

    // Charger PrismJS et appliquer la coloration syntaxique une fois chargé
    loadCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css",
      function () {
        loadJS(
          "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
          applyPrism
        );
      }
    );
};

function CopyToClipboard(id) {
  var r = document.createRange();
  r.selectNode(document.getElementById(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  document.getElementById("btnCopy").innerHTML = "Code Copié !";
}

function toggleCss() {
  if (window.location.search.includes("css=off")) {
    // Créez une nouvelle balise <style>
    let style = document.createElement("style");
    style.innerHTML = ".no-css, .no-css * { all: initial !important; }";

    // Ajoutez la classe no-css à l'élément <body>
    document.body.classList.add("no-css");

    // Ajoutez la balise <style> au <head> du document
    document.head.appendChild(style);
  }
}

// Fonction pour charger un fichier CSS
function loadCSS(href, callback) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = href;
  link.onload = callback; // Appeler la fonction callback une fois le CSS chargé
  document.head.appendChild(link);
}

// Fonction pour charger un fichier JS
function loadJS(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = callback; // Appeler la fonction callback une fois le JS chargé
  document.head.appendChild(script);
}

// Fonction pour appliquer PrismJS à votre code
function applyPrism() {
  // Sélectionnez l'élément contenant votre code
  var codeElement = document.querySelector("pre code");

  // Appliquez PrismJS à l'élément de code
  Prism.highlightElement(codeElement);
}
