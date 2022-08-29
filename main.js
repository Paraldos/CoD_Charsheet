"use strict";

/* ========= concepts ========= */
function _update_concepts() {
  // general concepts
  _update_concept("name");
  _update_concept("age");
  _update_concept("player");
  _update_concept("chronicle");
  _update_concept("concept");
  _update_concept("groupName");
}
_update_concepts();

function _update_concept(conc) {
  let domElement = document.getElementById(`concepts_${conc}`);
  domElement.innerText = `${DB[conc].label}: ${DB[conc].value}`;
}

/* ========= aspirations ========= */
function _update_aspirations() {
  _update_aspiration("aspiration1");
  _update_aspiration("aspiration2");
  _update_aspiration("aspiration3");
}
_update_aspirations();

function _update_aspiration(x) {
  let domElement = document.getElementById(x);
  domElement.innerText = `${DB[x].value}`;
}

/* ========= attributes ========= */
const myModal_title = document.getElementById("myModal_title");
const myModal_body = document.getElementById("myModal_body");
//
const att_mental = document.getElementById("att_mental");
const att_physical = document.getElementById("att_physical");
const att_social = document.getElementById("att_social");

function _update_attributes() {
  att_mental.innerHTML = `<h5>Mental</h5>`;
  _update_attribute("intelligence");
  _update_attribute("strength");
  _update_attribute("presence");
  // ###
  _update_attribute("wits");
  _update_attribute("dexterity");
  _update_attribute("manipulation");
  // ###
  _update_attribute("resolve");
  _update_attribute("stamina");
  _update_attribute("composure");
}
_update_attributes();

function _update_attribute(att) {
  let label = DB.attributes[att].label;
  let value = DB.attributes[att].value;
  // ############
  let newDiv = (
    <div
      class="btn btn-outline-dark text-start"
      data-bs-toggle="modal"
      data-bs-target="#myModal"
      id="attribute_intelligence"
    ></div>
  );
  // ############
  let domElement = document.getElementById(`attribute_${att}`);
  domElement.innerText = `${label}: ${value}`;
  // ############
  domElement.addEventListener("click", () => _attribute_eventlistener(att));
}

function _attribute_eventlistener(att) {
  myModal_title.innerText = DB.attributes[att].label;
  myModal_body.innerHTML = `
  <p>${DB.attributes[att].description}</p>
  <p><b>Attribute Tasks: </b>${DB.attributes[att].tasks}</p>`;
}

/* ========= skills ========= */
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
  let label = DB.skills[skill].label;
  let value = DB.skills[skill].value;
  let specialties = _get_specialties(skill);
  // ############
  let domElement = document.getElementById(`skills_${skill}`);
  domElement.innerText = `${label}: ${value} ${specialties}`;
}

function _get_specialties(skill) {
  if (DB.skills[skill].specialties.length <= 0) return "";
  let string = "";
  for (let i in DB.skills[skill].specialties) {
    if (i == 0) string += DB.skills[skill].specialties[i];
    if (i == 0) string += `, ${DB.skills[skill].specialties[i]}`;
  }
  string = `(${string})`;
  return string;
}
