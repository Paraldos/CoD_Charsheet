"use strict";

let infoBox = document.querySelector(".infoBox");
let infoBox_inside = document.querySelector(".infoBox_inside");
let infoBox_x = document.querySelector(".infoBox_x");
let infoBox_content = document.querySelector(".infoBox_content");

/* ======================================================
removes notVisible class from infoBox_inside after page is loaded
====================================================== */
infoBox_inside.classList.remove("notVisible");

/* ======================================================
open infoBox functions
====================================================== */
/* ============ clan ============ */
function _infoBox_clan() {
  let clan = DB.clans[DB.clan.value];
  let text = `
  <h1>Clan: ${clan.label}</h1>
  <p>${clan.description}</p>
  <p><b>Nickname:</b> ${clan.nickname}</p>
  <p><b>Clan Bane (${clan.bane.label}):</b> ${clan.bane.description}</p>
  <p><b>Favored Attributes:</b> ${clan.favoredAttributes}</p>
  <p><b>Disciplines:</b> ${clan.disciplines}</p>
  `;
  _open_InfoBox(text);
}

/* ============ mask and dirge ============ */
function _infoBox_MaskDirge(type) {
  let el = DB.masksAndDirges[type.value];
  let text = `
  <h1>${type.label}: ${el.label}</h1>
  <p>${el.description}</p>
  <p><b>Single Willpower:</b> ${el.singleWillpower}</p>
  <p><b>All Willpower:</b> ${el.allWillpower}</p>`;
  _open_InfoBox(text);
}

/* ======================================================
basic open and close functions for infoBox
====================================================== */
function _open_InfoBox(x) {
  infoBox_content.innerHTML = x;
  infoBox_inside.classList.remove("small");
}

function _close_InfoBox() {
  infoBox_inside.classList.add("small");
}

/* ======================================================
x button to close infoBox
====================================================== */
infoBox_x.addEventListener("click", () => _close_InfoBox());
