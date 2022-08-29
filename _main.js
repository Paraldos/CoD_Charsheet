"use strict";

/* ======================================================
Transform value into dots
====================================================== */
function _dots_for_points(value) {
  let returnString = "";
  for (let i = 0; i < 5; i++) {
    if (value > i) returnString += "●";
    else returnString += "○";
  }
  return returnString;
}

/* ======================================================
Function to collapse "elem"
====================================================== */
function _collapseElement(elem) {
  // debugger;
  elem.style.height = "";
  elem.style.transition = "none";
  const startHeight = window.getComputedStyle(elem).height;

  // Remove the collapse class, and force a layout calculation to get the final height
  elem.classList.toggle("collapsed");
  const height = window.getComputedStyle(elem).height;

  // Set the start height to begin the transition
  elem.style.height = startHeight;

  // wait until the next frame so that everything has time to update before starting the transition
  requestAnimationFrame(() => {
    elem.style.transition = "";

    requestAnimationFrame(() => {
      elem.style.height = height;
    });
  });

  // Clear the saved height values after the transition
  elem.addEventListener("transitionend", () => {
    elem.style.height = "";
  });
}

/* ======================================================
concepts
====================================================== */
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

/* ======================================================
aspirations
====================================================== */
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

/* ======================================================
attributes
====================================================== */
function _update_attributes() {
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
  let domElement = document.getElementById(`attribute_${att}`);
  domElement.innerText = `${label}: ${value}`;
}

/* ======================================================
skills
====================================================== */
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
