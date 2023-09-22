window.onload = function() {
  if (window.location.search.includes('css=0')) {
    // Sélectionnez toutes les balises <link> de la page
    let links = document.getElementsByTagName('link');
    
    // Parcourez la liste des balises <link> et désactivez-les une par une
    for (let link of links) {
        if (link.rel === 'stylesheet') {
            link.disabled = true;
        }
    }
}
    // Créez un div pour contenir le code source
    var h2 = document.createElement('h2');
    h2.innerHTML = 'Code source de la page';

    var container = document.createElement('div');
    container.id = 'source-code-container';
    container.style = `border: 4px solid ;padding: 10px;font-weight: bold; font-size: 20px;`;

    // Obtenez le code source de la page
    var html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;

    // Remove the base tag from the html string
    html = html.replace(/<base[^>]*>/gi, '');
    html = html.replace(/<\/body>\n<\/html>/, '</body>\n\n</html>');
        
    // Retirez toutes les balises <script src="..."></script> du code source
    // Dans le but de ne pas perturber les étudiants.
    var cleanedHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');
    //html = html.replace(/<div id="source-code-container">[\s\S]*?<\/div>/, '');
    
    // Échappez les caractères spéciaux pour qu'ils soient affichés correctement
    var escapedHtml = cleanedHtml
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    
    // Insérez le code source échappé dans le div
    container.innerHTML = `<pre style="word-break: break-all;white-space: pre-wrap;">${escapedHtml}</pre>`;
    document.body.appendChild(h2);
    document.body.appendChild(container);



  }