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
    if (HOUSRULES.find("useNumbers").value) return this.value;
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

class Merit extends Ability {
  constructor(id, type, points, prerequisite, description, notes) {
    super(points[0], id);
    this.type = type;
    this.points = points;
    this.prerequisite = prerequisite;
    this.description = description;
    this.notes = notes;
  }
}

class Advantage extends Ability {
  constructor(_baseValue, id, description) {
    super(_baseValue, id);
    this.description = description;
  }

  get value() {
    let wits = ATTRIBUTES.find("wits").value;
    let str = ATTRIBUTES.find("strength").value;
    let dex = ATTRIBUTES.find("dexterity").value;
    let com = ATTRIBUTES.find("composure").value;
    let athletics = SKILLS.find("athletics").value;

    if (this.id == "size") return this._baseValue;
    if (this.id == "speed") return str + dex + 5;
    if (this.id == "initiative") return dex + com;
    if (this.id == "defense")
      if (HOUSRULES.find("noAthletics").value) return Math.min(wits, dex);
      else return Math.min(wits, dex) + athletics;
    if (this.id == "speed") return this._baseValue;
    if (this.id == "beats") return this._baseValue;
    if (this.id == "experience") return this._baseValue;
  }

  set value(x) {
    this._baseValue = x;
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
let HOUSRULES = {
  DB: [
    new Housrule(false, "noAthletics", "Don't add athletics to defense."),
    new Housrule(false, "noAspirations", "Don't use aspirations."),
    new Housrule(false, "useNumbers", "Use numbers instead of dots."),
  ],

  find(rule) {
    return this.DB.find((el) => el.id == rule);
  },
};

let CONCEPTS = {
  DB: [
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

  find(concept) {
    return this.DB.find((el) => el.id == concept);
  },
};

let ATTRIBUTES = {
  DB: [
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

  find(att) {
    return this.DB.find((el) => el.id === att);
  },

  getPoints(type) {
    let array = this.DB.filter((el) => el.type === type);
    if (type === "all") array = this.DB;
    return array.reduce((sum, el) => sum + el.value, 0);
  }, // all, mental, physical or social
};

let SKILLS = {
  DB: [
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

  addSpec(name) {
    this.find(name).specialties.push("");
  },

  deleteSpec(name, nr) {
    this.find(name).specialties.splice(nr, 1);
  },

  find(skill) {
    return this.DB.find((el) => el.id === skill);
  },

  getPoints(type) {
    let array = this.DB.filter((el) => el.type === type);
    if (type === "all") array = this.DB;
    return array.reduce((sum, el) => sum + el.value, 0);
  }, // all, mental, physical or social

  getCountOfSpecalties() {
    return this.DB.reduce((sum, el) => sum + el.specialties.length, 0);
  },

  update() {
    this.DB.forEach((skill) => {
      skill.specialties = skill.specialties.filter((el) => el != "");
    });
  },
};

let MERITS = {
  myMerits: [],
  DB: [
    new Merit(
      "areaOfEpxertise",
      "mental",
      [1, 2, 3],
      ["Resolve 2 and one Skill Specialty"],
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      []
    ),
    new Merit(
      "commonSense",
      "mental",
      [3],
      [],
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      []
    ),
    new Merit("test3", "social", [1], [], "Test number 3", []),
  ],

  add(name) {
    let template = this.find(name);
    this.myMerits.push(
      new Merit(
        template.id,
        template.type,
        template.points,
        template.prerequisite,
        template.description,
        template.notes
      )
    );
  },

  delete(nr) {
    this.myMerits.splice(nr, 1);
  },

  addNote(nr) {
    this.myMerits[nr].notes.push("");
  },

  deleteNote(nr1, nr2) {
    this.myMerits[nr1].notes.splice(nr2, 1);
  },

  changeNote(nr1, nr2, txt) {
    this.myMerits[nr1].notes[nr2] = txt;
  },

  find(merit) {
    return this.DB.find((el) => el.id === merit);
  },

  getPoints() {
    return this.DB.reduce((sum, el) => sum + el.value, 0);
  },

  update() {
    this.myMerits.forEach((merit) => {
      merit.notes = merit.notes.filter((el) => el != "");
    });
  },
};

let ADVANTAGES = {
  DB: [
    new Advantage(5, "size", "All adult human chracters are size 5, unless modified by a Merit."),
    new Advantage(0, "speed", "Lorem ipsum."),
    new Advantage(0, "initiative", "Lorem ipsum."),
    new Advantage(0, "defense", "Lorem ipsum."),
    new Advantage(0, "beats", "Lorem ipsum."),
    new Advantage(0, "experience", "Lorem ipsum."),
  ],

  find(advantage) {
    return this.DB.find((el) => el.id === advantage);
  },
};

let HEALTH = {
  dmg: [],
  id: "health",
  label: "Health",

  get value() {
    let size = ADVANTAGES.find("size").value;
    let stamina = ATTRIBUTES.find("stamina").value;
    return size + stamina;
  },

  _takeDmg(type) {
    let lastIndex = this.dmg.length - 1;
    if (this.dmg.length >= this.value) {
      if (this.dmg[lastIndex] == 1) this.dmg[lastIndex] = 2;
      if (this.dmg[lastIndex] == 0 && type == 2) this.dmg[lastIndex] = 2;
      if (this.dmg[lastIndex] == 0 && type <= 1) this.dmg[lastIndex] = 1;
    }
    if (this.dmg.length < this.value) this.dmg.push(type);
    this.dmg.sort((a, b) => b - a);
  },

  takeBashingDmg() {
    this._takeDmg(0);
  },

  takeLethalDmg() {
    this._takeDmg(1);
  },

  takeAggravatedDmg() {
    this._takeDmg(2);
  },

  healDmg() {
    this.dmg.pop();
  },
};

let WILLPOWER = {
  id: "willpower",
  label: "Willpower",
  spend: 0,

  get value() {
    let res = ATTRIBUTES.find("resolve").value;
    let com = ATTRIBUTES.find("composure").value;
    return res + com;
  },

  gainWillpower() {
    if (this.spend > 0) this.spend += -1;
  },

  spendWillpower() {
    if (this.spend < this.value) this.spend += 1;
  },
};

const DB = {
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
