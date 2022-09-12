"use strict";

/* ============================== Basics ============================== */
class Ability {
  constructor(_baseValue, id) {
    this._baseValue = _baseValue;
    this.id = id;
  }

  get value() {
    return this._baseValue;
  }

  set value(x) {
    this._baseValue = x;
  }

  get label() {
    let label = this.id;
    label = label[0].toUpperCase() + label.slice(1);
    label = label.split(/(?=[A-Z0-9])/);
    return label.join(" ");
  }

  get dots() {
    if (DB.getHousrule("useNumbers").value) return this.value;
    let dots = new Array(5).fill(`<i class="fa-regular fa-circle"></i> `);
    for (let i = 0; i < this.value; i++) dots[i] = `<i class="fa-solid fa-circle"></i> `;
    return dots.join("");
  }
}

class Concept extends Ability {
  constructor(_baseValue, id) {
    super(_baseValue, id);
  }
}

class Attribute extends Ability {
  constructor(_baseValue, id, type, description, tasks) {
    super(_baseValue, id);
    this.type = type;
    this.description = description;
    this.tasks = tasks;
  }
}

class Skill extends Ability {
  constructor(
    _baseValue,
    id,
    type,
    description,
    specialties,
    sampleActions,
    sampleSpecialties,
    sampleContacts
  ) {
    super(_baseValue, id);
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
}

class Advantage extends Ability {
  constructor(_baseValue, id, description, calc) {
    super(_baseValue, id);
    this.description = description;
    this.calc = calc;
  }

  get value() {
    let wits = DB.getAttribute("wits").value;
    let str = DB.getAttribute("strength").value;
    let dex = DB.getAttribute("dexterity").value;
    let com = DB.getAttribute("composure").value;
    let athletics = DB.getSkill("athletics").value;

    if (this.id == "size") return this._baseValue;
    if (this.id == "speed") return str + dex + 5;
    if (this.id == "initiative") return dex + com;
    if (this.id == "defense")
      if (DB.getHousrule("noAthletics").value) return Math.min(wits, dex);
      else return Math.min(wits, dex) + athletics;
    if (this.id == "speed") return this._baseValue;
    if (this.id == "beats") return this._baseValue;
    if (this.id == "experience") return this._baseValue;
  }
}

class Health {
  constructor() {
    this.id = "health";
    this.label = "Health";
    this.dmg = [];
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

  gainWillpower() {
    if (this.spend > 0) this.spend += -1;
  }

  spendWillpower() {
    if (this.spend < this.value) this.spend += 1;
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
}

/* ============================== Database ============================== */
const DB = {
  housrules: [
    new Housrule(false, "noAthletics", "Don't add athletics to defense."),
    new Housrule(false, "noAspirations", "Don't use aspirations."),
    new Housrule(false, "useNumbers", "Use numbers instead of dots."),
  ],
  concepts: [],
  attributes: [],
  skills: [],
  advantages: [],
  health: new Health(),
  willpower: new Willpower(),

  armor: 0,

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
    return this._getPoints(type, "attributes");
  }, // all, mental, physical or social

  getSkillPoints(type) {
    return this._getPoints(type, "skills");
  }, // all, mental, physical or social

  _getPoints(type, ability) {
    let points = 0;
    if (type == "all") {
      DB[ability].forEach((el) => (points += el.value));
    } else {
      DB[ability].filter((el) => el.type == type).forEach((el2) => (points += el2.value));
    }
    return points;
  },

  updateSkills() {
    DB.skills.forEach((skill) => {
      skill.specialties = skill.specialties.filter((el) => el != "");
    });
  },

  // ===============
  async loadDB() {
    await this._loadConcepts();
    await this._loadAttributes();
    await this._loadSkills();
    await this._loadAdvantages();
  },

  async _getCSVFile(url) {
    let file = await fetch(url);
    file = await file.text();
    file = file.split("\r\n");
    file.pop();
    file.shift();
    file = file.map((el) => el.split(";"));
    return file;
  },

  async _loadConcepts() {
    let csvData = await this._getCSVFile("./csv/concepts.csv");
    this.concepts = csvData.map((el) => new Concept(el[0], el[1]));
  },

  async _loadAttributes() {
    let csvData = await this._getCSVFile("./csv/attributes.csv");
    this.attributes = csvData.map((el) => new Attribute(+el[0], el[1], el[2], el[3], el[4]));
  },

  async _loadSkills() {
    let csvData = await this._getCSVFile("./csv/skills.csv");
    this.skills = csvData.map(
      (el) => new Skill(+el[0], el[1], el[2], el[3], el[4].split(","), el[5], el[6], el[7])
    );
    this.updateSkills();
  },

  async _loadAdvantages() {
    let csvData = await this._getCSVFile("./csv/advantages.csv");
    this.advantages = csvData.map((el) => new Advantage(+el[0], el[1], el[2], el[3]));
  },
};

let CONCEPTS = [
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
];

let ATTRIBUTES = [
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

let SKILLS = [
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
];

let ADVANTAGES = [
  new Advantage(5, "size"),
  new Advantage(0, "speed"),
  new Advantage(0, "initiative"),
  new Advantage(0, "defense"),
  new Advantage(0, "beats"),
  new Advantage(0, "experience"),
];
