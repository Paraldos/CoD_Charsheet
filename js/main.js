"use strict";

// modal
const myModal_title = document.querySelector("#myModal_title");
const myModal_body = document.querySelector("#myModal_body");
// home
const home_attributes = document.querySelector("#home_attributes");
const home_skills = document.querySelector("#home_skills");
const home_concepts = document.querySelector("#home_concepts");
const home_att_mental = document.querySelector("#home_att_mental");
const home_att_physical = document.querySelector("#home_att_physical");
const home_att_social = document.querySelector("#home_att_social");
const home_skill_mental = document.querySelector("#home_skill_mental");
const home_skill_physical = document.querySelector("#home_skill_physical");
const home_skill_social = document.querySelector("#home_skill_social");
const container_advantages = document.querySelector("#container_advantages");
const health_header = document.querySelector("#health_header");
const health_container = document.querySelector("#health_container");
const take_dmg = document.querySelector("#take_dmg");
const heal_dmg = document.querySelector("#heal_dmg");
const home_health = document.querySelector("#home_health");
const dmg_bashing = document.querySelector("#dmg_bashing");
const dmg_lethal = document.querySelector("#dmg_lethal");
const dmg_aggravated = document.querySelector("#dmg_aggravated");

// attributes
const attributes_total = document.querySelector("#attributes_total");

/* ======================================================
** GENERAL FUNCTIONS
====================================================== */
let _aspiration_text = (x) => `<b>${x.label}:</b> ${x.value}`;

function _modal_attribut(attribute) {
  // changes the content of the model so it gives information about an attribut
  // fill header
  myModal_title.innerText = attribute.label;
  // fill body
  myModal_body.innerHTML = `
  <p>${attribute.description}</p>
  <p><b>Attribute Tasks: </b>${attribute.tasks}</p>`;
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

function _value_to_dots(value) {
  let dots = "";
  for (let i = 0; i < 5; i++) {
    if (i < value) dots += "⚫";
    else dots += "⚪";
  }
  return dots;
}

/* ======================================================
** UPDATE ALL
====================================================== */
function _update_all() {
  _build_home();
  _create_attributes2();
}
_update_all();

/* ======================================================
** HOME
====================================================== */
function _build_home() {
  _build_concepts();
  _build_attributes();
  _build_skills();
  _build_advantages();
}

// ====== concepts
function _build_concepts() {
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

// ====== home attributes
home_attributes.addEventListener("click", (el) => {
  let modal_attribute = el.target.getAttribute("modal_attribute");
  let dbEntry = _get_attribute(modal_attribute);
  if (modal_attribute) _modal_attribut(dbEntry);
});

function _build_attributes() {
  // empty container and add header
  home_att_mental.innerHTML = `<h5>Mental</h5>`;
  home_att_physical.innerHTML = `<h5>Physical</h5>`;
  home_att_social.innerHTML = `<h5>Social</h5>`;
  // loop over attributes and fill container with content
  DB.attributes.forEach((attribute) => _add_attribute_to_html(attribute));
}

function _add_attribute_to_html(attribute) {
  let container = document.querySelector(`#home_att_${attribute.type}`);
  let dots = _value_to_dots(attribute.value);
  let newDiv = `
    <div
      modal_attribute="${attribute.id}"
      class="btn btn-outline-primary text-start"
      data-bs-toggle="modal"
      data-bs-target="#myModal">${attribute.label} ${dots}
    </div>`;
  container.insertAdjacentHTML("beforeend", newDiv);
}

// ====== skills
home_skills.addEventListener("click", (el) => {
  let modal_skill = el.target.getAttribute("modal_skill");
  let dbEntry = _get_skill(modal_skill);
  if (modal_skill) _modal_attribut(dbEntry);
});

function _build_skills() {
  // empty container and add header
  home_skill_mental.innerHTML = `<h5>Mental</h5>`;
  home_skill_physical.innerHTML = `<h5>Physical</h5>`;
  home_skill_social.innerHTML = `<h5>Social</h5>`;
  // loop over skills and fill container with content
  DB.skills.forEach((skill) => _add_skill_to_html(skill));
}

function _add_skill_to_html(skill) {
  let container = document.querySelector(`#home_skill_${skill.type}`);
  let dots = _value_to_dots(skill.value);
  let specialties = _get_specialties(skill);
  let newDiv = `
  <div
    id="home_${skill.id}"
    modal_skill="${skill.id}"
    class="btn btn-outline-primary text-start"
    data-bs-toggle="modal"
    data-bs-target="#myModal">${skill.label} ${dots} ${specialties}
  </div>`;
  container.insertAdjacentHTML("beforeend", newDiv);
}

function _get_specialties(skill) {
  if (skill.specialties.length <= 0) return "";
  return `(${skill.specialties.join(", ")})`;
}

// ======  advantages

function _build_advantages() {
  // Example: <div class="col-3">Size:</div>
  container_advantages.innerHTML = ``;

  // size is a fixed number - no upadte needed
  _add_advantage(DB.advantages.size);

  _update_speed();
  _add_advantage(DB.advantages.speed);

  _update_ini();
  _add_advantage(DB.advantages.ini);

  _update_defense();
  _add_advantage(DB.advantages.defense);

  // beats and xp are fixed numbers - no update needed
  _add_advantage(DB.advantages.beats);
  _add_advantage(DB.advantages.xp);

  _update_health();
  _add_healthboxes();

  _update_willpower();
}

function _add_advantage(advantage) {
  let newDiv = `<div class="col-sm-12 col-md-4 col-lg-2"><b>${advantage.label}: </b>${advantage.value}</div>`;
  container_advantages.insertAdjacentHTML("beforeend", newDiv);
}

function _update_speed() {
  let str = _get_attribute("strength").value;
  let dex = _get_attribute("dexterity").value;
  DB.advantages.speed.value = str + dex + 5;
}

function _update_ini() {
  let dex = _get_attribute("dexterity").value;
  let com = _get_attribute("composure").value;
  DB.advantages.ini.value = dex + com;
}

function _update_defense() {
  let wits = _get_attribute("wits").value;
  let dex = _get_attribute("dexterity").value;
  let athletics = _get_skill("athletics").value;
  let result = Math.min(wits, dex);
  if (!DB.housrules.defense_without_athletics) result += athletics;
  DB.advantages.defense.value = result;
}

// health and damage
dmg_bashing.addEventListener("click", () => _add_dmg(0));
dmg_lethal.addEventListener("click", () => _add_dmg(1));
dmg_aggravated.addEventListener("click", () => _add_dmg(2));

function _update_health() {
  let size = DB.advantages.size.value;
  let stamina = _get_attribute("stamina").value;
  DB.advantages.health.value = size + stamina;
  health_header.innerText = `Health (${DB.advantages.health.value})`;
}

function _add_healthboxes() {
  let health = DB.advantages.health;

  // empty container
  health_container.innerHTML = ``;

  // loop over health and fill container
  for (let i = 1; i <= DB.advantages.health.value; i++) {
    // =========
    let penaltyCounter = i - DB.advantages.health.value + 3;
    let penalty = ``;
    if (penaltyCounter > 0) penalty = `-${penaltyCounter}`;

    // =========
    let symbol = `empty`;
    if (health.dmg[i - 1] == 2) symbol = `aggravated`;
    if (health.dmg[i - 1] == 1) symbol = `lethal`;
    if (health.dmg[i - 1] == 0) symbol = `bashing`;

    // =========
    let newDiv = `
    <div class="col-auto">
      <img class="card-img card-img-top" src="./img/healthbox_${symbol}.png" alt="" />
      <div class="card-body">
        <p class="text-end card-text">${penalty}</small></p>
      </div>
    <div>`;

    health_container.insertAdjacentHTML("beforeend", newDiv);
  }
}

function _add_dmg(type) {
  // type is number between 0 and 2 -> 0 = bashing, 1 = lethal, 2 = aggravated
  let health = DB.advantages.health;
  let lastIndex = health.dmg.length - 1;

  if (health.dmg.length <= health.value) health.dmg.push(type);

  if (health.dmg.length > health.value) {
    if (health.dmg[lastIndex] == 1) health.dmg[lastIndex] = 2;
    if (health.dmg[lastIndex] == 0 && type == 2) health.dmg[lastIndex] = 2;
    if (health.dmg[lastIndex] == 0 && type <= 1) health.dmg[lastIndex] = 1;
  }

  health.dmg.sort((a, b) => b - a);
  _build_advantages();
}

function _update_willpower() {
  let res = _get_attribute("resolve").value;
  let com = _get_attribute("composure").value;
  DB.advantages.willpower.value = res + com;
}

home_health.addEventListener("click", (el) => {
  if (el.target.classList.contains("toggle")) {
    take_dmg.classList.toggle("visually-hidden");
    heal_dmg.classList.toggle("visually-hidden");
  }
});

// ======  health and willpower

/* ======================================================
** ATTRIBUTES
====================================================== */
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
  let container = document.querySelector(`#attribute_${type}2`);
  let points = _getPoints_attribute(type);
  let name = type[0].toUpperCase() + type.slice(1);
  container.innerHTML = `<p class=""><b>${name}</b> (${points} Points)</p>`;
}

function _add_attribut2_click(attribute) {
  let domElement = document.querySelector(`#attribute2_${attribute.id}`);
  domElement.addEventListener("click", () => _modal_attribut(attribute));
}

function _add_attribute2(attribute) {
  let container = document.querySelector(`#attribute_${attribute.type}2`);
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
