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
// === CLASSES
class Ability {
  constructor(value, id) {
    this.value = value;
    this.id = id;
  }

  fillContainer() {
    if (this._container == undefined || this._div == undefined) return;
    if (DB.housrules.no_aspirations && this.id.includes("aspiration")) return;
    this._container.insertAdjacentHTML("beforeend", this._div);
  }

  get label() {
    let label = this.id;
    label = label[0].toUpperCase() + label.slice(1);
    label = label.split(/(?=[A-Z0-9])/);
    return label.join(" ");
  }

  get dots() {
    let dots = new Array(5).fill("⚪");
    for (let i = 0; i < this.value; i++) dots[i] = "⚫";
    return dots.join("");
  }
}

class Concept extends Ability {
  constructor(value, id) {
    super(value, id);
  }

  get _div() {
    return `<div class="col-lg-6 col-sm-12"><b>${this.label}:</b> ${this.value}</div>`;
  }

  get _container() {
    return document.querySelector(`#home_concepts`);
  }
}

class Attribute extends Ability {
  constructor(value, id, type, description, tasks) {
    super(value, id);
    this.type = type;
    this.description = description;
    this.tasks = tasks;
  }

  get _div() {
    return `<div modal="${this.id}" class="btn btn-outline-primary text-start" data-bs-toggle="modal" data-bs-target="#myModal">${this.label} ${this.dots} </div>`;
  }

  get _container() {
    return document.querySelector(`#home_att_${this.type}`);
  }

  modal() {
    myModal_title.innerText = this.label;
    myModal_body.innerHTML = `
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

  get _div() {
    return `
    <div
      id="home_${this.id}"
      modal="${this.id}"
      class="btn btn-outline-primary text-start"
      data-bs-toggle="modal"
      data-bs-target="#myModal">${this.label} ${this.dots} ${this.stringOfSpecialties}
    </div>`;
  }

  get _container() {
    return document.querySelector(`#home_skill_${this.type}`);
  }

  get stringOfSpecialties() {
    if (this.specialties.length <= 0) return "";
    else return `(${this.specialties.join(", ")})`;
  }

  modal() {
    myModal_title.innerText = this.label;
    myModal_body.innerHTML = `
    <p>${this.description}</p>
    <p><b>Sample Actions: </b>${this.sampleActions}</p>
    <p><b>Sample Specialties: </b>${this.sampleSpecialties}</p>
    <p><b>Sample Contacts: </b>${this.sampleContacts}</p>`;
  }
}

// === DB ENTRIES
const CONCEPTS = [
  new Concept("", "name"),
  new Concept("", "age"),
  new Concept("", "player"),
  new Concept("", "chronicle"),
  new Concept("", "concept"),
  new Concept("", "aspiration1"),
  new Concept("", "aspiration2"),
  new Concept("", "aspiration3"),
  new Concept("", "vice"),
  new Concept("", "virtue"),
];

const ATTRIBUTES = [
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
];

const SKILLS = [
  new Skill(
    1,
    "academics",
    "mental",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    ["Test", "Test2"],
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
];

const ADVANTAGES = [
  { id: "size", value: 5, label: "Size" },
  {
    id: "speed",
    get value() {
      let str = DB.getAttribute("strength").value;
      let dex = DB.getAttribute("dexterity").value;
      return str + dex + 5;
    },
    label: "Speed",
  },
  {
    id: "ini",
    get value() {
      let dex = DB.getAttribute("dexterity").value;
      let com = DB.getAttribute("composure").value;
      return dex + com;
    },
    label: "Initiative Mod",
  },
  {
    id: "defense",
    get value() {
      let wits = DB.getAttribute("wits").value;
      let dex = DB.getAttribute("dexterity").value;
      let athletics = DB.getSkill("athletics").value;
      let min = Math.min(wits, dex);
      if (!DB.housrules.defense_without_athletics) min += athletics;
      return min;
    },
    label: "Defense",
  },
  { id: "beats", value: 0, label: "Beats" },
  { id: "xp", value: 0, label: "Experience" },
  {
    id: "health",
    get value() {
      let size = DB.getAdvantage("size").value;
      let stamina = DB.getAttribute("stamina").value;
      return size + stamina;
    },
    label: "Health",
    dmg: [],
    addBashing() {
      this._addDamage(0);
    },
    addLethal() {
      this._addDamage(1);
    },
    addAggravated() {
      this._addDamage(2);
    },
    _addDamage(type) {
      let lastIndex = this.dmg.length - 1;
      if (this.dmg.length >= this.value) {
        if (this.dmg[lastIndex] == 1) this.dmg[lastIndex] = 2;
        if (this.dmg[lastIndex] == 0 && type == 2) this.dmg[lastIndex] = 2;
        if (this.dmg[lastIndex] == 0 && type <= 1) this.dmg[lastIndex] = 1;
      }
      if (this.dmg.length < this.value) this.dmg.push(type);
      this.dmg.sort((a, b) => b - a);
    },
    heal() {
      this.dmg.pop();
    },
  },
  {
    get value() {
      let res = DB.getAttribute("resolve").value;
      let com = DB.getAttribute("composure").value;
      return res + com;
    },
    id: "willpower",
    spend: 0,
    label: "Willpower",
  },
];

/* ============================== HOUSRULES ============================== */
const housrules = {
  defense_without_athletics: false,
  no_aspirations: false,
};

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

const VICEANDVIRTUE = [];

/* ============================== Database ============================== */
const DB = {
  concepts: CONCEPTS,
  attributes: ATTRIBUTES,
  skills: SKILLS,
  advantages: ADVANTAGES,
  housrules: housrules,

  armor: 0,
  // human
  faction: { value: "", label: "Faction", aktive: false },
  viceAndVirtue: VICEANDVIRTUE,

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

  getAttribute(att) {
    return this.attributes.find((el) => el.id == att);
  },
  getSkill(skill) {
    return this.skills.find((el) => el.id == skill);
  },
  getAdvantage(adv) {
    return this.advantages.find((el) => el.id == adv);
  },
};
