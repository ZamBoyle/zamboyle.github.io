import { CopyToClipboard } from './clipboard.mjs';
import { needCss } from './toggle-css.mjs';

export function createSourceCodeContainer() {
    var hr = document.createElement("hr");
    hr.style = "height:5px;background-color:black;margin-top: 50px";
    var h2 = document.createElement("h2");
    //h2.style = "margin-top: 0px";
    h2.innerHTML = "Code source de la page ";
    var cssButton = `
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 10px;
    margin-bottom: 10px;
    `; 
    var jsIsHidden = window.location.search.includes("hideJs=on");
    var cssIsDisabled = window.location.search.includes("css=off");
    var buttonCopy = createButtonCopy(cssButton);
    var buttonCss = createButtonCss(cssButton, cssIsDisabled);
        
    var container = document.createElement("div");
    container.id = "source-code-container";
    container.style = `border: 4px solid ;padding: 10px;font-weight: bold; font-size: 20px;`;
    
    var html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    html = html.replace(/<base[^>]*>/gi, "");
    html = html.replace(/<\/body>\n<\/html>/, "</body>\n\n</html>");
    html = jsIsHidden ? html.replace(/<script[\s\S]*?<\/script>/gi, "") : html;
    html = escapedHtml(html);
    
    container.innerHTML = `<pre id="codeId" style="word-break: break-all;white-space: pre-wrap;"><code class="language-html">${html}</code></pre>`;
    document.body.appendChild(hr);
    document.body.appendChild(h2);
    document.body.appendChild(buttonCopy);
    if(buttonCss){
      document.body.appendChild(buttonCss);
    }
    document.body.appendChild(container);
  }

function escapedHtml(html){
  return html
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");
}

function createButtonCopy(cssButton) {
  var button = document.createElement("button");
  button.id = "btnCopy";
  button.type = "button";
  button.style = cssButton;
  button.innerHTML = "Copier code";
  button.addEventListener("click", function () {
    CopyToClipboard("codeId");
    button.innerHTML = "Code Copié !";
  });
  return button;
}

function createButtonCss(cssButton, isDisabled){
  var button = document.createElement("button");
  button.id = "btnCss";
  button.type = "button";
  button.style = cssButton;
  button.style.marginLeft = "10px";
  button.innerHTML = isDisabled ? "Activer CSS": "Désactiver CSS";
  button.addEventListener("click", function () {
    if(button.innerHTML == "Désactiver CSS"){
      button.innerHTML = "Activer CSS";
      needCss(true);
    }
    else{
      button.innerHTML = "Désactiver CSS";
      needCss(false);
    }
  });  
  return button;
}