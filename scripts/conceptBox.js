"use strict";

/* ====================================================== */
function _conceptBox() {
  _clean_conceptBox();
  let DBKeys = Object.keys(DB.concepts);
  DBKeys.forEach((el) => _fill_conceptBox(el));
}
_conceptBox();

/* ====================================================== */
function _clean_conceptBox() {
  conceptBox.innerHTML = "";
}

/* ====================================================== */
function _fill_conceptBox(key) {
  if (!DB.concepts[key].aktive) return;
  let blub = DB.concepts[key];
  //
  let newLi = document.createElement("li");
  conceptBox.appendChild(newLi);
  newLi.id = "key";
  //
  _conceptBox_create_label(newLi, blub);
  _conceptBox_create_txt(newLi, blub);
}

/* ====================================================== */
function _conceptBox_create_label(newLi, blub) {
  let newLabel = document.createElement("label");
  newLi.appendChild(newLabel);
  newLabel.innerText = `${blub.label}: `;
}

function _conceptBox_create_txt(newLi, blub) {
  let newTxt = document.createElement("p");
  newLi.appendChild(newTxt);
  if (blub.type == "input") newTxt.innerText = `${blub.value}`;
  if (blub.type == "dropDown")
    newTxt.innerText = `${blub.options[blub.value].label}`;
}
