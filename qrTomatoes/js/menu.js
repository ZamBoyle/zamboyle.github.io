document.addEventListener("DOMContentLoaded", function() {
    const pages = [
        { name: "Acceuil", url: "/qrTomatoes/index.html" },
        { name: "QR Code", url: "/qrTomatoes/pages/qrtomatoes.html" },
        { name: "Jardin", url: "/qrTomatoes/pages/garden.html" },
        { name: "Liste", url: "/qrTomatoes/pages/liste.html" }
    ];

    const currentPath = window.location.pathname.split('/').pop();

    const menuContainer = document.getElementById("menuContainer");

    const nav = document.createElement("nav");
    nav.className = "navbar navbar-expand-lg navbar-dark bg-dark";

    const divContainer = document.createElement("div");
    divContainer.className = "container";

    const aBrand = document.createElement("a");
    aBrand.className = "navbar-brand";
    aBrand.href = "#";
    aBrand.textContent = "Mes Tomates";

    const buttonToggler = document.createElement("button");
    buttonToggler.className = "navbar-toggler";
    buttonToggler.type = "button";
    buttonToggler.setAttribute("data-bs-toggle", "collapse");
    buttonToggler.setAttribute("data-bs-target", "#navbarNav");
    buttonToggler.setAttribute("aria-controls", "navbarNav");
    buttonToggler.setAttribute("aria-expanded", "false");
    buttonToggler.setAttribute("aria-label", "Toggle navigation");

    const spanTogglerIcon = document.createElement("span");
    spanTogglerIcon.className = "navbar-toggler-icon";

    const divCollapse = document.createElement("div");
    divCollapse.className = "collapse navbar-collapse";
    divCollapse.id = "navbarNav";

    const ul = document.createElement("ul");
    ul.className = "navbar-nav";

    for (const page of pages) {
        const li = document.createElement("li");
        li.className = "nav-item";

        const a = document.createElement("a");
        a.className = "nav-link";
        a.href = page.url;
        a.textContent = page.name;

        if (currentPath === page.url) {
            a.classList.add("active");
        }

        li.appendChild(a);
        ul.appendChild(li);
    }

    buttonToggler.appendChild(spanTogglerIcon);
    divCollapse.appendChild(ul);

    divContainer.appendChild(aBrand);
    divContainer.appendChild(buttonToggler);
    divContainer.appendChild(divCollapse);

    nav.appendChild(divContainer);
    menuContainer.appendChild(nav);
});
