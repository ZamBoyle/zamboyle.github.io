// Personnalise ces trois valeurs avant de publier sur GitHub Pages.
const profile = {
  name: "TON PRÉNOM",
  github: "https://github.com/",
  email: "hello@example.com",
};

document.querySelectorAll('[data-profile="name"]').forEach((node) => {
  node.textContent = profile.name;
});
document.querySelector('[data-profile-link="github"]').href = profile.github;
document.querySelector('[data-profile-link="email"]').href =
  `mailto:${profile.email}`;
document.querySelector("#year").textContent = new Date().getFullYear();

const themeButton = document.querySelector(".theme-toggle");
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("light") ? "light" : "dark",
  );
});
if (localStorage.getItem("portfolio-theme") === "light")
  document.body.classList.add("light");

document.addEventListener("pointermove", (event) => {
  const glow = document.querySelector(".cursor-glow");
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));
document
  .querySelector('[data-scroll-to="about"]')
  .addEventListener("click", () =>
    document.querySelector("#about").scrollIntoView(),
  );

const command = "echo $CURRENT_MOOD";
const typed = document.querySelector("#typed-command");
let character = 0;
setTimeout(function type() {
  typed.textContent = command.slice(0, character++);
  if (character <= command.length) setTimeout(type, 65);
}, 800);

const secret = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let secretIndex = 0;

function unlock() {
  document.body.classList.add("party");
  document.querySelector(".toast").classList.add("show");
  setTimeout(() => {
    document.body.classList.remove("party");
    document.querySelector(".toast").classList.remove("show");
  }, 4000);
}

document.addEventListener("keydown", (event) => {
  secretIndex =
    event.key.toLowerCase() === secret[secretIndex].toLowerCase()
      ? secretIndex + 1
      : 0;
  if (secretIndex === secret.length) {
    unlock();
    secretIndex = 0;
  }
});
document.querySelector("#konami-hint").addEventListener("click", unlock);
