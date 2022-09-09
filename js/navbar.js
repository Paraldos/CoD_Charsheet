"use strict";

// ============== navbar
const navLinks = document.querySelectorAll(".nav-link");
const navbar_home = document.getElementById("navbar_home");
const navbar_basics = document.getElementById("navbar_basics");
const navbar_attributes = document.getElementById("navbar_attributes");
//
const sections = document.querySelectorAll(".section");
const section_home = document.getElementById("section_home");
const section_basics = document.getElementById("section_basics");
const section_attributes = document.getElementById("section_attributes");

// ====== default settings when page is loaded
switch (2) {
  case 0:
    _navbar_click(navbar_home, section_home);
    break;
  case 1:
    _navbar_click(navbar_basics, section_basics);
    break;
  case 2:
    _navbar_click(navbar_attributes, section_attributes);
    break;
}

// ====== navbar buttons
navbar_home.addEventListener("click", () => _navbar_click(navbar_home, section_home));
navbar_basics.addEventListener("click", () => _navbar_click(navbar_basics, section_basics));
navbar_attributes.addEventListener("click", () =>
  _navbar_click(navbar_attributes, section_attributes)
);

// ====== navbar click event
function _navbar_click(button, section) {
  _update_navbar(button);
  _update_content(section);
  _update_all();
}

function _update_navbar(button) {
  navLinks.forEach((link) => link.classList.remove("active"));
  button.classList.add("active");
}

function _update_content(section) {
  for (let section of sections) section.classList.add(`visually-hidden`);
  section.classList.remove(`visually-hidden`);
}
