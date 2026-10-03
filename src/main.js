import "@denis-mahei/custom-normalizer";
import "./style.css";

const menu = document.querySelector("#mobile-menu");
const openBtn = document.querySelector("[data-menu-open]");

if (menu && openBtn) {
  const pageRegions = document.querySelectorAll("body > *:not(#mobile-menu)");
  const desktopQuery = window.matchMedia("(min-width: 1024px)");

  const isOpen = () => menu.classList.contains("is-open");

  const openMenu = () => {
    menu.classList.add("is-open");
    menu.removeAttribute("inert");
    pageRegions.forEach((region) => region.setAttribute("inert", ""));
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-scroll-locked");
    menu.querySelector("[data-menu-close]")?.focus();
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    menu.setAttribute("inert", "");
    pageRegions.forEach((region) => region.removeAttribute("inert"));
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-scroll-locked");
    openBtn.focus();
  };

  openBtn.addEventListener("click", openMenu);

  menu.addEventListener("click", (event) => {
    if (
      event.target === menu ||
      event.target.closest("[data-menu-close], .mobile-menu__link")
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) closeMenu();
  });

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches && isOpen()) closeMenu();
  });
}
