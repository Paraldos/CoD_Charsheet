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
  _add_mask();
  _add_dirge();
  _add_simple_concept(DB.concept);
  _add_simple_concept(DB.covenant);
  _add_simple_concept(DB.faction);
  _add_simple_concept(DB.groupName);
}

/* ============ simple concept (e.g. name) ============ */
function _add_simple_concept(el) {
  if (!el.aktive) return;
  conceptBox.innerHTML += `<li>${el.label}: ${el.value}</li>`;
}

function _add_mask() {
  if (!DB.mask.aktive) return;
  let maskLabel = DB.masksAndDirges[DB.mask.value].label;
  conceptBox.innerHTML += `<li>Mask: ${maskLabel}</li>`;
}

function _add_dirge() {
  if (!DB.dirge.aktive) return;
  let dirgLabel = DB.masksAndDirges[DB.dirge.value].label;
  conceptBox.innerHTML += `<li>Dirge: ${dirgLabel}</li>`;
}

/*
<ul class="conceptBox box">
  <li>Name: Test</li>
  <li>Player: Test</li>
  ...
</ul>
*/
