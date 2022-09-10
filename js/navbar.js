"use strict";

/* =========================== NAVBAR =========================== */
let navbar = {
  navLinks: document.querySelectorAll(".nav-link"),
  sections: document.querySelectorAll(".section"),

  click(target) {
    this._updateNavLinks(target);
    this._updateSections(target);
    DB.updateSkills();
    _update_all();
  },

  _updateNavLinks(target) {
    this.navLinks.forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`#navbar_${target}`).classList.add("active");
  },

  _updateSections(target) {
    this.sections.forEach((sec) => sec.classList.add(`visually-hidden`));
    document.querySelector(`#section_${target}`).classList.remove(`visually-hidden`);
  },
};
navbar.click("home");

document.querySelector("#navbarNav").addEventListener("click", (el) => {
  if (!el.target.classList.contains("nav-link")) return;
  navbar.click(el.target.id.split("_")[1]);
});
