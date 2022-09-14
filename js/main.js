"use strict";

/* =========================== UPDATE ALL =========================== */
function _update_all() {
  document.querySelectorAll(".empty").forEach((el) => (el.innerHTML = ``));
  home.buildAll();
  basics.buildAll();
  attributes.buildAll();
  skills.buildAll();
  merits.buildAll();
  DB.updateSkills();
  DB.updateMerits();
}

/* =========================== NAVBAR =========================== */
let navbar = {
  navLinks: document.querySelectorAll(".nav-link"),
  sections: document.querySelectorAll(".section"),

  click(target) {
    this._updateNavLinks(target);
    this._updateSections(target);
    _update_all();
  },

  _updateNavLinks(target) {
    this.navLinks.forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`#navbar_${target}`).classList.add("active");
  },

  _updateSections(target) {
    this.sections.forEach((sec) => sec.classList.add(`visually-hidden`));
    document.querySelector(`#section_${target}`).classList.remove(`visually-hidden`);
  },
};

document.querySelector("#navbarNav").addEventListener("click", (el) => {
  if (!el.target.classList.contains("nav-link")) return;
  navbar.click(el.target.id.split("_")[1]);
});

/* =========================== MODAL =========================== */
let modal = {
  modalTitle: document.querySelector("#myModal_title"),
  modalBody: document.querySelector("#myModal_body"),

  attribute(att) {
    this.modalTitle.innerText = att.label;
    this.modalBody.innerHTML = `
    <p>${att.description}</p>
    <p><b>Attribute Tasks: </b>${att.tasks}</p>`;
  },

  skill(skill) {
    this.modalTitle.innerText = skill.label;
    this.modalBody.innerHTML = `
    <p>${skill.description}</p>
    <p><b>Sample Actions: </b>${skill.sampleActions}</p>
    <p><b>Sample Specialties: </b>${skill.sampleSpecialties}</p>
    <p><b>Sample Contacts: </b>${skill.sampleContacts}</p>`;
  },

  merit(merit) {
    this.modalTitle.innerText = merit.label;
    this.modalBody.innerHTML = `
      <p>${merit.description}</p>`;
  },

  advantage(advantage) {
    this.modalTitle.innerText = advantage.label;
    this.modalBody.innerHTML = `
    <p>${advantage.description}</p>
    <p><b>Calculation: </b>${advantage.calc}</p>
    `;
  },
};

/* =========================== EVENTLISTENER =========================== */
document.querySelector("body").addEventListener("click", (el) => {
  let target = el.target;
  if (el.target.localName == "i") target = el.target.parentElement;
  if (!target.getAttribute("func")) return;
  let func = target.getAttribute("func").split("_");

  // attributes
  if (func[0] == "modal" && func[1] == "att") {
    modal.attribute(DB.getAttribute(func[2]));
  }

  // skills
  if (func[0] == "modal" && func[1] == "skill") {
    modal.skill(DB.getSkill(func[2]));
  }

  if (func[0] == "addSpecialtie") {
    DB.getSkill(func[1]).specialties.push("");
    _update_all();
  }

  if (func[0] == "delSpec") {
    DB.getSkill(func[1]).specialties.splice(func[2], 1);
    _update_all();
  }

  // merites
  if (func[0] === "delMerit") {
    DB.myMerits.splice(func[2], 1);
    _update_all();
  }

  if (func[0] === "addMerit") {
    let merit = DB.getMerit(func[1]);
    DB.myMerits.push(
      new Merit(
        merit.id,
        merit.type,
        merit.points,
        merit.prerequisite,
        merit.description,
        merit.notes
      )
    );
    _update_all();
  }

  if (func[0] === "modal" && func[1] === "merit") {
    modal.merit(DB.getMerit(func[2]));
  }

  if (func[0] === "addMeritNote") {
    DB.myMerits[func[1]].notes.push("");
    _update_all();
  }

  if (func[0] === "delMeriteNote") {
    DB.myMerits[func[1]].notes.splice(func[2], 1);
    _update_all();
  }

  // advantages
  if (func[0] == "modal" && func[1] == "adv") {
    modal.advantage(DB.getAdvantage(func[2]));
  }

  // health
  if (func[0] == "dmg") {
    if (func[1] == "heal") DB.health.healDmg();
    if (func[1] == "bashing") DB.health.takeBashingDmg();
    if (func[1] == "lethal") DB.health.takeLethalDmg();
    if (func[1] == "aggravated") DB.health.takeAggravatedDmg();
    home.buildHealth();
  }

  // willpower
  if (func[0] == "will") {
    if (func[1] == "gain") DB.willpower.gainWillpower();
    if (func[1] == "spend") DB.willpower.spendWillpower();
    home.buildWillpower();
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

  if (func[0] == "inputSpecialtie") {
    DB.getSkill(func[1]).specialties[func[2]] = el.target.value;
  }

  if (func[0] == "meritNote") {
    DB.myMerits[func[1]].notes[func[2]] = el.target.value;
  }

  if (func[0] === "set" && func[1] === "merit") {
    DB.myMerits[func[2]].value = +func[3];
    _update_all();
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
          data-bs-target="#myModal">
          ${skill.label} ${skill.dots} ${skill.stringOfSpecialties}
        </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildAdvantage() {
    DB.advantages.forEach((advantage) => {
      let container = document.querySelector("#container_advantages");
      let content = `
      <div 
        class="col-sm-12 col-md-4 col-lg-2 text-center"
        func="modal_adv_${advantage.id}"
        data-bs-toggle="modal"
        data-bs-target="#myModal">
        ${advantage.label}: ${advantage.value}
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
    this.updatePointCounter();
    this.buildAttributes();
  },

  updatePointCounter() {
    this.total.innerHTML = DB.getAttributePoints("all") - 9;
    this.mental.innerHTML = DB.getAttributePoints("mental") - 3;
    this.physical.innerHTML = DB.getAttributePoints("physical") - 3;
    this.social.innerHTML = DB.getAttributePoints("social") - 3;
  },

  buildAttributes() {
    DB.attributes.forEach((attribute) => {
      let container = document.querySelector(`#attribute_${attribute.type}`);
      let content = `
      <div class="mb-1">
        <!---->
        <button func="modal_att_${attribute.id}" class="me-2 mb-2 col-sm-12 col-md-3 btn 
        btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">${attribute.label}</button>
        <!---->
        <div class="mb-2 btn-group" role="group">${this.getButtongroup(attribute)}</div>
        <!---->
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
      <label class="btn btn-outline-primary" for="btnradio_${attribute.id}_${i}">${i}</label>`;
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
  specialties_counter: document.querySelector("#specialties_counter"),

  buildAll() {
    this.updatePointCounter();
    this.buildSkills();
  },

  updatePointCounter() {
    this.total.innerHTML = DB.getSkillPoints("all");
    this.specialties_counter.innerHTML = DB.getCountOfSpecalties();
    this.mental.innerHTML = DB.getSkillPoints("mental");
    this.physical.innerHTML = DB.getSkillPoints("physical");
    this.social.innerHTML = DB.getSkillPoints("social");
  },

  buildSkills() {
    DB.skills.forEach((skill) => {
      let container = document.querySelector(`#skills_${skill.type}`);
      let content = `
      <div class="mb-1">
        <!---->
        <button func="modal_skill_${skill.id}" class="me-2 mb-2 col-12 col-md-3 btn 
        btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">${skill.label}</button>
        <!---->
        <div class="me-2 mb-2 btn-group" role="group">${this.getButtongroup(skill)}</div>
        <!---->
        <button func="addSpecialtie_${skill.id}" class="mb-2 btn btn-primary">
        Add Specialtie</button>
        <!---->
        <div class="col-12 input-group">${this.getSpecialties(skill)}</div>
        <!---->
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  getButtongroup(skill) {
    let buttons = ``;
    for (let i = 0; i <= 5; i++) {
      let checked = skill.value == i ? `checked` : ``;
      buttons += `
      <input type="radio" class="btn-check" id="rad_${skill.id}_${i}" autocomplete="off" ${checked} func="set_skill_${skill.id}_${i}">
      <label class="btn btn-outline-primary" for="rad_${skill.id}_${i}">${i}</label>
      `;
    }
    return buttons;
  },

  getSpecialties(skill) {
    let inputs = ``;
    skill.specialties.forEach((el, i) => {
      inputs += `
      <div class="input-group mb-2">
        <button func="delSpec_${skill.id}_${i}" class="btn btn-outline-danger" type="button" func="remove_${skill.id}">X</button>
        <input func="inputSpecialtie_${skill.id}_${i}" value="${el}" type="text" class="form-control" placeholder="Specialtie">
      </div>`;
    });
    return inputs;
  },
};

/* =========================== MERITS =========================== */
let merits = {
  merits_points_total: document.querySelector("#merits_points_total"),

  buildAll() {
    this.merits_points_total.innerHTML = DB.getMeritsPoints();
    this.buildDropdown();
    this.buildMyMerits();
  },

  buildDropdown() {
    DB.merits.forEach((merit) => {
      let container = document.querySelector(`#merits_dropdown_${merit.type}`);
      let content = `<li><a func="addMerit_${merit.id}" class="dropdown-item" href="#">${merit.label}</a></li>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildMyMerits() {
    DB.myMerits.forEach((merit, i) => {
      let container = document.querySelector(`#myMerits_${merit.type}`);
      let content = `
      <div class="mb-2">
        <!---->
        <button func="delMerit_${i}" class="mb-2 btn btn-danger">X</button>
        <!---->
        <button func="modal_merit_${merit.id}" class="me-2 mb-2 col-10 col-md-3 btn 
        btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">${merit.label}</button>
        <!---->
        <div class="me-2 mb-2 btn-group" role="group">${this.getButtongroup(merit, i)}</div>
        <!---->
        <button func="addMeritNote_${i}" class="mb-2 btn btn-primary">
        Add Note</button>
        <!---->
        <div class="col-12 input-group">${this.getNotes(merit, i)}</div>
        <!---->
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  getButtongroup(merit, myIndex) {
    let buttons = ``;
    merit.points.forEach((points) => {
      let checked = merit.value === points ? `checked` : ``;
      buttons += `
      <input type="radio" class="btn-check" id="rad_${merit.id}_${myIndex}_${points}" autocomplete="off" ${checked} func="set_merit_${myIndex}_${points}">
      <label class="btn btn-outline-primary" for="rad_${merit.id}_${myIndex}_${points}">${points}</label>`;
    });
    return buttons;
  },

  getNotes(merit, myIndex) {
    let notes = ``;
    merit.notes.forEach((el, i) => {
      notes += `
      <div class="input-group mb-2">
        <button func="delMeriteNote_${myIndex}_${i}" class="btn btn-outline-danger" type="button">X</button>
        <input func="meritNote_${myIndex}_${i}" value="${el}" type="text" class="form-control" placeholder="Note">
      </div>`;
    });
    return notes;
  },
};

/* =========================== INIT =========================== */
async function init(startpage) {
  // await DB.loadDB();
  navbar.click(startpage);
}
init("merits");
