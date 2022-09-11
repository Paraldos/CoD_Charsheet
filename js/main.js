"use strict";

/* =========================== UPDATE ALL =========================== */
function _update_all() {
  document.querySelectorAll(".empty").forEach((el) => (el.innerHTML = ``));
  home.buildAll();
  basics.buildAll();
  attributes.buildAll();
  skills.buildAll();
}

/* =========================== EVENTLISTENER =========================== */
document.querySelector("body").addEventListener("click", (el) => {
  let target = el.target;
  if (el.target.localName == "i") target = el.target.parentElement;

  if (!target.getAttribute("func")) return;
  let func = target.getAttribute("func").split("_");

  if (func[0] == "modal" && func[1] == "att") {
    DB.getAttribute(func[2]).openModal();
  }

  if (func[0] == "modal" && func[1] == "skill") {
    DB.getSkill(func[2]).openModal();
  }

  if (func[0] == "dmg") {
    if (func[1] == "heal") DB.health.healDmg();
    if (func[1] == "bashing") DB.health.takeBashingDmg();
    if (func[1] == "lethal") DB.health.takeLethalDmg();
    if (func[1] == "aggravated") DB.health.takeAggravatedDmg();
    home.buildHealth();
  }

  if (func[0] == "will") {
    if (func[1] == "gain") DB.willpower.gainWillpower();
    if (func[1] == "spend") DB.willpower.spendWillpower();
    home.buildWillpower();
  }

  if (func[0] == "addSpecialtie") {
    DB.getSkill(func[1]).specialties.push("");
    _update_all();
  }

  if (func[0] == "delete") {
    DB.getSkill(func[1]).specialties.splice(func[2], 1);
    _update_all();
  }
});

document.querySelector("body").addEventListener("input", (el) => {
  let target = el.target;
  if (el.target.localName == "i") target = el.target.parentElement;

  if (!target.getAttribute("func")) return;
  let func = target.getAttribute("func").split("_");

  if (func[0] == "set" && func[1] == "att") {
    DB.getAttribute(func[2]).value = +func[3];
    _update_all();
  }

  if (func[0] == "set" && func[1] == "skill") {
    DB.getSkill(func[2]).value = +func[3];
    _update_all();
  }

  if (func[0] == "input" && func[1] == "spec") {
    console.log("hi");
    DB.getSkill(func[2]).specialties[func[3]] = el.target.value;
  }

  if (func[0] == "housrule") {
    DB.getHousrule(func[1]).value = el.target.checked;
    _update_all();
  }

  if (func[0] == "concept") {
    DB.getConcept(func[1]).value = el.target.value;
    DB.getHousrule(func[1]).value = el.target.checked;
    _update_all();
  }
});

/* =========================== HOME =========================== */
let home = {
  buildAll() {
    this.buildConcepts();
    this.buildAttributes();
    this.buildSkills();
    this.buildAdvantage();
    this.buildHealth();
    this.buildWillpower();
  },

  buildConcepts() {
    DB.concepts.forEach((concept) => {
      if (DB.getHousrule("noAspirations").value && concept.label.includes("Aspiration")) return;
      let container = document.querySelector(`#home_concepts`);
      let content = `<div class="col-lg-6 col-sm-12"><b>${concept.label}:</b> ${concept.value}</div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildAttributes() {
    DB.attributes.forEach((attribute) => {
      let container = document.querySelector(`#home_att_${attribute.type}`);
      let content = `
      <div 
        class="btn btn-outline-primary text-start"
        func="modal_att_${attribute.id}"
        data-bs-toggle="modal"
        data-bs-target="#myModal">
        ${attribute.label} ${attribute.dots}
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildSkills() {
    DB.skills.forEach((skill) => {
      let container = document.querySelector(`#home_skill_${skill.type}`);
      let content = `
        <div
          class="btn btn-outline-primary text-start"
          func="modal_skill_${skill.id}"
          data-bs-toggle="modal"
          data-bs-target="#myModal">${skill.label} ${skill.dots} ${skill.stringOfSpecialties}
        </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildAdvantage() {
    DB.advantages.forEach((advantage) => {
      let container = document.querySelector("#container_advantages");
      let content = `
      <div class="col-sm-12 col-md-4 col-lg-2">
        <b>${advantage.label}: </b>${advantage.getValue()}
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildHealth() {
    let health = DB.health;
    document.querySelector("#health_header").innerText = `Health (${health.value})`;
    let container = document.querySelector("#health_container");
    container.innerHTML = ``;
    for (let i = 1; i <= health.value; i++) {
      let newDiv = `
      <div class="col-auto">
        ${this.getHealthSymbol(i)}
        <div class="card-body">
          <p class="text-end card-text">${this.getHealthPenalty(i)}</small></p>
        </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", newDiv);
    }
  },

  getHealthPenalty(i) {
    let penalty = i - DB.health.value + 3;
    if (penalty > 0) return `-${penalty}`;
    return ``;
  },

  getHealthSymbol(i) {
    if (DB.health.dmg[i - 1] == 2) return `<i class="fa-solid fa-skull fs-1"></i>`; // aggravated
    if (DB.health.dmg[i - 1] == 1) return `<i class="fa-solid fa-square-xmark fs-1"></i>`; // lethal
    if (DB.health.dmg[i - 1] == 0) return `<i class="fa-solid fa-square-minus fs-1"></i>`; // bashing
    return `<i class="fa-regular fa-square fs-1"></i>`; // empty
  },

  buildWillpower() {
    document.querySelector("#willpower_header").innerText = `Willpower (${DB.willpower.value})`;
    let container = document.querySelector("#willpower_container");
    container.innerHTML = ``;
    for (let i = 1; i <= DB.willpower.value; i++) {
      let newDiv = `
      <div class="col-auto">
          ${this.getWillpowerSymbol(i)}
          <div class="card-body">
            <p class="text-end card-text invisible">1</small></p>
          </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", newDiv);
    }
  },

  getWillpowerSymbol(i) {
    if (DB.willpower.spend >= i) return `<i class="fa-solid fa-square-xmark fs-1"></i>`; // spend
    return `<i class="fa-regular fa-square fs-1"></i>`; // unused
  },
};

/* =========================== BASICS =========================== */
let basics = {
  buildAll() {
    this.buildHousrules();
    this.buildConcepts();
  },

  buildHousrules() {
    DB.housrules.forEach((rule) => {
      let container = document.querySelector("#basics_housrules");
      let content = `
      <div class="form-check form-switch">
        <input func="housrule_${rule.id}" class="form-check-input" type="checkbox" id="${rule.id}" ${rule.checked}/>
        <label class="form-check-label" for="${rule.id}">${rule.description}</label>
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildConcepts() {
    DB.concepts.forEach((concept) => {
      if (DB.getHousrule("noAspirations").value && concept.label.includes("Aspiration")) return;
      let container = document.getElementById("basics_concepts");
      let content = `
      <div class="m-2">
        <label class="form-label">${concept.label}</label>
        <input func="concept_${concept.id}" value="${concept.value}" type="text" class="form-control"/>
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },
};

/* =========================== ATTRIBUTES =========================== */
let attributes = {
  total: document.querySelector("#att_points_total"),
  mental: document.querySelector("#att_points_mental"),
  physical: document.querySelector("#att_points_physical"),
  social: document.querySelector("#att_points_social"),

  buildAll() {
    this.updatePoints();
    this.buildAttributes();
  },

  updatePoints() {
    this.total.innerHTML = DB.getAttributePoints("all") - 9;
    this.mental.innerHTML = DB.getAttributePoints("mental") - 3;
    this.physical.innerHTML = DB.getAttributePoints("physical") - 3;
    this.social.innerHTML = DB.getAttributePoints("social") - 3;
  },

  buildAttributes() {
    DB.attributes.forEach((attribute) => {
      let container = document.querySelector(`#attribute_${attribute.type}`);
      let content = `
      <div class="row m-2 gap-2 mb-3">
        <div class="col-sm-12 col-md-3 btn btn-primary" data-bs-toggle="modal" 
        data-bs-target="#myModal" func="modal_att_${attribute.id}">
          ${attribute.label}
        </div>
        <div class="col-auto btn-group p-0" role="group" >${this.getButtongroup(attribute)}</div>
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  getButtongroup(attribute) {
    let buttons = ``;
    for (let i = 1; i <= 5; i++) {
      let checked = attribute.value == i ? `checked` : ``;
      buttons += `
      <input type="radio" class="btn-check" id="btnradio_${attribute.id}_${i}" autocomplete="off" ${checked} func="set_att_${attribute.id}_${i}">
      <label class="btn btn-outline-primary" for="btnradio_${attribute.id}_${i}">${i}</label>
      `;
    }
    return buttons;
  },
};

/* =========================== SKILLS =========================== */
let skills = {
  total: document.querySelector("#skills_points_total"),
  mental: document.querySelector("#skill_points_mental"),
  physical: document.querySelector("#skill_points_physical"),
  social: document.querySelector("#skill_points_social"),

  buildAll() {
    this.updatePoints();
    this.buildSkills();
  },

  updatePoints() {
    this.total.innerHTML = DB.getSkillPoints("all");
    this.mental.innerHTML = DB.getSkillPoints("mental");
    this.physical.innerHTML = DB.getSkillPoints("physical");
    this.social.innerHTML = DB.getSkillPoints("social");
  },

  buildSkills() {
    DB.skills.forEach((skill) => {
      let container = document.querySelector(`#skills_${skill.type}`);
      let content = `
      <div class="row m-2 gap-2">
        <div class="col-sm-12 col-md-3 btn btn-primary" func="modal_skill_${skill.id}"
          data-bs-toggle="modal" data-bs-target="#myModal">${skill.label}
        </div>
        
        <div class="col-auto btn btn-primary" 
        type="button" func="addSpecialtie_${skill.id}">
          Add Specialtie
        </div>

        <div class="col-auto btn-group p-0" 
        role="group">${this.getButtongroup(skill)}</div>

        <div class="col-12 row p-0 m-0">${this.getSpecialties(skill)}</div>
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  getButtongroup(skill) {
    let buttons = ``;
    for (let i = 0; i <= 5; i++) {
      let checked = skill.value == i ? `checked` : ``;
      buttons += `
      <input type="radio" class="btn-check" name="btnradio_${skill.id}" id="btnradio_${skill.id}_${i}" autocomplete="off" ${checked} func="set_skill_${skill.id}_${i}">
      <label class="btn btn-outline-primary" for="btnradio_${skill.id}_${i}">${i}</label>
      `;
    }
    return buttons;
  },

  getSpecialties(skill) {
    let inputs = ``;
    skill.specialties.forEach((el, i) => {
      inputs += `
      <div class="col-sm-12 col-md-3 p-1">
        <div class="input-group">
          <input value="${el}" type="text" func="input_spec_${skill.id}_${i}" class="form-control ">
          <button func="delete_${skill.id}_${i}" class="btn btn-outline-primary" type="button" func="remove_${skill.id}">X</button>
        </div>
      </div>`;
    });
    return inputs;
  },
};
