"use strict";

/* =========================== UPDATE ALL =========================== */
function _update_all() {
  document.querySelectorAll(".empty").forEach((el) => (el.innerHTML = ``));
  home.buildAll();
  basics.buildAll();
  attributes.buildAll();
  skills.buildAll();
}

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
        <img class="card-img card-img-top" src="${this.getHealthSymbol(i)}" alt="" />
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
    if (DB.health.dmg[i - 1] == 2) return `./img/healthbox_aggravated.png`;
    if (DB.health.dmg[i - 1] == 1) return `./img/healthbox_lethal.png`;
    if (DB.health.dmg[i - 1] == 0) return `./img/healthbox_bashing.png`;
    return `./img/healthbox_empty.png`;
  },

  buildWillpower() {
    document.querySelector("#willpower_header").innerText = `Willpower (${DB.willpower.value})`;
    let container = document.querySelector("#willpower_container");
    container.innerHTML = ``;
    for (let i = 1; i <= DB.willpower.value; i++) {
      let newDiv = `
      <div class="col-auto">
          <img class="card-img card-img-top" src="${this.getWillpowerSymbol(i)}" alt="" />
          <div class="card-body">
            <p class="text-end card-text invisible">1</small></p>
          </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", newDiv);
    }
  },

  getWillpowerSymbol(i) {
    if (DB.willpower.spend >= i) return `./img/healthbox_lethal.png`;
    return `./img/healthbox_empty.png`;
  },
};

// eventListener
document.querySelector("#section_home").addEventListener("click", (el) => {
  if (!el.target.getAttribute("func")) return;
  let func = el.target.getAttribute("func").split("_");

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
});

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
        <input class="form-check-input" type="checkbox" id="${rule.id}" ${rule.checked}/>
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
        <input value="${concept.value}" concept="${concept.id}" type="text" class="form-control"/>
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },
};

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
        data-bs-target="#myModal" func="modal_${attribute.id}">
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
      <input type="radio" class="btn-check" id="btnradio_${attribute.id}_${i}" autocomplete="off" ${checked} func="set_${attribute.id}_${i}">
      <label class="btn btn-outline-primary" for="btnradio_${attribute.id}_${i}">${i}</label>
      `;
    }
    return buttons;
  },
};

document.querySelector("#section_attributes").addEventListener("input", (el) => {
  if (!el.target.getAttribute("func")) return;
  let func = el.target.getAttribute("func").split("_");

  if (func[0] == "set") {
    DB.getAttribute(func[1]).value = Number(func[2]);
    _update_all();
  }
});

document.querySelector("#section_attributes").addEventListener("click", (el) => {
  if (!el.target.getAttribute("func")) return;
  let func = el.target.getAttribute("func").split("_");

  if (func[0] == "modal") {
    DB.getAttribute(func[1]).openModal();
  }
});

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
        <div class="col-sm-12 col-md-3 btn btn-primary" func="modal_${skill.id}"
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
      <input type="radio" class="btn-check" name="btnradio_${skill.id}" id="btnradio_${skill.id}_${i}" autocomplete="off" ${checked} func="set_${skill.id}_${i}">
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
          <input value="${el}" type="text" func="input_${skill.id}_${i}" class="form-control ">
          <button func="delete_${skill.id}_${i}" class="btn btn-outline-primary" type="button" func="remove_${skill.id}">X</button>
        </div>
      </div>`;
    });
    return inputs;
  },
};

document.querySelector("#section_skills").addEventListener("input", (el) => {
  if (!el.target.getAttribute("func")) return;
  let func = el.target.getAttribute("func").split("_");

  if (func[0] == "set") {
    DB.getSkill(func[1]).value = Number(func[2]);
    _update_all();
  }

  if (func[0] == "input") {
    DB.getSkill(func[1]).specialties[func[2]] = el.target.value;
  }
});

document.querySelector("#section_skills").addEventListener("click", (el) => {
  if (!el.target.getAttribute("func")) return;
  let func = el.target.getAttribute("func").split("_");

  if (func[0] == "modal") {
    DB.getSkill(func[1]).openModal();
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
