"use strict";

// modal
const myModal_title = document.getElementById("myModal_title");
const myModal_body = document.getElementById("myModal_body");
// concepts
let concepts = ["name", "chronicle", "concept", "player"];
let _concept_text = (x) => `<b>${x.label}:</b> ${x.value}`;
// aspirations
const container_aspirations = document.getElementById("container_aspirations");
const aspirations = document.getElementById("aspirations");
let _aspiration_text = (x) => `<b>${x.label}:</b> ${x.value}`;
// attributes
const att_mental = document.getElementById("att_mental");
const att_physical = document.getElementById("att_physical");
const att_social = document.getElementById("att_social");
// skills
const skills_mental = document.getElementById("skills_mental");
const skills_physical = document.getElementById("skills_physical");
const skills_social = document.getElementById("skills_social");

/* ========= concepts ========= */
function _create_concepts() {
  let container_concepts = document.getElementById("container_concepts"); // get container
  container_concepts.innerHTML = ``; // empty container
  for (let concept of concepts) _create_concept(concept); // fill container with concepts
}
_create_concepts();

function _create_concept(concept) {
  /* Example: <div id="concepts_name" class="col-lg-6 col-sm-12"></div> */
  let newDiv = document.createElement("div");
  newDiv.id = `concepts_${concept}`;
  newDiv.classList.add("col-lg-6");
  newDiv.classList.add("col-sm-12");
  newDiv.innerHTML = _concept_text(DB.concepts[concept]);
  container_concepts.appendChild(newDiv);
}

function _update_concepts() {
  for (let concept of concepts) {
    let domElement = document.getElementById(`concepts_${concept}`); // grab concept
    domElement.innerHTML = _concept_text(DB.concepts[concept]); // change html of grabbed concept
  }
}

/* ========= aspirations ========= */
function _create_aspirations() {
  container_aspirations.innerHTML = ``; // Empty container
  for (let number in DB.aspirations) _create_aspiration(number); // Fill container with aspirations
}
_create_aspirations();

function _create_aspiration(number) {
  // Example: <div id="aspiration1" class="col-12"></div>
  let newDiv = document.createElement("div");
  newDiv.id = `aspiration${number}`;
  newDiv.classList.add("mb-3");
  newDiv.innerHTML = _aspiration_text(DB.aspirations[number]);
  container_aspirations.appendChild(newDiv);
}

function _update_aspirations() {
  for (let number in DB.aspirations) {
    let domElement = document.getElementById(`aspiration${number}`);
    domElement.innerHTML = _aspiration_text(DB.aspirations[number]);
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
  newDiv.classList.add("btn");
  newDiv.classList.add("btn-outline-dark");
  newDiv.classList.add("text-start");
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
  newDiv.innerText = `${skill.label}: ${skill.value} ${specialties}`;
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

/* ========= basics concepts ========= */
const basics_concepts = document.getElementById("basics_concepts");

function _create_basics_concepts() {
  basics_concepts.innerHTML = `<h5>Concepts</h5>`; // Empty container and add header
  for (let i of concepts) _create_basics_concept(i); // Add concepts
}
_create_basics_concepts();

function _create_basics_concept(element) {
  /* Example:
  <div>
    <label for="basics_name" class="form-label">Name</label>
    <input type="text" class="form-control" id="basics_name" />
  </div> */

  // newDiv
  let newDiv = document.createElement("div");
  basics_concepts.appendChild(newDiv);

  // newLabel
  let newLabel = document.createElement("label");
  newLabel.setAttribute(`for`, `basics_${element}`);
  newLabel.classList.add("form-label");
  newLabel.innerText = DB.concepts[element].label;
  newDiv.appendChild(newLabel);

  // newInput
  let newInput = document.createElement("input");
  newInput.setAttribute(`type`, "text");
  newInput.classList.add("form-control");
  newInput.id = `basics_${element}`;
  newInput.value = DB.concepts[element].value;
  newDiv.appendChild(newInput);

  // eventListener
  newInput.addEventListener("input", () => {
    DB.concepts[element].value = newInput.value;
    _update_concepts();
  });
}

/* ========= basics aspirations ========= */
const basics_aspirations = document.getElementById("basics_aspirations");

function _create_basics_aspirations() {
  basics_aspirations.innerHTML = `<h5>Aspirations</h5>`; // Empty conctainer and add header
  for (let number in DB.aspirations) _create_basics_aspiration(number); // add aspirations
}
_create_basics_aspirations();

function _create_basics_aspiration(i) {
  /* Example:
  <div class="mb-3">
    <input type="text" class="form-control" id="basics_aspiration1" />
  </div> */

  // newDiv
  let newDiv = document.createElement("div");
  newDiv.classList.add("mb-3");
  basics_aspirations.appendChild(newDiv);

  // newInput
  let newInput = document.createElement("input");
  newInput.setAttribute(`type`, "text");
  newInput.classList.add("form-control");
  newInput.id = `basics_aspiration${i + 1}`;
  newInput.value = DB.aspirations[i].value;
  newDiv.appendChild(newInput);

  // eventListener
  newInput.addEventListener("input", () => {
    DB.aspirations[i].value = newInput.value;
    _update_aspirations();
  });
}
