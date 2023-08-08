document.addEventListener("DOMContentLoaded", function() {
  let navbar = document.createElement('nav');
  navbar.className = "navbar navbar-expand-lg navbar-light bg-light";

  let button = document.createElement('button');
  button.className = "navbar-toggler";
  button.setAttribute("type", "button");
  button.setAttribute("data-toggle", "collapse");
  button.setAttribute("data-target", "#navbarNav");
  button.setAttribute("aria-controls", "navbarNav");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Toggle navigation");

  let span = document.createElement('span');
  span.className = "navbar-toggler-icon";
  button.appendChild(span);

  let collapseDiv = document.createElement('div');
  collapseDiv.className = "collapse navbar-collapse";
  collapseDiv.id = "navbarNav";

  let ul = document.createElement('ul');
  ul.className = "navbar-nav";

  // Ici, ajoutez des liens à votre navbar
  let items = [
    {name: 'Accueil', href: '#'},
    {name: 'qrTomatoes', href: 'pages/qrTomatoes.html'},
    {name: 'Services', href: '#'},
    {name: 'Contact', href: '#'},
  ];

  for (let item of items) {
    let li = document.createElement('li');
    li.className = "nav-item";

    let a = document.createElement('a');
    a.className = "nav-link";
    a.href = item.href;
    a.innerText = item.name;

    li.appendChild(a);
    ul.appendChild(li);
  }

  collapseDiv.appendChild(ul);
  navbar.appendChild(button);
  navbar.appendChild(collapseDiv);

  // Ajoutez la navbar au corps de la page (ou à un autre élément si vous le souhaitez)
  document.body.prepend(navbar);
});
