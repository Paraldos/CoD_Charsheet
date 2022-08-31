"use strict";

// attributes1
const att_mental = document.getElementById("att_mental");
const att_physical = document.getElementById("att_physical");
const att_social = document.getElementById("att_social");

const attributes_total = document.getElementById("attributes_total");

// attribut arrays
let arr_mental = Object.keys(DB.attributes.mental);
let arr_physical = Object.keys(DB.attributes.physical);
let arr_social = Object.keys(DB.attributes.social);

/* ========= generall functions ========= */
function _modal_attribut(attribut) {
  // changes the content of the model so it gives information about an attribut
  // fill header
  myModal_title.innerText = attribut.label;
  // fill body
  myModal_body.innerHTML = `
  <p>${attribut.description}</p>
  <p><b>Attribute Tasks: </b>${attribut.tasks}</p>`;
}

function _get_attribute_type(attribute) {
  // input an attribut (e.g. intelligence) and get they type in return (e.g. mental)
  if (DB.attributes.mental[attribute] != undefined) return "mental";
  if (DB.attributes.physical[attribute] != undefined) return "physical";
  if (DB.attributes.social[attribute] != undefined) return "social";
}

function _get_attribute_points_type(type) {
  // returns the sum of all attribute values of one type (e.g. physical)
  let points = 0;
  let group = DB.attributes[type];
  let keys = Object.keys(group);
  for (let i of keys) points += group[i].value;
  return points;
}

function _get_attribute_points_total() {
  // returns the sum of all attribute values
  let a = _get_attribute_points_type("mental");
  let b = _get_attribute_points_type("physical");
  let c = _get_attribute_points_type("social");
  return a + b + c;
}

/* ========= attributes on home screen (attributes1) ========= */
function _create_attributes() {
  // Empty container and add header
  att_mental.innerHTML = `<h5>Mental</h5>`;
  att_physical.innerHTML = `<h5>Physical</h5>`;
  att_social.innerHTML = `<h5>Social</h5>`;

  // fill attribute container with attribut buttons
  for (let name of arr_mental) _create_attribute(name);
  for (let name of arr_physical) _create_attribute(name);
  for (let name of arr_social) _create_attribute(name);
}
_create_attributes();

function _create_attribute(name) {
  // Example: <div id="attribute_intelligence" class="btn btn-outline-dark text-start" data-bs-toggle="modal" data-bs-target="#myModal"></div>

  let type = _get_attribute_type(name);
  let attribute = DB.attributes[type][name];
  let container = document.getElementById(`att_${type}`);

  let newDiv = document.createElement("div");
  newDiv.id = `attribute_${name}`;
  newDiv.classList.add("btn", "btn-outline-dark", "text-start");
  newDiv.setAttribute(`data-bs-toggle`, "modal");
  newDiv.setAttribute(`data-bs-target`, "#myModal");
  newDiv.innerText = `${attribute.label}: ${attribute.value}`;
  newDiv.addEventListener("click", () => _modal_attribut(attribute));
  container.appendChild(newDiv);
}

/* ========= change attributes (attributes2) ========= */
function _create_attributes2() {
  // Empty container and add header
  _create_attribute2_header("mental");
  _create_attribute2_header("physical");
  _create_attribute2_header("social");

  // fill attribute container with attribut buttons
  for (let name of arr_mental) _create_attribute2_body(name);
  for (let name of arr_physical) _create_attribute2_body(name);
  for (let name of arr_social) _create_attribute2_body(name);

  // update attributes total
  let total_points = _get_attribute_points_total() - 9;
  attributes_total.innerHTML = `<b>Total Points Distributed:</b>  ${total_points}`;
}
_create_attributes2();

function _create_attribute2_header(type) {
  let points = _get_attribute_points_type(type);
  let name = type[0].toUpperCase() + type.slice(1);
  let container = document.getElementById(`att_${type}2`);

  container.innerHTML = `
  <div class="row">
    <h5 class="col-auto">${name}</h5>
    <p class="col-auto">(${points - 3} Points)</p>
  </div>`;
}

function _create_attribute2_body(name) {
  // prepwork
  let type = _get_attribute_type(name);
  let attribute = DB.attributes[type][name];
  let target = document.getElementById(`att_${type}2`);

  // container
  let newContainer = document.createElement("div");
  newContainer.classList.add("row", "m-1");
  target.appendChild(newContainer);

  // name button
  let newButton = document.createElement("div");
  newButton.classList.add("btn", "btn-outline-dark", "col-auto"); // "text-start",
  newButton.setAttribute(`data-bs-toggle`, "modal");
  newButton.setAttribute(`data-bs-target`, "#myModal");
  newButton.innerText = attribute.label;
  newButton.addEventListener("click", () => _modal_attribut(attribute));
  newContainer.appendChild(newButton);

  // radio button group
  let newBtnGroup = document.createElement("div");
  newBtnGroup.classList.add("btn-group", "col-auto");
  newBtnGroup.setAttribute(`role`, `group`);
  newContainer.appendChild(newBtnGroup);

  // fill button group
  for (let i = 1; i < 6; i++) {
    let newInput = document.createElement("input");
    newInput.setAttribute(`type`, `radio`);
    newInput.classList.add("btn-check");
    newInput.setAttribute(`name`, `btnradio_${name}`);
    newInput.id = `btnradio_${name}_${i}`;
    newInput.setAttribute(`autocomplete`, `off`);
    if (i == attribute.value) newInput.checked = true;
    newInput.addEventListener("click", () => {
      DB.attributes[type][name].value = i;
      _create_attributes();
      _create_attributes2();
      _create_advantages();
    });
    newBtnGroup.appendChild(newInput);

    let newLabel = document.createElement("label");
    newLabel.classList.add("btn", "btn-outline-dark");
    newLabel.setAttribute(`for`, `btnradio_${name}_${i}`);
    newLabel.innerText = `${i}`;
    newBtnGroup.appendChild(newLabel);
  }
}
