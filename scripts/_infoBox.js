"use strict";

let infoBox_inside = document.querySelector(".infoBox_inside");

addEventListener("click", () => {
  _open_InfoBox();
});

function _open_InfoBox() {
  infoBox_inside.classList.remove("small");
}

function _close_InfoBox() {
  infoBox_inside.classList.add("small");
}
