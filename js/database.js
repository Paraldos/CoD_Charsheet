"use strict";

async function getData(file) {
  // get data as string and put it in csvData
  let response = await fetch(file);
  let csvData = await response.text();

  // transform csvData from string into array of arrays
  csvData = csvData.split("\r\n");
  csvData.pop(); // pop empty last line
  csvData = csvData.map((el) => el.split(";"));

  // get keys (first row in the csv file) and delete it from csvData
  let keys = csvData[0];
  csvData.shift();

  // construct myArray (finall array full of objects) from csvData
  let myArray = [];
  csvData.forEach((data) => {
    let myObject = {};
    keys.forEach((key, i) => (myObject[key] = data[i]));
    myArray.push(myObject);
  });

  // return csv content as array
  return myArray;
}

/* ============================== Basics ============================== */
class Ability {
  constructor(value, id) {
    this.id = id;
    this.value = value;
  }

  get label() {
    let label = this.id;
    label = label[0].toUpperCase() + label.slice(1);
    label = label.split(/(?=[A-Z0-9])/);
    return label.join(" ");
  }

  get dots() {
    if (DB.getHousrule("useNumbers").value) return this.value;
    let dots = new Array(5).fill("⚪");
    for (let i = 0; i < this.value; i++) dots[i] = "⚫";
    return dots.join("");
  }
}

class Concept extends Ability {
  constructor(value, id) {
    super(value, id);
  }

  fillHomeContainer() {
    if (DB.getHousrule("noAspirations").value && this.label.includes("Aspiration")) return;

    let container = document.querySelector(`#home_concepts`);
    let content = `<div class="col-lg-6 col-sm-12"><b>${this.label}:</b> ${this.value}</div>`;
    container.insertAdjacentHTML("beforeend", content);
  }

  fillBasicsContainer() {
    if (DB.getHousrule("noAspirations").value && this.label.includes("Aspiration")) return;

    let container = document.getElementById("basics_concepts");
    let content = `
    <div class="m-2">
      <label class="form-label">${this.label}</label>
      <input value="${this.value}" concept="${this.id}" type="text" class="form-control"/>
    </div>`;
    // <label for="basics_${this.id}" class="form-label">${this.label}</label>
    container.insertAdjacentHTML("beforeend", content);
  }
}

class Attribute extends Ability {
  constructor(value, id, type, description, tasks) {
    super(value, id);
    this.type = type;
    this.description = description;
    this.tasks = tasks;
  }

  fillHomeContainer() {
    let container = document.querySelector(`#home_att_${this.type}`);
    let content = `
    <div 
      modal="${this.id}" 
      class="btn btn-outline-primary text-start" 
      data-bs-toggle="modal" 
      data-bs-target="#myModal">
      ${this.label} ${this.dots}
    </div>`;
    container.insertAdjacentHTML("beforeend", content);
  }

  getButtonForButtongroup(i) {
    let checked = ``;
    if (this.value == i) checked = `checked`;
    return `
    <input type="radio" class="btn-check" name="btnradio_${this.id}" id="btnradio_${this.id}_${i}" autocomplete="off" ${checked}>
    <label class="btn btn-outline-primary" for="btnradio_${this.id}_${i}">${i}</label>
    `;
  }

  fillAttributesContainer() {
    let container = document.querySelector(`#attribute_${this.type}`);
    let content = `
    <div class="row m-1">
      <div
        modal="${this.id}" 
        id="attribute_${this.id}"
        class="btn btn-primary col-3 " 
        data-bs-toggle="modal" 
        data-bs-target="#myModal">
        ${this.label}
      </div>
      <div class="btn-group col-auto" role="group" aria-label="Basic radio toggle button group">
        ${this.getButtonForButtongroup(1)}
        ${this.getButtonForButtongroup(2)}
        ${this.getButtonForButtongroup(3)}
        ${this.getButtonForButtongroup(4)}
        ${this.getButtonForButtongroup(5)}
      </div>
    </div>`;
    container.insertAdjacentHTML("beforeend", content);
  }

  openModal() {
    document.querySelector("#myModal_title").innerText = this.label;
    document.querySelector("#myModal_body").innerHTML = `
    <p>${this.description}</p>
    <p><b>Attribute Tasks: </b>${this.tasks}</p>`;
  }
}

class Skill extends Ability {
  constructor(
    value,
    id,
    type,
    description,
    specialties,
    sampleActions,
    sampleSpecialties,
    sampleContacts
  ) {
    super(value, id);
    this.description = description;
    this.specialties = specialties;
    this.sampleActions = sampleActions;
    this.sampleSpecialties = sampleSpecialties;
    this.sampleContacts = sampleContacts;
    this.type = type;
  }

  get stringOfSpecialties() {
    if (this.specialties.length <= 0) return "";
    else return `(${this.specialties.join(", ")})`;
  }

  fillHomeContainer() {
    let container = document.querySelector(`#home_skill_${this.type}`);
    let content = `
    <div
      id="home_${this.id}"
      modal="${this.id}"
      class="btn btn-outline-primary text-start"
      data-bs-toggle="modal"
      data-bs-target="#myModal">${this.label} ${this.dots} ${this.stringOfSpecialties}
    </div>`;
    container.insertAdjacentHTML("beforeend", content);
  }

  openModal() {
    document.querySelector("#myModal_title").innerText = this.label;
    document.querySelector("#myModal_body").innerHTML = `
    <p>${this.description}</p>
    <p><b>Sample Actions: </b>${this.sampleActions}</p>
    <p><b>Sample Specialties: </b>${this.sampleSpecialties}</p>
    <p><b>Sample Contacts: </b>${this.sampleContacts}</p>`;
  }
}

class Advantage extends Ability {
  constructor(value, id) {
    super(value, id);
  }

  getValue() {
    let wits = DB.getAttribute("wits").value;
    let str = DB.getAttribute("strength").value;
    let dex = DB.getAttribute("dexterity").value;
    let com = DB.getAttribute("composure").value;
    let athletics = DB.getSkill("athletics").value;

    if (this.id == "size") return this.value;
    if (this.id == "speed") return str + dex + 5;
    if (this.id == "initiative") return dex + com;
    if (this.id == "defense")
      if (DB.getHousrule("noAthletics").value) return Math.min(wits, dex);
      else return Math.min(wits, dex) + athletics;
    if (this.id == "speed") return this.value;
    if (this.id == "beats") return this.value;
    if (this.id == "experience") return this.value;
  }

  fillHomeContainer() {
    let container = document.querySelector("#container_advantages");
    let content = `
    <div class="col-sm-12 col-md-4 col-lg-2">
      <b>${this.label}: </b>${this.getValue()}
    </div>`;
    container.insertAdjacentHTML("beforeend", content);
  }
}

class Health {
  constructor() {
    this.id = "health";
    this.label = "Health";
    this.dmg = [];
  }

  getPenalty(i) {
    let penalty = i - this.value + 3;
    if (penalty > 0) return `-${penalty}`;
    return ``;
  }

  getSymbol(i) {
    if (this.dmg[i - 1] == 2) return `./img/healthbox_aggravated.png`;
    if (this.dmg[i - 1] == 1) return `./img/healthbox_lethal.png`;
    if (this.dmg[i - 1] == 0) return `./img/healthbox_bashing.png`;
    return `./img/healthbox_empty.png`;
  }

  fillHomeContainer() {
    document.querySelector("#health_header").innerText = `Health (${this.value})`;
    let container = document.querySelector("#health_container");
    container.innerHTML = ``;
    for (let i = 1; i <= this.value; i++) {
      let newDiv = `
      <div class="col-auto">
        <img class="card-img card-img-top" src="${this.getSymbol(i)}" alt="" />
        <div class="card-body">
          <p class="text-end card-text">${this.getPenalty(i)}</small></p>
        </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", newDiv);
    }
  }

  get value() {
    let size = DB.getAdvantage("size").value;
    let stamina = DB.getAttribute("stamina").value;
    return size + stamina;
  }

  _takeDmg(type) {
    let lastIndex = this.dmg.length - 1;
    if (this.dmg.length >= this.value) {
      if (this.dmg[lastIndex] == 1) this.dmg[lastIndex] = 2;
      if (this.dmg[lastIndex] == 0 && type == 2) this.dmg[lastIndex] = 2;
      if (this.dmg[lastIndex] == 0 && type <= 1) this.dmg[lastIndex] = 1;
    }
    if (this.dmg.length < this.value) this.dmg.push(type);
    this.dmg.sort((a, b) => b - a);
    this.fillHomeContainer();
  }

  takeBashingDmg() {
    this._takeDmg(0);
  }

  takeLethalDmg() {
    this._takeDmg(1);
  }

  takeAggravatedDmg() {
    this._takeDmg(2);
  }

  healDmg() {
    this.dmg.pop();
    this.fillHomeContainer();
  }
}

class Willpower {
  constructor() {
    this.id = "willpower";
    this.label = "Willpower";
    this.spend = 0;
  }

  get value() {
    let res = DB.getAttribute("resolve").value;
    let com = DB.getAttribute("composure").value;
    return res + com;
  }

  getSymbol(i) {
    if (this.spend >= i) return `./img/healthbox_lethal.png`;
    return `./img/healthbox_empty.png`;
  }

  fillHomeContainer() {
    document.querySelector("#willpower_header").innerText = `Willpower (${this.value})`;
    let container = document.querySelector("#willpower_container");
    container.innerHTML = ``;

    for (let i = 1; i <= this.value; i++) {
      let newDiv = `
      <div class="col-auto">
          <img class="card-img card-img-top" src="${this.getSymbol(i)}" alt="" />
          <div class="card-body">
            <p class="text-end card-text invisible">1</small></p>
          </div>
      </div>`;
      container.insertAdjacentHTML("beforeend", newDiv);
    }
  }

  gainWillpower() {
    if (this.spend > 0) this.spend += -1;
    this.fillHomeContainer();
  }

  spendWillpower() {
    if (this.spend < this.value) this.spend += 1;
    this.fillHomeContainer();
  }
}

/* ============================== HOUSRULES ============================== */
class Housrule extends Ability {
  constructor(value, id, description) {
    super(value, id);
    this.description = description;
  }

  get checked() {
    if (this.value) return `checked`;
    else return ``;
  }

  fillBasicsContainer() {
    let container = document.querySelector("#basics_housrules");
    let content = `
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="${this.id}" ${this.checked}/>
      <label class="form-check-label" for="${this.id}">${this.description}</label>
    </div>`;
    container.insertAdjacentHTML("beforeend", content);
  }
}

/* ============================== Vampire ============================== */
const BANES = {
  wantonCurse: {
    label: "The Wanton Curse",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  feralCurse: {
    label: "The Feral Curse",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  tenebrousCurse: {
    label: "The Tenebrous Curse",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  lonelyCurse: {
    label: "The Lonely Curse",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  aloofCurse: {
    label: "The Aloof Curse",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
};

const DISCIPLINES = {
  animalism: { label: "Animalism", value: 0 },
  auspex: { label: "Auspex", value: 0 },
  celerity: { label: "Celerity", value: 0 },
  dominate: { label: "Dominate", value: 0 },
  majesty: { label: "Majesty", value: 0 },
  nightmare: { label: "Nightmare", value: 0 },
  obfuscate: { label: "Obfuscate", value: 0 },
  protean: { label: "Protean", value: 0 },
  resilience: { label: "Resilience", value: 0 },
  vigor: { label: "Vigor", value: 0 },
};

const CLANS = [
  {
    label: "Daeva",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, commodi error labore ullam consequuntur officia, ipsum in earum nihil veniam saepe assumenda numquam! Nobis error, nulla numquam temporibus velit eaque!",
    nickname: "Serpents",
    bane: BANES.wantonCurse,
    favoredAttributes: "Dexterity or Manipulation",
    disciplines: "Celerity, Majesty, Vigor",
  },
  {
    label: "Gangrel",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, commodi error labore ullam consequuntur officia, ipsum in earum nihil veniam saepe assumenda numquam! Nobis error, nulla numquam temporibus velit eaque!",
    nickname: "Savages",
    bane: BANES.feralCurse,
    favoredAttributes: "Composure or Stamina",
    disciplines: "Animalism, Protean, Resilience",
  },
  {
    label: "Mekhet",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, commodi error labore ullam consequuntur officia, ipsum in earum nihil veniam saepe assumenda numquam! Nobis error, nulla numquam temporibus velit eaque!",
    nickname: "Shadows",
    bane: BANES.tenebrousCurse,
    favoredAttributes: "Intelligence or Wits",
    disciplines: "Auspex, Celerity, Obfuscate",
  },
  {
    label: "Nosferatu",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, commodi error labore ullam consequuntur officia, ipsum in earum nihil veniam saepe assumenda numquam! Nobis error, nulla numquam temporibus velit eaque!",
    nickname: "Haunts",
    bane: BANES.lonelyCurse,
    favoredAttributes: "Composure or Strength",
    disciplines: "Nightmare, Obfuscate, Vigor",
  },
  {
    label: "Ventrue",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, commodi error labore ullam consequuntur officia, ipsum in earum nihil veniam saepe assumenda numquam! Nobis error, nulla numquam temporibus velit eaque!",
    nickname: "Lords",
    bane: BANES.aloofCurse,
    favoredAttributes: "Presence or Resolve",
    disciplines: "Animalism, Dominate, Resilience",
  },
];

const MASKS_AND_DIRGES = [
  {
    label: "Authoritarian",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Child",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Competitor",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Conformist",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Conspirator",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Courtesan",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Cult Leader",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Deviant",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Follower",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Guru",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Idealist",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Jester",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Junkie",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Martyr",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Masochist",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Monster",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Nomad",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Nurturer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Perfectionist",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Penitent",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Questioner",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Rebel",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Scholar",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Social Chameleon",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Spy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Survivor",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    label: "Visionary",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ut aperiam ipsum illo culpa rerum voluptatibus voluptatem. Enim porro obcaecati laborum asperiores vero fugiat nostrum! Consectetur velit itaque provident voluptatibus.",
    singleWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    allWillpower: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const BLOODLINES = [{ label: "Test1" }, { label: "Test2" }, { label: "Test3" }, { label: "Test4" }];

/* ============================== Database ============================== */
const DB = {
  housrules: [
    new Housrule(false, "noAthletics", "Don't add athletics to defense."),
    new Housrule(false, "noAspirations", "Don't use aspirations."),
    new Housrule(false, "useNumbers", "Use numbers instead of dots."),
  ],
  concepts: [
    new Concept("", "name"),
    new Concept("", "age"),
    new Concept("", "player"),
    new Concept("", "chronicle"),
    new Concept("", "concept"),
    new Concept("", "vice"),
    new Concept("", "virtue"),
    new Concept("", "aspiration1"),
    new Concept("", "aspiration2"),
    new Concept("", "aspiration3"),
  ],
  attributes: [
    new Attribute(
      1,
      "intelligence",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    new Attribute(
      1,
      "wits",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    new Attribute(
      1,
      "resolve",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    // ============================
    new Attribute(
      1,
      "strength",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    new Attribute(
      1,
      "dexterity",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    new Attribute(
      1,
      "stamina",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    // ============================
    new Attribute(
      1,
      "presence",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    new Attribute(
      1,
      "manipulation",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
    new Attribute(
      1,
      "composure",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      "Lorem ipsum dolor sit."
    ),
  ],
  skills: [
    new Skill(
      0,
      "academics",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "computer",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "crafts",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "investigation",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "medicine",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "occult",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "politics",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "science",
      "mental",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    // ============================
    new Skill(
      0,
      "athletics",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "brawl",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "drive",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "firearms",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "larceny",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "stealth",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "survival",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "weaponry",
      "physical",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    // ============================
    new Skill(
      0,
      "animalKen",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "empathy",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "expression",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "intimidation",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "persuasion",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "socialize",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "streetwise",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
    new Skill(
      0,
      "subterfuge",
      "social",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      [],
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit.",
      "Lorem ipsum dolor sit."
    ),
  ],
  advantages: [
    new Advantage(5, "size"),
    new Advantage(0, "speed"),
    new Advantage(0, "initiative"),
    new Advantage(0, "defense"),
    new Advantage(0, "beats"),
    new Advantage(0, "experience"),
  ],
  health: new Health(),
  willpower: new Willpower(),

  armor: 0,
  // human
  faction: { value: "", label: "Faction", aktive: false },

  // Vampire
  covenant: { value: "", label: "Covenant", aktive: true },
  clan: { value: 0, label: "Clan", aktive: true },
  clans: CLANS,
  bloodlines: BLOODLINES,
  banes: BANES,
  mask: { value: 0, label: "Mask", aktive: true },
  dirge: { value: 0, label: "Dirge", aktive: true },
  masksAndDirges: MASKS_AND_DIRGES,
  disciplines: DISCIPLINES,

  getConcept(con) {
    return this.concepts.find((el) => el.id == con);
  },

  getAttribute(att) {
    return this.attributes.find((el) => el.id == att);
  },

  getSkill(skill) {
    return this.skills.find((el) => el.id == skill);
  },

  getAdvantage(adv) {
    return this.advantages.find((el) => el.id == adv);
  },

  getHousrule(hou) {
    return this.housrules.find((el) => el.id == hou);
  },

  getAttributePoints(type) {
    let points = 0;
    if (type == "all") {
      DB.attributes.forEach((att) => (points += att.value));
    } else {
      DB.attributes.filter((att) => att.type == type).forEach((att2) => (points += att2.value));
    }
    return points;
  }, // all, mental, physical or social
};
