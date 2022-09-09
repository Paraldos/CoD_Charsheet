"use strict";

/* =========================== UPDATE ALL =========================== */
function _update_all() {
  document.querySelectorAll(".empty").forEach((el) => (el.innerHTML = ``));
  build_home();
  buildBasics();
  build_attributes();
}

/* =========================== HOME =========================== */
function build_home() {
  DB.concepts.forEach((concept) => concept.fillHomeContainer());
  DB.attributes.forEach((attribute) => attribute.fillHomeContainer());
  DB.skills.forEach((skill) => skill.fillHomeContainer());
  DB.advantages.forEach((advantage) => advantage.fillHomeContainer());
  DB.health.fillHomeContainer();
  DB.willpower.fillHomeContainer();
}

// eventListener
document.querySelector("#home_attributes").addEventListener("click", (el) => {
  let attribute = el.target.getAttribute("modal");
  if (attribute != null) DB.getAttribute(attribute).openModal();
});

document.querySelector("#home_skills").addEventListener("click", (el) => {
  let skill = el.target.getAttribute("modal");
  if (skill != null) DB.getSkill(skill).openModal();
});

document.querySelector("#take_bashing_dmg").addEventListener("click", () => {
  DB.health.takeBashingDmg();
});

document.querySelector("#take_lethal_dmg").addEventListener("click", () => {
  DB.health.takeLethalDmg();
});

document.querySelector("#take_aggravated_dmg").addEventListener("click", () => {
  DB.health.takeAggravatedDmg();
});

document.querySelector("#heal_dmg").addEventListener("click", () => {
  DB.health.healDmg();
});

document.querySelector("#spend_willpower").addEventListener("click", () => {
  DB.willpower.spendWillpower();
});

document.querySelector("#gain_willpower").addEventListener("click", () => {
  DB.willpower.gainWillpower();
});

/* =========================== BASICS =========================== */
function buildBasics() {
  DB.housrules.forEach((rule) => rule.fillBasicsContainer());
  DB.concepts.forEach((concept) => concept.fillBasicsContainer());
}

// eventListener
document.querySelector("#basics_housrules").addEventListener("input", (el) => {
  DB.getHousrule(el.target.id).value = el.target.checked;
  _update_all();
});

document.querySelector("#basics_concepts").addEventListener("input", (el) => {
  let value = el.target.value;
  let concept = el.target.getAttribute("concept");
  DB.getConcept(concept).value = value;
});

/* =========================== ATTRIBUTES =========================== */
function build_attributes() {
  // update attributes total
  document.querySelector("#att_points_total").innerHTML = `${DB.getAttributePoints("all") - 9}`;
  // header
  document.querySelector("#att_points_mental").innerHTML = DB.getAttributePoints("mental") - 3;
  document.querySelector("#att_points_physical").innerHTML = DB.getAttributePoints("physical") - 3;
  document.querySelector("#att_points_social").innerHTML = DB.getAttributePoints("social") - 3;
  // empty container
  document.querySelector("#attribute_mental").innerHTML = ``;
  document.querySelector("#attribute_physical").innerHTML = ``;
  document.querySelector("#attribute_social").innerHTML = ``;
  // content
  DB.attributes.forEach((el) => el.fillAttributesContainer());
}

document.querySelector("#section_attributes").addEventListener("input", (e) => {
  let input = e.target.id.split("_");
  DB.getAttribute(input[1]).value = Number(input[2]);
  build_attributes();
});

document.querySelector("#section_attributes").addEventListener("click", (el) => {
  let attribute = el.target.getAttribute("modal");
  if (attribute != null) DB.getAttribute(attribute).openModal();
});
