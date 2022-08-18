"use strict";
const conceptBox = document.querySelector(".conceptBox");

/* ======================================================
Create conceptBox
====================================================== */
function _conceptBox() {
  conceptBox.innerHTML = "";
  _add_simple_concept(DB.name);
  _add_simple_concept(DB.age);
  _add_simple_concept(DB.player);
  _add_simple_concept(DB.chronicle);

  _add_MaskDirge("dirge");
  _add_MaskDirge("mask");
  _add_simple_concept(DB.concept);

  _add_clan();
  _add_simple_concept(DB.covenant);
  _add_simple_concept(DB.faction);
  _add_simple_concept(DB.groupName);
}

/* ============ clan and bloodline ============ */
function _add_clan() {
  if (!DB.clan.aktive) return;
  //
  let newLi = document.createElement("li");
  newLi.innerText = `Clan: ${DB.clans[DB.clan.value].label}`;
  newLi.classList = "infoBtn";
  newLi.addEventListener("click", () => _infoBox_clan());
  //
  conceptBox.appendChild(newLi);
}

/* ============ simple concept (e.g. name) ============ */
function _add_simple_concept(el) {
  if (!el.aktive) return;
  //
  let newLi = document.createElement("li");
  newLi.innerText = `${el.label}: ${el.value}`;

  conceptBox.appendChild(newLi);
}

/* ============ mask and dirge ============ */
function _add_MaskDirge(type) {
  if (!DB[type].aktive) return;
  //
  let newLi = document.createElement("li");
  newLi.innerText = `${DB[type].label}: ${
    DB.masksAndDirges[DB[type].value].label
  }`;
  newLi.classList = "infoBtn";
  newLi.addEventListener("click", () => _infoBox_MaskDirge(DB[type]));
  //
  conceptBox.appendChild(newLi);
}

/*
<ul class="conceptBox box">
  <li>Name: Test</li>
  <li>Player: Test</li>
  ...
</ul>
*/
