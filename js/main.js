"use strict";

// modal
const myModal_title = document.getElementById("myModal_title");
const myModal_body = document.getElementById("myModal_body");
// home
const home_concepts = document.getElementById("home_concepts");
const home_att_mental = document.getElementById("home_att_mental");
const home_att_physical = document.getElementById("home_att_physical");
const home_att_social = document.getElementById("home_att_social");
const home_skill_mental = document.getElementById("home_skill_mental");
const home_skill_physical = document.getElementById("home_skill_physical");
const home_skill_social = document.getElementById("home_skill_social");
const container_advantages = document.getElementById("container_advantages");
// attributes
const attributes_total = document.getElementById("attributes_total");

/* ========= generall functions ========= */
let _aspiration_text = (x) => `<b>${x.label}:</b> ${x.value}`;

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

let _get_attribute = (attribute) => DB.attributes.find((x) => x.id == attribute);

let _get_skill = (skill) => DB.skills.find((x) => x.id == skill);

function _getPoints_attribute(type) {
  // enter mental, physical, social or all
  let points = 0;
  if (type == "all") DB.attributes.forEach((attribute) => (points += attribute.value));
  else
    DB.attributes
      .filter((att) => att.type == type)
      .forEach((attribute) => (points += attribute.value));
  return points;
}

/* ========= update ========= */
function _update_all() {
  _update_home();
  _create_attributes2();
}
_update_all();

function _update_home() {
  _update_concepts();
  _update_attributes();
  _update_skills();
  _create_advantages();
}

/* ========= concepts ========= */
function _update_concepts() {
  // get and empty container
  home_concepts.innerHTML = ``;
  // loop over concepts in DB and add content to container
  DB.concepts.forEach((concept) => _add_concept(concept));
}

function _add_concept(concept) {
  // skip if aspiration housrule is on
  if (DB.housrules.no_aspirations && concept.id.includes("aspiration")) return;
  // add content
  let newDiv = `<div class="col-lg-6 col-sm-12"><b>${concept.label}:</b> ${concept.value}</div>`;
  home_concepts.insertAdjacentHTML("beforeend", newDiv);
}

/* ========= attributes on home screen (attributes1) ========= */
function _update_attributes() {
  // empty container and add header
  home_att_mental.innerHTML = `<h5>Mental</h5>`;
  home_att_physical.innerHTML = `<h5>Physical</h5>`;
  home_att_social.innerHTML = `<h5>Social</h5>`;

  // loop over attributes and fill container with content
  DB.attributes.forEach((attribute) => {
    _add_attribut_to_html(attribute); // add attribut
    _add_click_event_to_attribut(attribute); // add click event to attribut
  });
}

function _add_attribut_to_html(attribute) {
  let container = document.getElementById(`home_att_${attribute.type}`);
  let newDiv = `
    <div
      id="home_${attribute.id}"
      class="btn btn-outline-primary text-start"
      data-bs-toggle="modal"
      data-bs-target="#myModal">${attribute.label}: ${attribute.value}
    </div>`;
  container.insertAdjacentHTML("beforeend", newDiv);
}

function _add_click_event_to_attribut(attribute) {
  let domElement = document.getElementById(`home_${attribute.id}`);
  domElement.addEventListener("click", () => _modal_attribut(attribute));
}

/* ========= skills ========= */
function _update_skills() {
  // empty container and add header
  home_skill_mental.innerHTML = `<h5>Mental</h5>`;
  home_skill_physical.innerHTML = `<h5>Physical</h5>`;
  home_skill_social.innerHTML = `<h5>Social</h5>`;

  // loop over skills and fill container with content
  DB.skills.forEach((skill) => {
    _add_skill_to_html(skill);
    _add_click_event_to_skill(skill);
  });
}

function _add_skill_to_html(skill) {
  let container = document.getElementById(`home_skill_${skill.type}`);
  let specialties = _get_specialties(skill);
  let newDiv = `
  <div
    id="home_${skill.id}"
    class="btn btn-outline-primary text-start"
    data-bs-toggle="modal"
    data-bs-target="#myModal">${skill.label}: ${skill.value} ${specialties}
  </div>`;
  container.insertAdjacentHTML("beforeend", newDiv);
}

function _add_click_event_to_skill(skill) {
  let domElement = document.getElementById(`home_${skill.id}`);
  domElement.addEventListener("click", () => _modal_skill(skill));
}

function _get_specialties(skill) {
  if (skill.specialties.length <= 0) return "";
  return `(${skill.specialties.join(", ")})`;
}

/* ========= change attributes (attributes2) ========= */
function _create_attributes2() {
  // update attributes total
  attributes_total.innerHTML = `
    <b>Total Points Distributed:</b>  ${_getPoints_attribute("all") - 9}`;

  // empty container and add header
  _update_attribute2_header("mental");
  _update_attribute2_header("physical");
  _update_attribute2_header("social");

  // loop over attributes and fill container with content
  DB.attributes.forEach((attribute) => {
    _add_attribute2(attribute);
    _add_attribut2_click(attribute);
  });
}

function _update_attribute2_header(type) {
  let container = document.getElementById(`attribute_${type}2`);
  let points = _getPoints_attribute(type);
  let name = type[0].toUpperCase() + type.slice(1);
  container.innerHTML = `<p class=""><b>${name}</b> (${points} Points)</p>`;
}

function _add_attribut2_click(attribute) {
  let domElement = document.getElementById(`attribute2_${attribute.id}`);
  domElement.addEventListener("click", () => _modal_attribut(attribute));
}

function _add_attribute2(attribute) {
  let container = document.getElementById(`attribute_${attribute.type}2`);
  let txt = `
  <div class="row m-1">
    <div
    id="attribute2_${attribute.id}"
    class="btn btn-outline-dark col-auto" 
    data-bs-toggle="modal" 
    data-bs-target="#myModal">
    ${attribute.label}
    </div>

    <div class="btn-group col-auto" role="group">
      ${_add_attribute2_input(1, attribute)}
      ${_add_attribute2_input(2, attribute)}
      ${_add_attribute2_input(3, attribute)}
      ${_add_attribute2_input(4, attribute)}
      ${_add_attribute2_input(5, attribute)}
    </div>
  </div>`;
  container.insertAdjacentHTML("beforeend", txt);

  return;

  // container
  let newContainer = document.createElement("div");
  newContainer.classList = `row m-1`;
  container.appendChild(newContainer);

  // name button
  let newButton = document.createElement("div");
  newButton.classList = `btn btn-outline-dark col-auto`;
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
    // `<input id="btnradio_${attribute.id}_${i}" class="btn-check" type="radio" name="btnradio_${attribute.id}_${i}" autocomplete="off" checked="${i == attribute.value}"></input>`
    let newInput = document.createElement("input");
    newInput.id = `btnradio_${attribute.id}_${i}`;
    newInput.classList = "btn-check";
    newInput.setAttribute(`type`, `radio`);
    newInput.setAttribute(`name`, `btnradio_${attribute.id}_${i}`);
    newInput.setAttribute(`autocomplete`, `off`);
    if (i == attribute.value) newInput.checked = true;
    newInput.addEventListener("click", () => {
      attribute.value = i;
      _update_all();
    });
    newBtnGroup.appendChild(newInput);

    // `<div class="btn btn-outline-dark" for="btnradio_${attribute.id}_${i}">${i}</div>`;
    let newLabel = document.createElement("label");
    newLabel.classList = "btn btn-outline-dark";
    newLabel.setAttribute(`for`, `btnradio_${attribute.id}_${i}`);
    newLabel.innerText = `${i}`;
    newBtnGroup.appendChild(newLabel);
  }
}

function _add_attribute2_input(i, attribute) {
  return `
  <input 
  id="btnradio_${attribute.id}_${i}" 
  class="btn-check" 
  type="radio" 
  name="btnradio_${attribute.id}_${i}" 
  autocomplete="off"
  value="1"
  </input>

  <div 
  class="btn btn-outline-dark" 
  for="btnradio_${attribute.id}_${i}">${i}
  </div>
  `;
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
  let athletics = _get_skill("athletics").value;
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
