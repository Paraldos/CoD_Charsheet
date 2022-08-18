"use strict";
let allBoxes = document.querySelector(".contentBox").children;
const home_btn = document.querySelector(".home_btn");
const basics_btn = document.querySelector(".basics_btn");
const maskDirgeBox_btn = document.querySelector(".maskDirgeBox_btn");
const clan_btn = document.querySelector(".clan_btn");

/* ======================================================
Define function of navBox buttons
====================================================== */
/* ============ Home -> is also default ============ */
home_btn.addEventListener("click", () => _home_btn());
function _home_btn() {
  _navBox();
  conceptBox.classList.remove("notVisible");
  aspirationBox.classList.remove("notVisible");
  attributeBox.classList.remove("notVisible");
  skillBox.classList.remove("notVisible");
}
_home_btn();

/* ============ Basics ============ */
basics_btn.addEventListener("click", () => _basics_btn());
function _basics_btn() {
  _navBox();
  basicsBox.classList.remove("notVisible");
}

/* ============ Mask / Dirge ============ */
maskDirgeBox_btn.addEventListener("click", () => _maskDirgeBox_btn());
function _maskDirgeBox_btn() {
  _navBox();
  maskDirgeBox.classList.remove("notVisible");
}

/* ============ Clan ============ */
clan_btn.addEventListener("click", () => _clan_btn());
function _clan_btn() {
  _navBox();
  clanBox.classList.remove("notVisible");
}

/* ======================================================
_navBox
====================================================== */
function _navBox() {
  // close infoBox
  _close_InfoBox();
  // add not visible class to all boxes
  for (let i = 0; i < allBoxes.length; i++) {
    allBoxes[i].classList.add("notVisible");
  }
  // return to the top of the page
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  // reload all boxes
  _conceptBox();
  _aspirationBox();
  _attributeBox();
  _skillBox();
  _maskDirgeBox();
  _basicsBox();
  _clanBox();
}
