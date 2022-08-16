"use strict";
const allBoxes = [conceptBox, attributeBox, skillBox, maskDirgeBox, basicsBox];
const home_btn = document.querySelector(".home_btn");
const basics_btn = document.querySelector(".basics_btn");
const maskDirgeBox_btn = document.querySelector(".maskDirgeBox_btn");

/* ======================================================
Define function of navBox buttons
====================================================== */
/* ============ Home -> is also default ============ */
home_btn.addEventListener("click", () => _home_btn());
function _home_btn() {
  _notVisible_to_all();
  conceptBox.classList.remove("notVisible");
  attributeBox.classList.remove("notVisible");
  skillBox.classList.remove("notVisible");
}
_home_btn();

/* ============ Basics ============ */
basics_btn.addEventListener("click", () => _basics_btn());
function _basics_btn() {
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
  _conceptBox();
  _attributeBox();
  _skillBox();
  _maskDirgeBox();
  _basicsBox();
  _conceptBox();
}
