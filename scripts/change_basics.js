"use strict";

/* ====================================================== */
function _change_basics() {
  let DBKeys = Object.keys(DB.concepts);
  DBKeys.forEach((el) => _fill_change_basics(el));
}
_change_basics();

/* ====================================================== */
function _fill_change_basics(el) {
  let DBEntry = DB.concepts[el];
  if (DBEntry.type != "input") return;
  if (!DBEntry.aktive) return;
  //
  let newLi = document.createElement("li");
  change_basics.appendChild(newLi);
  //
  let newLabel = _fill_change_basics_newLabel(DBEntry.label, newLi);
  let newInput = _fill_change_basics_newInput(newLi, DBEntry);
}

function _fill_change_basics_newLabel(label, newLi) {
  let newLabel = document.createElement("label");
  newLabel.innerText = label;
  newLi.appendChild(newLabel);
}

function _fill_change_basics_newInput(newLi, DBEntry) {
  let newInput = document.createElement("input");
  newLi.appendChild(newInput);
  //
  newInput.addEventListener("keyup", () =>
    _change_basics_update(DBEntry, newInput)
  );
}

/* ====================================================== */
function _change_basics_update(DBEntry, newInput) {
  DBEntry.value = newInput.value;
  _conceptBox();
}
