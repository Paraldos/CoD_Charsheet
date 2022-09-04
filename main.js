"use strict";

// modal
const myModal_title = document.getElementById("myModal_title");
const myModal_body = document.getElementById("myModal_body");
// concepts
let _aspiration_text = (x) => `<b>${x.label}:</b> ${x.value}`;
// attributes
const attributes_total = document.getElementById("attributes_total");
const attributes_mental = document.getElementById("attributes_mental");
const attributes_physical = document.getElementById("attributes_physical");
const attributes_social = document.getElementById("attributes_social");
//let arr_mental = Object.keys(DB.attributes.mental);
//let arr_physical = Object.keys(DB.attributes.physical);
//let arr_social = Object.keys(DB.attributes.social);
// skills
const skills_mental = document.getElementById("skills_mental");
const skills_physical = document.getElementById("skills_physical");
const skills_social = document.getElementById("skills_social");
// advantages
const container_advantages = document.getElementById("container_advantages");

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

function _modal_skill(skill) {
  // header
  myModal_title.innerText = skill.label;
  // body
  myModal_body.innerHTML = `
    <p>${skill.description}</p>
    <p><b>Sample Actions: </b>${skill.sampleActions}</p>
    <p><b>Sample Specialties: </b>${skill.sampleSpecialties}</p>
    <p><b>Sample Contacts: </b>${skill.sampleContacts}</p>
    `;
}

let _get_attribute = (attribute) =>
  DB.attributes.filter((att) => att.id == attribute)[0];

function _getPoints_attribute(type) {
  let points = 0;
  if (type == "all") {
    DB.attributes.forEach((attribute) => (points += attribute.value));
  } else {
    DB.attributes
      .filter((att) => att.type == type)
      .forEach((attribute) => (points += attribute.value));
  }
  return points;
}

/* ========= update ========= */
function _update_all() {
  _create_concepts();
  _create_attributes1();
  _create_attributes2();
  _create_skills();
  _create_advantages();
}
_update_all();

/* ========= concepts ========= */
function _create_concepts() {
  // get container
  let container = document.getElementById("container_concepts");
  // empty container
  container.innerHTML = ``;
  // loop over concepts in DB and add content to container
  DB.concepts.forEach((concept) => _add_concept(concept, container));
}

function _add_concept(concept, container) {
  // skip if aspiration housrule is on
  if (DB.housrules.no_aspirations && concept.id.includes("aspiration")) return;
  // add content
  let newDiv = `<div class="col-lg-6 col-sm-12"><b>${concept.label}:</b> ${concept.value}</div>`;
  container.insertAdjacentHTML("beforeend", newDiv);
}

/* ========= attributes on home screen (attributes1) ========= */
function _create_attributes1() {
  // empty container and add header
  attributes_mental.innerHTML = ``;
  attributes_physical.innerHTML = ``;
  attributes_social.innerHTML = ``;
  // fill attribute container with attribut buttons
  DB.attributes.forEach((attribute) => _add_attribut1(attribute));
}

function _add_attribut1(attribute) {
  let newDiv = document.createElement("div");
  newDiv.id = `attribute_${attribute.id}`;
  newDiv.classList = `btn btn-outline-dark text-start`;
  newDiv.setAttribute(`data-bs-toggle`, "modal");
  newDiv.setAttribute(`data-bs-target`, "#myModal");
  newDiv.innerText = `${attribute.label}: ${attribute.value}`;
  newDiv.addEventListener("click", () => _modal_attribut(attribute));
  document.getElementById(`attributes_${attribute.type}`).appendChild(newDiv);
}

/* ========= change attributes (attributes2) ========= */
function _create_attributes2() {
  // empty container and add header
  _create_attribute2_header("mental");
  _create_attribute2_header("physical");
  _create_attribute2_header("social");

  DB.attributes.forEach((attribute) => _add_attribute2(attribute));
  // fill attribute container with attribut buttons
  //for (let name of arr_mental) _create_attribute2_body(name);
  //for (let name of arr_physical) _create_attribute2_body(name);
  //for (let name of arr_social) _create_attribute2_body(name);

  // update attributes total
  attributes_total.innerHTML = `<b>Total Points Distributed:</b>  ${
    _getPoints_attribute("all") - 9
  }`;
}

function _create_attribute2_header(type) {
  let container = document.getElementById(`attribute_${type}2`);
  let points = _getPoints_attribute(type);
  let name = type[0].toUpperCase() + type.slice(1);
  container.innerHTML = `<p class=""><b>${name}</b> (${points - 3} Points)</p>`;
}

function _add_attribute2(attribute) {
  let container = document.getElementById(`attribute_${attribute.type}2`);
  // container
  let newContainer = document.createElement("div");
  newContainer.classList.add("row", "m-1");
  container.appendChild(newContainer);

  // name button
  let newButton = document.createElement("div");
  newButton.classList = `btn btn-outline-dark col-auto`; // "text-start",
  newButton.setAttribute(`data-bs-toggle`, "modal");
  newButton.setAttribute(`data-bs-target`, "#myModal");
  newButton.innerText = attribute.label;
  newButton.addEventListener("click", () => _modal_attribut(attribute));
  newContainer.appendChild(newButton);

  // radio button group
  let newBtnGroup = document.createElement("div");
  newBtnGroup.classList = "btn-group col-auto";
  newBtnGroup.setAttribute(`role`, `group`);
  newContainer.appendChild(newBtnGroup);

  // fill button group
  for (let i = 1; i < 6; i++) {
    let newInput = document.createElement("input");
    newInput.setAttribute(`type`, `radio`);
    newInput.classList.add("btn-check");
    newInput.setAttribute(`name`, `btnradio_${attribute.id}`);
    newInput.id = `btnradio_${attribute.id}_${i}`;
    newInput.setAttribute(`autocomplete`, `off`);
    if (i == attribute.value) newInput.checked = true;
    newInput.addEventListener("click", () => {
      console.log("hi");
      DB.attributes[attribute].value = i;
      _update_all();
    });
    newBtnGroup.appendChild(newInput);

    let newLabel = document.createElement("label");
    newLabel.classList.add("btn", "btn-outline-dark");
    newLabel.setAttribute(`for`, `btnradio_${attribute}_${i}`);
    newLabel.innerText = `${i}`;
    newBtnGroup.appendChild(newLabel);
  }
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
  newButton.classList = `btn btn-outline-dark col-auto`; // "text-start",
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
      _update_all();
    });
    newBtnGroup.appendChild(newInput);

    let newLabel = document.createElement("label");
    newLabel.classList.add("btn", "btn-outline-dark");
    newLabel.setAttribute(`for`, `btnradio_${name}_${i}`);
    newLabel.innerText = `${i}`;
    newBtnGroup.appendChild(newLabel);
  }
}

/* ========= skills ========= */
function _create_skills() {
  // Empty container and add header
  skills_mental.innerHTML = `<h5>Mental</h5>`;
  skills_physical.innerHTML = `<h5>Physical</h5>`;
  skills_social.innerHTML = `<h5>Social</h5>`;

  // fill attribute container with attribut buttons
  let arr_mental = Object.keys(DB.skills.mental);
  let arr_physical = Object.keys(DB.skills.physical);
  let arr_social = Object.keys(DB.skills.social);
  for (let name of arr_mental) _create_skill(name, "mental");
  for (let name of arr_physical) _create_skill(name, "physical");
  for (let name of arr_social) _create_skill(name, "social");
}

function _create_skill(name, type) {
  let skill = DB.skills[type][name];
  let specialties = _get_specialties(skill);
  let container = document.getElementById(`skills_${type}`);

  // create new skill button
  let newDiv = document.createElement("div");
  newDiv.id = `skills_${name}`;
  newDiv.classList = `btn btn-outline-dark text-start`;
  newDiv.setAttribute(`data-bs-toggle`, "modal");
  newDiv.setAttribute(`data-bs-target`, "#myModal");
  newDiv.innerText = `${skill.label} ${skill.value} ${specialties}`;
  newDiv.addEventListener("click", () => _modal_skill(skill));
  container.appendChild(newDiv);
}

function _get_specialties(skill) {
  if (skill.specialties.length <= 0) return "";
  return `(${skill.specialties.join(", ")})`;
}

/* ========= advantages ========= */
function _create_advantages() {
  // Example: <div class="col-3">Size:</div>
  container_advantages.innerHTML = ``;

  // size is a fixed number
  _update_speed();
  _update_ini();
  _update_defense();
  // beats is a fixed number
  // xp is a fixed number
  _update_willpower();
  _update_health();

  _create_advantage(DB.advantages.size);
  _create_advantage(DB.advantages.speed);
  _create_advantage(DB.advantages.ini);
  _create_advantage(DB.advantages.defense);
  _create_advantage(DB.advantages.beats);
  _create_advantage(DB.advantages.xp);
}

function _create_advantage(advantage) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("col-sm-4", "col-md-3", "col-lg-2");
  newDiv.innerHTML = `<b>${advantage.label}: </b>${advantage.value}`;
  container_advantages.appendChild(newDiv);
}

function _update_speed() {
  let str = _get_attribute("strength").value;
  let dex = _get_attribute("dexterity").value;
  // =========
  DB.advantages.speed.value = str + dex + 5;
}

function _update_ini() {
  let dex = _get_attribute("dexterity").value;
  let com = _get_attribute("composure").value;
  // =========
  DB.advantages.ini.value = dex + com;
}

function _update_defense() {
  let result = 0;
  let wits = _get_attribute("wits").value;
  let dex = _get_attribute("dexterity").value;
  let athletics = DB.skills.physical.athletics.value;
  // =========
  result += Math.min(wits, dex);
  if (!DB.housrules.defense_without_athletics) result += athletics;
  // =========
  DB.advantages.defense.value = result;
}

function _update_willpower() {
  let res = _get_attribute("resolve").value;
  let com = _get_attribute("composure").value;
  // =========
  DB.advantages.willpower.value = res + com;
}

function _update_health() {
  let size = DB.advantages.size.value;
  let stamina = _get_attribute("stamina").value;
  // =========
  DB.advantages.health.value = size + stamina;
}
