"use strict";

function _create_attributesBox() {
  _att_box_h1();
  _att_box_info();
  _att_box_attributes("mental");
  _att_box_attributes("physical");
  _att_box_attributes("social");
}
_create_attributesBox();

/* ====================================================== */
function _att_box_h1() {
  let newh1 = document.createElement("h1");
  newh1.innerText = "Attributes";
  att_box.appendChild(newh1);
}

/* ====================================================== */
function _att_box_info() {
  let newUl = document.createElement("ul");
  newUl.classList = "att_box_info";
  //
  newUl.appendChild(_att_box_info_li("Power"));
  newUl.appendChild(_att_box_info_li("Finesse"));
  newUl.appendChild(_att_box_info_li("Resistance"));
  //
  att_box.appendChild(newUl);
}

function _att_box_info_li(txt) {
  let newLi = document.createElement("li");
  newLi.innerText = txt;
  return newLi;
}

/* ====================================================== */
function _att_box_attributes(type) {
  let newUl = document.createElement("ul");
  newUl.classList = "_att_box_attributes";
  //
  let keys = Object.keys(DB.attributes[type]);
  for (let key of keys) newUl.appendChild(_att_box_attributes_li(type, key));
  //
  att_box.appendChild(newUl);
}

function _att_box_attributes_li(type, id) {
  let DBEntry = DB.attributes[type][id];
  let newLi = document.createElement("li");
  newLi.classList = "attribute";
  //
  let newLabel = document.createElement("label");
  newLabel.innerText = DBEntry.label;
  newLi.appendChild(newLabel);
  //
  let newP = document.createElement("p");
  newP.id = id;
  newP.innerText = _dots_for_points(DBEntry.value);
  newLi.appendChild(newP);
  //
  return newLi;
}

function _dots_for_points(value) {
  let arr = [];
  let returnString = "";
  for (let i = 0; i < 5; i++) {
    if (value > i) returnString += "●";
    else returnString += "○";
  }
  return returnString;
}
