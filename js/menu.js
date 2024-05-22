document.addEventListener('DOMContentLoaded', () => {
    var menuHtml = `
        <nav class="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">BlindCode</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">Menu
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav nav-underline me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link ${isActive('/index.html', '/') ? 'active" aria-current="page"' : '"'} href="${!isActive('/index.html', '/') ? '/index.html' : '#'}">Accueil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${isActive('/pages/horaire.html') ? 'active" aria-current="page"' : '"'} href="${!isActive('/pages/horaire.html') ? '/pages/horaire.html' : '#'}">Horaire des cours</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${isActive('/pages/zoom.html') ? 'active" aria-current="page"' : '"'} href="${!isActive('/pages/zoom.html') ? '/pages/zoom.html' : '#'}">Zoom</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link rounded ${isActive('/pages/depots.html') ? 'active" aria-current="page"' : '"'} href="${!isActive('/pages/depots.html') ? '/pages/depots.html' : '#'}">Liste des dépôts Github</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link rounded ${isActive('/pages/chatbots.html') ? 'active" aria-current="page"' : '"'} href="${!isActive('/pages/chatbots.html') ? '/pages/chatbots.html' : '#'}">Liste de chatbots</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link rounded " target="_blank" noreferrer
                         href="https://kraktu.github.io/Blindcode/output/html/tutoriels/accueil-tutoriels.html">Cours de Philip</a>
                        </li>                        
                        <li class="nav-item">
                            <a class="nav-link rounded ${isActive('/pages/chanson.html') ? 'active" aria-current="page"' : '"'} href="${!isActive('/pages/chanson.html') ? '/pages/chanson.html' : '#'}">🎵Il code l'avenir🎵</a>
                        </li>                        
                    </ul>
                </div>
            </div>
        </nav>
    `;
    footerHtml = `<footer class="footer mt-auto py-3 bg-dark fixed-bottom" data-bs-theme="dark">
    <div class="container">
      <span class="text-white">&copy; 2023&nbsp;<img src="/assets/img/Logo_Eqla.png" height="25">&nbsp;Tous droits réservés.</span>
    </div>
  </footer>`;

    var header = document.querySelector('header'); // Ou un autre élément dans lequel vous souhaitez insérer le menu
    var main = document.querySelector('main'); // Ou un autre élément dans lequel vous souhaitez insérer le menu
    if (header) {
        header.insertAdjacentHTML('beforeend', menuHtml);
    }
    if (main) {
        main.insertAdjacentHTML('afterend', footerHtml);
    }
});

function isActive(...paths) {
    return paths.includes(window.location.pathname);
}
