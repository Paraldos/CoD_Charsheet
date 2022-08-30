"use strict";

const boxes = [
  "concepts",
  "attributes",
  "skills",
  "advantages",
  //
  "basics",
];
let arr_home = ["concepts", "attributes", "skills", "advantages"];
let arr_basics = ["basics"];

let navbar_home = document.getElementById("navbar_home");
let navbar_basics = document.getElementById("navbar_basics");

/* ========= default settings when page is loaded ========= */
_navbar_click(navbar_home, arr_home);

/* ========= navbar buttons ========= */
navbar_home.addEventListener("click", () =>
  _navbar_click(navbar_home, arr_home)
);

navbar_basics.addEventListener("click", () =>
  _navbar_click(navbar_basics, arr_basics)
);

/* ========= navbar on click event ========= */

function _navbar_click(button, activeBoxes) {
  _navbar_set_all_inactive();
  _navbar_set_active(button);
  _hide_all_boxes();
  for (let i of activeBoxes) _make_box_visible(i);
}

/* ========= helper functions ========= */
function _navbar_set_all_inactive() {
  let navLinks = document.querySelectorAll(".nav-link");
  for (let link of navLinks) link.classList.remove("active");
}

function _navbar_set_active(link) {
  link.classList.add("active");
}

function _hide_all_boxes() {
  for (let i in boxes)
    document.getElementById(boxes[i]).classList.add(`visually-hidden`);
}

function _make_box_visible(x) {
  document.getElementById(x).classList.remove(`visually-hidden`);
}
