"use strict";

/* =========================== UPDATE ALL =========================== */
function _update_all() {
  document.querySelectorAll(".empty").forEach((el) => (el.innerHTML = ``));
  home.buildAll();
  basics.buildAll();
  attributes.buildAll();
  skills.buildAll();
  merits.buildAll();
  SKILLS.update();
  MERITS.update();
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

  attribute(name) {
    let attribute = ATTRIBUTES.find(name);
    this.modalTitle.innerText = attribute.label;
    this.modalBody.innerHTML = `
    <p>${attribute.description}</p>
    <p><b>Attribute Tasks: </b>${attribute.tasks}</p>`;
  },

  skill(name) {
    let skill = SKILLS.find(name);
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

  advantage(name) {
    let advantage = ADVANTAGES.find(name);
    this.modalTitle.innerText = advantage.label;
    this.modalBody.innerHTML = `
    <p>${advantage.description}</p>`;
  },
};

/* =========================== EVENTLISTENER =========================== */
document.querySelector("body").addEventListener("click", (el) => {
  let target = el.target;
  if (el.target.localName == "i") target = el.target.parentElement;
  if (!target.getAttribute("func")) return;
  let func = target.getAttribute("func").split("_");

  // attributes
  if (func[0] == "attModal") {
    modal.attribute(func[1]);
  }

  // skills
  if (func[0] == "skillModal") {
    modal.skill(func[1]);
  }

  if (func[0] == "skillAddSpec") {
    SKILLS.addSpec(func[1]);
    _update_all();
  }

  if (func[0] == "skillDeleteSpec") {
    SKILLS.deleteSpec(func[1], func[2]);
    _update_all();
  }

  // merites
  if (func[0] === "meritDelete") {
    MERITS.delete(func[1]);
    _update_all();
  }

  if (func[0] === "meritAdd") {
    MERITS.add(func[1]);
    _update_all();
  }

  if (func[0] === "meritModal") {
    modal.merit(MERITS.find(func[1]));
  }

  if (func[0] === "meritAddNote") {
    MERITS.addNote(func[1]);
    _update_all();
  }

  if (func[0] === "meriteDeleteNote") {
    MERITS.deleteNote(func[1], func[2]);
    _update_all();
  }

  // advantages
  if (func[0] == "advModal") {
    modal.advantage(func[1]);
  }

  // health
  if (func[0] === "dmg") {
    if (func[1] === "heal") HEALTH.healDmg();
    if (func[1] === "bashing") HEALTH.takeBashingDmg();
    if (func[1] === "lethal") HEALTH.takeLethalDmg();
    if (func[1] === "aggravated") HEALTH.takeAggravatedDmg();
    home.buildHealth();
  }

  // willpower
  if (func[0] === "will") {
    if (func[1] === "gain") WILLPOWER.gainWillpower();
    if (func[1] === "spend") WILLPOWER.spendWillpower();
    home.buildWillpower();
  }
});

document.querySelector("body").addEventListener("input", (el) => {
  let target = el.target;
  if (el.target.localName == "i") target = el.target.parentElement;

  if (!target.getAttribute("func")) return;
  let func = target.getAttribute("func").split("_");

  // housrules
  if (func[0] == "housrule") {
    HOUSRULES.find(func[1]).value = el.target.checked;
    _update_all();
  }

  // concepts
  if (func[0] == "meritChangeConcept") {
    CONCEPTS.find(func[1]).value = el.target.value;
  }

  // attributes
  if (func[0] == "attValue") {
    ATTRIBUTES.find(func[1]).value = +func[2];
    _update_all();
  }

  // skills
  if (func[0] == "skillValue") {
    SKILLS.find(func[1]).value = +func[2];
    _update_all();
  }

  if (func[0] == "skillChangeSpec") {
    SKILLS.find(func[1]).specialties[func[2]] = el.target.value;
  }

  // merits
  if (func[0] == "meritChangeNote") {
    MERITS.changeNote(func[1], func[2], el.target.value);
  }

  if (func[0] === "meritValue") {
    MERITS.myMerits[func[1]].value = +func[2];
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
    CONCEPTS.DB.forEach((concept) => {
      if (HOUSRULES.find("noAspirations").value && concept.label.includes("Aspiration")) return;
      let container = document.querySelector(`#home_concepts`);
      let content = `<div class="col-lg-6 col-sm-12"><b>${concept.label}:</b> ${concept.value}</div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildAttributes() {
    ATTRIBUTES.DB.forEach((attribute) => {
      let container = document.querySelector(`#home_att_${attribute.type}`);
      let content = `
      <div 
        class="btn btn-outline-primary text-start"
        func="attModal_${attribute.id}"
        data-bs-toggle="modal"
        data-bs-target="#myModal">
        ${attribute.label} ${attribute.dots}
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildSkills() {
    SKILLS.DB.forEach((skill) => {
      let container = document.querySelector(`#home_skill_${skill.type}`);
      let content = `
        <div
          class="btn btn-outline-primary text-start"
          func="skillModal_${skill.id}"
          data-bs-toggle="modal"
          data-bs-target="#myModal">
          ${skill.label} ${skill.dots} ${skill.stringOfSpecialties}
        </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildAdvantage() {
    ADVANTAGES.DB.forEach((advantage) => {
      let container = document.querySelector("#container_advantages");
      let content = `
      <div 
        class="col-sm-12 col-md-4 col-lg-2 text-center"
        func="advModal_${advantage.id}"
        data-bs-toggle="modal"
        data-bs-target="#myModal">
        ${advantage.label}: ${advantage.value}
      </div>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildHealth() {
    document.querySelector("#health_header").innerText = `Health (${HEALTH.value})`;
    let container = document.querySelector("#health_container");
    container.innerHTML = ``;
    for (let i = 1; i <= HEALTH.value; i++) {
      let newDiv = `
      <div class="col-auto p-1">
        ${this.getHealthSymbol(i)}
        <div class="card-body">
          <p class="text-end card-text">${this.getHealthPenalty(i)}</small></p>
        </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", newDiv);
    }
  },

  getHealthPenalty(i) {
    let penalty = i - HEALTH.value + 3;
    if (penalty > 0) return `-${penalty}`;
    return ``;
  },

  getHealthSymbol(i) {
    if (HEALTH.dmg[i - 1] == 2) return `<i class="fa-solid fa-skull fs-1"></i>`; // aggravated
    if (HEALTH.dmg[i - 1] == 1) return `<i class="fa-solid fa-square-xmark fs-1"></i>`; // lethal
    if (HEALTH.dmg[i - 1] == 0) return `<i class="fa-solid fa-square-minus fs-1"></i>`; // bashing
    return `<i class="fa-regular fa-square fs-1"></i>`; // empty
  },

  buildWillpower() {
    document.querySelector("#willpower_header").innerText = `Willpower (${WILLPOWER.value})`;
    let container = document.querySelector("#willpower_container");
    container.innerHTML = ``;
    for (let i = 1; i <= WILLPOWER.value; i++) {
      let newDiv = `
      <div class="col-auto p-1">
          ${this.getWillpowerSymbol(i)}
      </div>`;
      container.insertAdjacentHTML("beforeend", newDiv);
    }
  },

  getWillpowerSymbol(i) {
    if (WILLPOWER.spend >= i) return `<i class="fa-solid fa-square-xmark fs-1"></i>`; // spend
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
    HOUSRULES.DB.forEach((rule) => {
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
    CONCEPTS.DB.forEach((concept) => {
      if (HOUSRULES.find("noAspirations").value && concept.label.includes("Aspiration")) return;
      let container = document.getElementById("basics_concepts");
      let content = `
      <div class="m-2">
        <label class="form-label">${concept.label}</label>
        <input func="meritChangeConcept_${concept.id}" value="${concept.value}" type="text" class="form-control"/>
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
    this.total.innerHTML = ATTRIBUTES.getPoints("all") - 9;
    this.mental.innerHTML = ATTRIBUTES.getPoints("mental") - 3;
    this.physical.innerHTML = ATTRIBUTES.getPoints("physical") - 3;
    this.social.innerHTML = ATTRIBUTES.getPoints("social") - 3;
  },

  buildAttributes() {
    ATTRIBUTES.DB.forEach((attribute) => {
      let container = document.querySelector(`#attribute_${attribute.type}`);
      let content = `
      <div class="mb-1">
        <!---->
        <button func="attModal_${attribute.id}" class="me-2 mb-2 col-sm-12 col-md-3 btn 
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
      <input type="radio" class="btn-check" id="btnradio_${attribute.id}_${i}" autocomplete="off" ${checked} func="attValue_${attribute.id}_${i}">
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
    this.total.innerHTML = SKILLS.getPoints("all");
    this.specialties_counter.innerHTML = SKILLS.getCountOfSpecalties();
    this.mental.innerHTML = SKILLS.getPoints("mental");
    this.physical.innerHTML = SKILLS.getPoints("physical");
    this.social.innerHTML = SKILLS.getPoints("social");
  },

  buildSkills() {
    SKILLS.DB.forEach((skill) => {
      let container = document.querySelector(`#skills_${skill.type}`);
      let content = `
      <div class="mb-1">
        <!---->
        <button func="skillModal_${skill.id}" class="me-2 mb-2 col-12 col-md-3 btn 
        btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">${skill.label}</button>
        <!---->
        <div class="me-2 mb-2 btn-group" role="group">${this.getButtongroup(skill)}</div>
        <!---->
        <button func="skillAddSpec_${skill.id}" class="mb-2 btn btn-primary">
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
      <input type="radio" class="btn-check" id="rad_${skill.id}_${i}" autocomplete="off" ${checked} func="skillValue_${skill.id}_${i}">
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
        <button func="skillDeleteSpec_${skill.id}_${i}" class="btn btn-outline-danger" type="button" func="remove_${skill.id}">X</button>
        <input func="skillChangeSpec_${skill.id}_${i}" value="${el}" type="text" class="form-control" placeholder="Specialtie">
      </div>`;
    });
    return inputs;
  },
};

/* =========================== MERITS =========================== */
let merits = {
  merits_points_total: document.querySelector("#merits_points_total"),

  buildAll() {
    this.merits_points_total.innerHTML = MERITS.getPoints();
    this.buildDropdown();
    this.buildMyMerits();
  },

  buildDropdown() {
    MERITS.DB.forEach((merit) => {
      let container = document.querySelector(`#merits_dropdown_${merit.type}`);
      let content = `<li><a func="meritAdd_${merit.id}" class="dropdown-item" href="#">${merit.label}</a></li>`;
      container.insertAdjacentHTML("beforeend", content);
    });
  },

  buildMyMerits() {
    MERITS.myMerits.forEach((merit, i) => {
      let container = document.querySelector(`#myMerits_${merit.type}`);
      let content = `
      <div class="mb-2">
        <!---->
        <button func="meritDelete_${i}" class="mb-2 btn btn-danger">X</button>
        <!---->
        <button func="meritModal_${merit.id}" class="me-2 mb-2 col-10 col-md-3 btn 
        btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">${merit.label}</button>
        <!---->
        <div class="me-2 mb-2 btn-group" role="group">${this.getButtongroup(merit, i)}</div>
        <!---->
        <button func="meritAddNote_${i}" class="mb-2 btn btn-primary">
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
      <input type="radio" class="btn-check" id="rad_${merit.id}_${myIndex}_${points}" autocomplete="off" ${checked} func="meritValue_${myIndex}_${points}">
      <label class="btn btn-outline-primary" for="rad_${merit.id}_${myIndex}_${points}">${points}</label>`;
    });
    return buttons;
  },

  getNotes(merit, myIndex) {
    let notes = ``;
    merit.notes.forEach((el, i) => {
      notes += `
      <div class="input-group mb-2">
        <button func="meriteDeleteNote_${myIndex}_${i}" class="btn btn-outline-danger" type="button">X</button>
        <input func="meritChangeNote_${myIndex}_${i}" value="${el}" type="text" class="form-control" placeholder="Note">
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
init("home");
