"use strict";
const allBoxes = [attributeBox, maskDirgeBox, basicsBox, conceptBox];
const navBox_home = document.querySelector(".navBox_home");
const navBox_cBasics = document.querySelector(".navBox_cBasics");
const maskDirgeBox_btn = document.querySelector(".maskDirgeBox_btn");

/* ======================================================
Define function of navBox buttons
====================================================== */
/* ============ Home -> is also default ============ */
navBox_home.addEventListener("click", () => _navBox_home());
function _navBox_home() {
  _notVisible_to_all();
  conceptBox.classList.remove("notVisible");
  attributeBox.classList.remove("notVisible");
}
_navBox_home();

/* ============ Basics ============ */
navBox_cBasics.addEventListener("click", () => _navBox_change_basics());
function _navBox_change_basics() {
  _notVisible_to_all();
  basicsBox.classList.remove("notVisible");
}

/* ============ Mask / Dirge ============ */
maskDirgeBox_btn.addEventListener("click", () => _maskDirgeBox_btn());
function _maskDirgeBox_btn() {
  _notVisible_to_all();
  maskDirgeBox.classList.remove("notVisible");
}

/* ======================================================
Add notVisible class to all buttons and update all boxes
====================================================== */
function _notVisible_to_all() {
  for (let i in allBoxes) allBoxes[i].classList.add("notVisible");
  _attributeBox();
  _maskDirgeBox();
  _basicsBox();
  _conceptBox();
}
