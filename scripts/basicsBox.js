"use strict";
const basicsBox = document.querySelector(".basicsBox");

/* ======================================================
Create basicsBox
====================================================== */
function _basicsBox() {
  basicsBox.innerHTML = `<p class="header">Basics</p>`;
  Object.keys(DB.concepts).forEach((el) => _append_concept_options(el));
}
_basicsBox();

/* ======================================================
Append concept options to basicsBox
====================================================== */
function _append_concept_options(el) {
  if (DB.concepts[el].type != "input") return;
  if (!DB.concepts[el].aktive) return;
  //
  let newElement = document.createElement("li");
  basicsBox.appendChild(newElement);
  //
  _append_label(el, newElement);
  _append_input(el, newElement);
  //
}

/* ============ append label ============ */
function _append_label(el, parent) {
  let newElement = document.createElement("p");
  newElement.innerText = `${DB.concepts[el].label}: `;
  parent.appendChild(newElement);
}

/* ============ append input ============ */
function _append_input(el, parent) {
  let newElement = document.createElement("input");
  newElement.value = DB.concepts[el].value;
  newElement.addEventListener(
    "keyup",
    () => (DB.concepts[el].value = newElement.value)
  );
  parent.appendChild(newElement);
}

/*
<p class="header">Basics</p>
<li>
  <p>Name: </p>
  <input type="text">
</li>
*/
