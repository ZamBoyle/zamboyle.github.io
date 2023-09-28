export async function loadPrism() {
    loadCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css",
      function () {
        loadJS(
          "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",
          applyPrism
        );
      }
    );
  }
  
  function loadCSS(href, callback) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = href;
    link.onload = callback;
    document.head.appendChild(link);
  }
  
  function loadJS(src, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  function applyPrism() {
    var codeElement = document.querySelector("pre code");
    Prism.highlightElement(codeElement);
  }
  