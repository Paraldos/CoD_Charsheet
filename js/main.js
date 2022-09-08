"use strict";

// ============== navbar
const navLinks = document.querySelectorAll(".nav-link");
const navbar_home = document.getElementById("navbar_home");
const navbar_basics = document.getElementById("navbar_basics");
const navbar_attributes = document.getElementById("navbar_attributes");
//
const sections = document.querySelectorAll(".section");
const home = document.getElementById("home");
const basics_section = document.getElementById("basics_section");
const attributes_section = document.getElementById("attributes_section");

// ============== modal
const myModal_title = document.querySelector("#myModal_title");
const myModal_body = document.querySelector("#myModal_body");

// ============== home
const home_concepts = document.querySelector("#home_concepts");
//
const home_att_mental = document.querySelector("#home_att_mental");
const home_att_physical = document.querySelector("#home_att_physical");
const home_att_social = document.querySelector("#home_att_social");
//
const home_skill_mental = document.querySelector("#home_skill_mental");
const home_skill_physical = document.querySelector("#home_skill_physical");
const home_skill_social = document.querySelector("#home_skill_social");
//
const container_advantages = document.querySelector("#container_advantages");
//
const health_header = document.querySelector("#health_header");
const health_container = document.querySelector("#health_container");
const dmg_bashing = document.querySelector("#dmg_bashing");
const dmg_lethal = document.querySelector("#dmg_lethal");
const dmg_aggravated = document.querySelector("#dmg_aggravated");
const heal = document.querySelector("#heal");
//
const willpower_header = document.querySelector("#willpower_header");
const willpower_container = document.querySelector("#willpower_container");
const spend_willpower = document.querySelector("#spend_willpower");
const gain_willpower = document.querySelector("#gain_willpower");

// ============== attributes
const attributes_total = document.querySelector("#attributes_total");

/* =========================== GENERAL FUNCTIONS =========================== */
function _getPoints_attribute(type) {
  // enter mental, physical, social or all
  let points = 0;
  if (type == "all") DB.attributes.forEach((attribute) => (points += attribute.value));
  else
    DB.attributes
      .filter((att) => att.type == type)
      .forEach((attribute) => (points += attribute.value));
  return points;
}

/* =========================== UPDATE ALL =========================== */
function _update_all() {
  _build_home();
  _create_attributes2();
}
_update_all();

/* =========================== NAVBAR =========================== */
// ====== default settings when page is loaded
switch (0) {
  case 0:
    _navbar_click(navbar_home, home);
    break;
  case 1:
    _navbar_click(navbar_basics, basics_section);
    break;
  case 2:
    _navbar_click(navbar_attributes, attributes_section);
    break;
}

// ====== navbar buttons
navbar_home.addEventListener("click", () => _navbar_click(navbar_home, home));
navbar_basics.addEventListener("click", () => _navbar_click(navbar_basics, basics_section));
navbar_attributes.addEventListener("click", () =>
  _navbar_click(navbar_attributes, attributes_section)
);

// ====== navbar click event
function _navbar_click(button, section) {
  _update_navbar(button);
  _update_content(section);
}

function _update_navbar(button) {
  navLinks.forEach((link) => link.classList.remove("active"));
  button.classList.add("active");
}

function _update_content(section) {
  for (let section of sections) section.classList.add(`visually-hidden`);
  section.classList.remove(`visually-hidden`);
}

/* =========================== HOME =========================== */
// build boxes
function _build_home() {
  _build_concepts();
  _build_attributes();
  _build_skills();
  _build_advantages();
  _build_health();
  _build_willpower();
}

function _build_concepts() {
  home_concepts.innerHTML = ``;
  DB.concepts.forEach((concept) => concept.fillContainer());
}

function _build_attributes() {
  home_att_mental.innerHTML = `<p class="fw-bold fs-5 text-center mb-0">Mental</p>`;
  home_att_physical.innerHTML = `<p class="fw-bold fs-5 text-center mb-0">Physical</p>`;
  home_att_social.innerHTML = `<p class="fw-bold fs-5 text-center mb-0">Social</p>`;
  DB.attributes.forEach((attribute) => attribute.fillContainer());
}

function _build_skills() {
  home_skill_mental.innerHTML = `<p class="text-center mb-0"><span class="fw-bold fs-5">Mental</span> (-3 unskilled)</p>`;
  home_skill_physical.innerHTML = `<p class="text-center mb-0"><span class="fw-bold fs-5">Physical</span> (-1 unskilled)</p>`;
  home_skill_social.innerHTML = `<p class="text-center mb-0"><span class="fw-bold fs-5">Social</span> (-1 unskilled)</p>`;
  DB.skills.forEach((skill) => skill.fillContainer());
}

// eventListener
document.querySelector("#home_attributes").addEventListener("click", (el) => {
  let attribute = el.target.getAttribute("modal");
  if (attribute != null) DB.getAttribute(attribute).modal();
});

document.querySelector("#home_skills").addEventListener("click", (el) => {
  let skill = el.target.getAttribute("modal");
  if (skill != null) DB.getSkill(skill).modal();
});

// ======  advantages
function _build_advantages() {
  container_advantages.innerHTML = ``;
  _add_advantage(DB.getAdvantage("size"));
  _add_advantage(DB.getAdvantage("speed"));
  _add_advantage(DB.getAdvantage("ini"));
  _add_advantage(DB.getAdvantage("defense"));
  _add_advantage(DB.getAdvantage("beats"));
  _add_advantage(DB.getAdvantage("xp"));
}

function _add_advantage(advantage) {
  let newDiv = `<div class="col-sm-12 col-md-4 col-lg-2"><b>${advantage.label}: </b>${advantage.value}</div>`;
  container_advantages.insertAdjacentHTML("beforeend", newDiv);
}

// health
dmg_bashing.addEventListener("click", () => {
  DB.getAdvantage("health").addBashing();
  _build_health();
});
dmg_lethal.addEventListener("click", () => {
  DB.getAdvantage("health").addLethal();
  _build_health();
});
dmg_aggravated.addEventListener("click", () => {
  DB.getAdvantage("health").addAggravated();
  _build_health();
});
heal.addEventListener("click", () => {
  DB.getAdvantage("health").heal();
  _build_health();
});

function _build_health() {
  health_header.innerText = `Health (${DB.getAdvantage("health").value})`;
  _add_healthboxes();
}

function _add_healthboxes() {
  let health = DB.getAdvantage("health");
  // empty container
  health_container.innerHTML = ``;
  // loop over health and fill container
  for (let i = 1; i <= health.value; i++) {
    // =========
    let penaltyCounter = i - health.value + 3;
    let penalty = ``;
    if (penaltyCounter > 0) penalty = `-${penaltyCounter}`;
    // =========
    let symbol = `empty`;
    if (health.dmg[i - 1] == 2) symbol = `aggravated`;
    if (health.dmg[i - 1] == 1) symbol = `lethal`;
    if (health.dmg[i - 1] == 0) symbol = `bashing`;
    // =========
    let newDiv = `
    <div class="col-auto">
      <img class="card-img card-img-top" src="./img/healthbox_${symbol}.png" alt="" />
      <div class="card-body">
        <p class="text-end card-text">${penalty}</small></p>
      </div>
    </div>`;
    health_container.insertAdjacentHTML("beforeend", newDiv);
  }
}

// willpower
spend_willpower.addEventListener("click", () => _spend_willpower());
gain_willpower.addEventListener("click", () => _gain_willpower());

function _build_willpower() {
  willpower_header.innerText = `Willpower (${DB.getAdvantage("willpower").value})`;
  _app_willpowerbox();
}

function _spend_willpower() {
  let willpower = DB.getAdvantage("willpower");
  if (willpower.spend < willpower.value) willpower.spend += 1;
  _build_willpower();
}

function _gain_willpower() {
  let willpower = DB.getAdvantage("willpower");
  if (willpower.spend > 0) willpower.spend += -1;
  _build_willpower();
}

function _app_willpowerbox() {
  let willpower = DB.getAdvantage("willpower");
  // empty container
  willpower_container.innerHTML = ``;
  // loop over willpower and fill container
  for (let i = 1; i <= willpower.value; i++) {
    let symbol = `empty`;
    if (willpower.spend >= i) symbol = `lethal`;
    let newDiv = `
    <div class="col-auto">
        <img class="card-img card-img-top" src="./img/healthbox_${symbol}.png" alt="" />
        <div class="card-body">
          <p class="text-end card-text invisible">1</small></p>
        </div>
    </div>`;
    willpower_container.insertAdjacentHTML("beforeend", newDiv);
  }
}

/* =========================== ATTRIBUTES =========================== */
function _create_attributes2() {
  // update attributes total
  attributes_total.innerHTML = `
    <b>Total Points Distributed:</b>  ${_getPoints_attribute("all") - 9}`;

  // empty container and add header
  _update_attribute2_header("mental");
  _update_attribute2_header("physical");
  _update_attribute2_header("social");

  // loop over attributes and fill container with content
  DB.attributes.forEach((attribute) => {
    _add_attribute2(attribute);
    _add_attribut2_click(attribute);
  });
}

function _update_attribute2_header(type) {
  let container = document.querySelector(`#attribute_${type}2`);
  let points = _getPoints_attribute(type);
  let name = type[0].toUpperCase() + type.slice(1);
  container.innerHTML = `<p class=""><b>${name}</b> (${points} Points)</p>`;
}

function _add_attribut2_click(attribute) {
  let domElement = document.querySelector(`#attribute2_${attribute.id}`);
  domElement.addEventListener("click", () => _modal_attribut(attribute));
}

function _add_attribute2(attribute) {
  let container = document.querySelector(`#attribute_${attribute.type}2`);
  let txt = `
  <div class="row m-1">
    <div
    id="attribute2_${attribute.id}"
    class="btn btn-outline-dark col-auto" 
    data-bs-toggle="modal" 
    data-bs-target="#myModal">
    ${attribute.label}
    </div>

    <div class="btn-group col-auto" role="group">
      ${_add_attribute2_input(1, attribute)}
      ${_add_attribute2_input(2, attribute)}
      ${_add_attribute2_input(3, attribute)}
      ${_add_attribute2_input(4, attribute)}
      ${_add_attribute2_input(5, attribute)}
    </div>
  </div>`;
  container.insertAdjacentHTML("beforeend", txt);

  return;

  // container
  let newContainer = document.createElement("div");
  newContainer.classList = `row m-1`;
  container.appendChild(newContainer);

  // name button
  let newButton = document.createElement("div");
  newButton.classList = `btn btn-outline-dark col-auto`;
  newButton.setAttribute(`data-bs-toggle`, "modal");
  newButton.setAttribute(`data-bs-target`, "#myModal");
  newButton.innerText = attribute.label;
  newButton.addEventListener("click", () => _modal_attribut(attribute));
  newContainer.appendChild(newButton);

  // radio button group
  let newBtnGroup = document.createElement("div");
  newBtnGroup.classList = "btn-group col-auto";
  newBtnGroup.setAttribute(`role`, `group`);
  newContainer.appendChild(newBtnGroup);

  // fill button group
  for (let i = 1; i < 6; i++) {
    // `<input id="btnradio_${attribute.id}_${i}" class="btn-check" type="radio" name="btnradio_${attribute.id}_${i}" autocomplete="off" checked="${i == attribute.value}"></input>`
    let newInput = document.createElement("input");
    newInput.id = `btnradio_${attribute.id}_${i}`;
    newInput.classList = "btn-check";
    newInput.setAttribute(`type`, `radio`);
    newInput.setAttribute(`name`, `btnradio_${attribute.id}_${i}`);
    newInput.setAttribute(`autocomplete`, `off`);
    if (i == attribute.value) newInput.checked = true;
    newInput.addEventListener("click", () => {
      attribute.value = i;
      _update_all();
    });
    newBtnGroup.appendChild(newInput);

    // `<div class="btn btn-outline-dark" for="btnradio_${attribute.id}_${i}">${i}</div>`;
    let newLabel = document.createElement("label");
    newLabel.classList = "btn btn-outline-dark";
    newLabel.setAttribute(`for`, `btnradio_${attribute.id}_${i}`);
    newLabel.innerText = `${i}`;
    newBtnGroup.appendChild(newLabel);
  }
}

function _add_attribute2_input(i, attribute) {
  return `
  <input 
  id="btnradio_${attribute.id}_${i}" 
  class="btn-check" 
  type="radio" 
  name="btnradio_${attribute.id}_${i}" 
  autocomplete="off"
  value="1"
  </input>

  <div 
  class="btn btn-outline-dark" 
  for="btnradio_${attribute.id}_${i}">${i}
  </div>
  `;
}
