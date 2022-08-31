"use strict";

let navLinks = document.querySelectorAll(".nav-link");
let sections = document.querySelectorAll(".section");
let home_section = document.getElementById("home_section");
let basics_section = document.getElementById("basics_section");
let navbar_home = document.getElementById("navbar_home");
let navbar_basics = document.getElementById("navbar_basics");

/* ========= default settings when page is loaded ========= */
_navbar_click(navbar_home, home_section);
//_navbar_click(navbar_basics, basics_section);

/* ========= navbar buttons ========= */
navbar_home.addEventListener("click", () =>
  _navbar_click(navbar_home, home_section)
);

navbar_basics.addEventListener("click", () =>
  _navbar_click(navbar_basics, basics_section)
);

/* ========= navbar click event ========= */
function _navbar_click(button, section) {
  _update_navbar(button);
  _update_content(section);
}

function _update_navbar(button) {
  for (let link of navLinks) link.classList.remove("active");
  button.classList.add("active");
}

function _update_content(section) {
  for (let section of sections) section.classList.add(`visually-hidden`);
  section.classList.remove(`visually-hidden`);
}
