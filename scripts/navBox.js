"use strict";

/* ====================================================== */
_navBox_home();

/* ====================================================== */
navBox_home.addEventListener("click", () => _navBox_home());
navBox_change_basics.addEventListener("click", () => _navBox_change_basics());

/* ====================================================== */
function _navBox_change_basics() {
  navBox_cleanup();
  change_basics.classList.remove("notVisible");
}

function _navBox_home() {
  navBox_cleanup();
  conceptBox.classList.remove("notVisible");
  att_box.classList.remove("notVisible");
}

/* ====================================================== */
function navBox_cleanup() {
  for (let i in allBoxes) allBoxes[i].classList.add("notVisible");
}
