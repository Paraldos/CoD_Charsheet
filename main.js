"use strict";

// modal
const myModal_title = document.getElementById("myModal_title");
const myModal_body = document.getElementById("myModal_body");
// concepts
let concepts = [
  "name",
  "chronicle",
  "concept",
  "player",
  "aspiration1",
  "aspiration2",
  "aspiration3",
];
let _concept_text = (x) => `<b>${x.label}:</b> ${x.value}`;
let _aspiration_text = (x) => `<b>${x.label}:</b> ${x.value}`;
// attributes
const att_mental = document.getElementById("att_mental");
const att_physical = document.getElementById("att_physical");
const att_social = document.getElementById("att_social");
// skills
const skills_mental = document.getElementById("skills_mental");
const skills_physical = document.getElementById("skills_physical");
const skills_social = document.getElementById("skills_social");
// advantages
const container_advantages = document.getElementById("container_advantages");

/* ========= concepts ========= */
function _create_concepts() {
  let container_concepts = document.getElementById("container_concepts"); // get container
  container_concepts.innerHTML = ``; // empty container
  for (let concept of concepts) _create_concept(concept); // fill container with concepts
  // for (let number in DB.aspirations) _create_aspiration(number); // Fill container with aspirations
}
_create_concepts();

function _create_concept(concept) {
  /* Example: <div id="concepts_name" class="col-lg-6 col-sm-12"></div> */
  let newDiv = document.createElement("div");
  newDiv.id = `concepts_${concept}`;
  newDiv.classList.add("col-lg-6", "col-sm-12");
  newDiv.innerHTML = _concept_text(DB.concepts[concept]);
  container_concepts.appendChild(newDiv);
}

function _update_concepts() {
  for (let concept of concepts) {
    let domElement = document.getElementById(`concepts_${concept}`); // grab concept
    domElement.innerHTML = _concept_text(DB.concepts[concept]); // change html of grabbed concept
  }
}

/* ========= attributes ========= */
function _create_attributes() {
  // Empty container and add header
  att_mental.innerHTML = `<h5>Mental</h5>`;
  att_physical.innerHTML = `<h5>Physical</h5>`;
  att_social.innerHTML = `<h5>Social</h5>`;

  // fill attribute container with attribut buttons
  let arr_mental = Object.keys(DB.attributes.mental);
  let arr_physical = Object.keys(DB.attributes.physical);
  let arr_social = Object.keys(DB.attributes.social);
  for (let name of arr_mental) _create_attribute(name, "mental");
  for (let name of arr_physical) _create_attribute(name, "physical");
  for (let name of arr_social) _create_attribute(name, "social");
}
_create_attributes();

function _create_attribute(name, type) {
  // Example: <div id="attribute_intelligence" class="btn btn-outline-dark text-start" data-bs-toggle="modal" data-bs-target="#myModal"></div>

  let attribut = DB.attributes[type][name];
  let container = document.getElementById(`att_${type}`);

  let newDiv = document.createElement("div");
  newDiv.id = `attribute_${name}`;
  newDiv.classList.add("btn", "btn-outline-dark", "text-start");
  newDiv.setAttribute(`data-bs-toggle`, "modal");
  newDiv.setAttribute(`data-bs-target`, "#myModal");
  newDiv.innerText = `${attribut.label}: ${attribut.value}`;
  newDiv.addEventListener("click", () => _attribute_click(attribut));
  container.appendChild(newDiv);
}

function _attribute_click(attribut) {
  // fill header
  myModal_title.innerText = attribut.label;
  // fill body
  myModal_body.innerHTML = `
  <p>${attribut.description}</p>
  <p><b>Attribute Tasks: </b>${attribut.tasks}</p>`;
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
_create_skills();

function _create_skill(name, type) {
  // Example: <div id="skills_academics" class="btn btn-outline-dark text-start" data-bs-toggle="modal" data-bs-target="#myModal"></div>

  let skill = DB.skills[type][name];
  let specialties = _get_specialties(skill);
  let container = document.getElementById(`skills_${type}`);

  // create new skill button
  let newDiv = document.createElement("div");
  newDiv.id = `skills_${name}`;
  newDiv.classList.add("btn", "btn-outline-dark", "text-start");
  newDiv.setAttribute(`data-bs-toggle`, "modal");
  newDiv.setAttribute(`data-bs-target`, "#myModal");
  newDiv.innerText = `${skill.label} ${skill.value} ${specialties}`;
  newDiv.addEventListener("click", () => _skill_click(skill));
  container.appendChild(newDiv);
}

function _get_specialties(skill) {
  if (skill.specialties.length <= 0) return "";
  return `(${skill.specialties.join(", ")})`;
}

function _skill_click(skill) {
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
_create_advantages();

function _create_advantage(advantage) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("col-sm-4", "col-md-3", "col-lg-2");
  newDiv.innerHTML = `<b>${advantage.label}: </b>${advantage.value}`;
  container_advantages.appendChild(newDiv);
}

function _update_speed() {
  let str = DB.attributes.physical.strength.value;
  let dex = DB.attributes.physical.strength.value;
  // =========
  DB.advantages.speed.value = str + dex + 5;
}

function _update_ini() {
  let dex = DB.attributes.physical.dexterity.value;
  let com = DB.attributes.social.composure.value;
  // =========
  DB.advantages.ini.value = dex + com;
}

function _update_defense() {
  let wits = DB.attributes.mental.wits.value;
  let dex = DB.attributes.physical.dexterity.value;
  let athletics = DB.skills.physical.athletics.value;
  // =========
  DB.advantages.defense.value = Math.min(wits, dex) + athletics;
}

function _update_willpower() {
  let res = DB.attributes.mental.resolve.value;
  let com = DB.attributes.social.composure.value;
  // =========
  DB.advantages.willpower.value = res + com;
}

function _update_health() {
  let size = DB.advantages.size.value;
  let stamina = DB.attributes.physical.stamina.value;
  // =========
  DB.advantages.health.value = size + stamina;
}
