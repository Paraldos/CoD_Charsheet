"use strict";

const myModal_title = document.getElementById("myModal_title");
const myModal_body = document.getElementById("myModal_body");

/* ========= attributes ========= */
function _create_attributes() {
  // get attribute container from DOM
  const att_mental = document.getElementById("att_mental");
  const att_physical = document.getElementById("att_physical");
  const att_social = document.getElementById("att_social");

  // empty attribute container and add header
  att_mental.innerHTML = `<h5>Mental</h5>`;
  att_physical.innerHTML = `<h5>Physical</h5>`;
  att_social.innerHTML = `<h5>Social</h5>`;

  // fill attribute container with attribut buttons
  _create_attribute("intelligence", att_mental);
  _create_attribute("wits", att_mental);
  _create_attribute("resolve", att_mental);
  _create_attribute("strength", att_physical);
  _create_attribute("dexterity", att_physical);
  _create_attribute("stamina", att_physical);
  _create_attribute("presence", att_social);
  _create_attribute("manipulation", att_social);
  _create_attribute("composure", att_social);
}
_create_attributes();

function _create_attribute(att, container) {
  // example of how the button should look like in the end
  // <div id="attribute_intelligence" class="btn btn-outline-dark text-start" data-bs-toggle="modal" data-bs-target="#myModal"></div>

  // prepare label and value
  let label = DB.attributes[att].label;
  let value = DB.attributes[att].value;

  // create new attribut button
  let newDiv = document.createElement("div");
  newDiv.id = `attribute_${att}`;
  newDiv.classList.add("btn");
  newDiv.classList.add("btn-outline-dark");
  newDiv.classList.add("text-start");
  newDiv.setAttribute(`data-bs-toggle`, "modal");
  newDiv.setAttribute(`data-bs-target`, "#myModal");
  newDiv.innerText = `${label}: ${value}`;
  newDiv.addEventListener("click", () => _attribute_eventlistener(att));

  // add new button to the provided container
  container.appendChild(newDiv);
}

// fill modal with new information fitting for an attribut
function _attribute_eventlistener(att) {
  // fill header
  myModal_title.innerText = DB.attributes[att].label;

  // fill body
  myModal_body.innerHTML = `
    <p>${DB.attributes[att].description}</p>
    <p><b>Attribute Tasks: </b>${DB.attributes[att].tasks}</p>
    `;
}

// ############
function _update_attributes() {
  _update_attribute("intelligence");
  _update_attribute("wits");
  _update_attribute("resolve");

  _update_attribute("strength");
  _update_attribute("dexterity");
  _update_attribute("stamina");

  _update_attribute("presence");
  _update_attribute("manipulation");
  _update_attribute("composure");
}

function _update_attribute(att) {
  // get attribute from DOM
  let domElement = document.getElementById(`attribute_${att}`);

  // prepare label and value
  let label = DB.attributes[att].label;
  let value = DB.attributes[att].value;

  // update text
  domElement.innerText = `${label}: ${value}`;
}

/* ========= skills ========= */
function _create_skills() {
  // get skill container from DOM
  const skills_mental = document.getElementById("skills_mental");
  const skills_physical = document.getElementById("skills_physical");
  const skills_social = document.getElementById("skills_social");

  // empty skill container and add header
  skills_mental.innerHTML = `<h5>Mental</h5>`;
  skills_physical.innerHTML = `<h5>Physical</h5>`;
  skills_social.innerHTML = `<h5>Social</h5>`;

  // fill skill container with skill buttons
  _create_skill("academics", skills_mental);
  _create_skill("computer", skills_mental);
  _create_skill("crafts", skills_mental);
  _create_skill("investigation", skills_mental);
  _create_skill("medicine", skills_mental);
  _create_skill("occult", skills_mental);
  _create_skill("politics", skills_mental);
  _create_skill("science", skills_mental);

  _create_skill("athletics", skills_physical);
  _create_skill("brawl", skills_physical);
  _create_skill("drive", skills_physical);
  _create_skill("firearms", skills_physical);
  _create_skill("larceny", skills_physical);
  _create_skill("stealth", skills_physical);
  _create_skill("survival", skills_physical);
  _create_skill("weaponry", skills_physical);

  _create_skill("animalKen", skills_social);
  _create_skill("empathy", skills_social);
  _create_skill("expression", skills_social);
  _create_skill("intimidation", skills_social);
  _create_skill("persuasion", skills_social);
  _create_skill("socialize", skills_social);
  _create_skill("streetwise", skills_social);
  _create_skill("subterfuge", skills_social);
}
_create_skills();

function _create_skill(skill, container) {
  // example how a skill button should look
  // <div id="skills_academics" class="btn btn-outline-dark text-start" data-bs-toggle="modal" data-bs-target="#myModal"></div>

  // prepare label, value aund specialties
  let label = DB.skills[skill].label;
  let value = DB.skills[skill].value;
  let specialties = _get_specialties(skill);

  // create new skill button
  let newDiv = document.createElement("div");
  newDiv.id = `skills_${skill}`;
  newDiv.classList.add("btn");
  newDiv.classList.add("btn-outline-dark");
  newDiv.classList.add("text-start");
  newDiv.setAttribute(`data-bs-toggle`, "modal");
  newDiv.setAttribute(`data-bs-target`, "#myModal");
  newDiv.innerText = `${label}: ${value} ${specialties}`;
  newDiv.addEventListener("click", () => _skill_eventlistener(skill));

  // add new skill button to container
  container.appendChild(newDiv);
}

// fill modal with new information fitting for an skill
function _skill_eventlistener(skill) {
  // header
  myModal_title.innerText = DB.skills[skill].label;
  // body
  myModal_body.innerHTML = `
    <p>${DB.skills[skill].description}</p>
    <p><b>Sample Actions: </b>${DB.skills[skill].sampleActions}</p>
    <p><b>Sample Specialties: </b>${DB.skills[skill].sampleSpecialties}</p>
    <p><b>Sample Contacts: </b>${DB.skills[skill].sampleContacts}</p>
    `;
}

function _update_skills() {
  _update_skill("academics");
  _update_skill("computer");
  _update_skill("crafts");
  _update_skill("investigation");
  _update_skill("medicine");
  _update_skill("occult");
  _update_skill("politics");
  _update_skill("science");
  // ###
  _update_skill("athletics");
  _update_skill("brawl");
  _update_skill("drive");
  _update_skill("firearms");
  _update_skill("larceny");
  _update_skill("stealth");
  _update_skill("survival");
  _update_skill("weaponry");
  // ###
  _update_skill("animalKen");
  _update_skill("empathy");
  _update_skill("expression");
  _update_skill("intimidation");
  _update_skill("persuasion");
  _update_skill("socialize");
  _update_skill("streetwise");
  _update_skill("subterfuge");
}
_update_skills();

function _update_skill(skill) {
  // get skill from DOM
  let domElement = document.getElementById(`skills_${skill}`);

  // prepare label, value aund specialties
  let label = DB.skills[skill].label;
  let value = DB.skills[skill].value;
  let specialties = _get_specialties(skill);

  // update text
  domElement.innerText = `${label}: ${value} ${specialties}`;
}

function _get_specialties(skill) {
  if (DB.skills[skill].specialties.length <= 0) return "";
  let string = "";
  for (let i in DB.skills[skill].specialties) {
    if (i == 0) string += DB.skills[skill].specialties[i];
    if (i != 0) string += `, ${DB.skills[skill].specialties[i]}`;
  }
  string = `(${string})`;
  return string;
}
