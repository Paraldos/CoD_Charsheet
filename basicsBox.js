"use strict";
const basicsBox = document.querySelector(".basicsBox");

/* ======================================================
Create basicsBox
====================================================== */
function _basicsBox() {
  basicsBox.innerHTML = `<h1>Basics</h1>`;
  _basicsBox_simpelAppend(DB.name);
  _basicsBox_simpelAppend(DB.player);
  _basicsBox_simpelAppend(DB.chronicle);
  _basicsBox_simpelAppend(DB.concept);
  _basicsBox_simpelAppend(DB.covenant);
}

/* ======================================================
Append simple options to basicsBox
====================================================== */
function _basicsBox_simpelAppend(el) {
  let newElement = document.createElement("li");
  newElement.innerHTML = `<p>${el.label}: </p>`;
  _basicsBox_get_input(el, newElement);
  basicsBox.appendChild(newElement);
}

/* ============ get input field ============ */
function _basicsBox_get_input(el, parent) {
  let newElement = document.createElement("input");
  newElement.value = el.value;
  newElement.addEventListener("keyup", () => (el.value = newElement.value));
  parent.appendChild(newElement);
}

/*
<h1>Basics</h1>
<li>
  <p>Name: </p>
  <input type="text">
</li>
*/
