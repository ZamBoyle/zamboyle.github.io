window.onload = function() {
    // Créez un div pour contenir le code source
    var container = document.createElement('div');
    container.id = 'source-code-container';
    container.style = `border: 4px solid ;padding: 10px;font-weight: bold; font-size: 20px;`;
//    document.body.appendChild(container);

    // Obtenez le code source de la page
    var html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;

    //html = html.replace(/>/g, '>\n');

    // Remove the base tag from the html string
    html = html.replace(/<base[^>]*>/gi, '');

    
    // Retirez toutes les balises <script src="..."></script> du code source
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
    document.body.appendChild(container);
  }