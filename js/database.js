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
const CONCEPTS = [
  { id: "name", value: "Test", label: "Name" },
  { id: "age", value: "", label: "Age" },
  { id: "player", value: "", label: "Player" },
  { id: "chronicle", value: "", label: "Chronicle" },
  { id: "concept", value: "", label: "Concept" },
  { id: "aspiration1", value: "", label: "First Aspiration" },
  { id: "aspiration2", value: "", label: "Second Aspiration" },
  { id: "aspiration3", value: "", label: "Third Aspiration" },
];

const ADVANTAGES = {
  size: { value: 5, label: "Size" },
  speed: { value: 0, label: "Speed" },
  ini: { value: 0, label: "Initiative Mod" },
  defense: { value: 0, label: "Defense" },
  beats: { value: 0, label: "Beats" },
  xp: { value: 0, label: "Experience" },
  health: { value: 0, label: "Health" },
  willpower: { value: 0, label: "Willpower" },
};

const ATTRIBUTES = [
  {
    id: "intelligence",
    value: 1,
    type: "mental",
    label: "Intelligence",
    description: `Intelligence is your character's book smarts and ability to process data. It represents memory, general knowledge, and ability to solve complex and difficult problems.`,
    tasks: "Memorizing (Intelligence + Composure, instant action)",
  },
  {
    id: "wits",
    value: 1,
    type: "mental",
    label: "Wits",
    description: `Wits represents quick thinking and improvisation. A character with a high Wits responds quickly to new information and situations. It also represents perception and the ability to notice details and subtle tells.`,
    tasks:
      "Perception (Wits + Composure, reflexive action), Catching a dropped object (Wits + Dexterity, instant action)",
  },
  {
    id: "resolve",
    value: 1,
    type: "mental",
    label: "Resolve",
    description: `Resolve represents your character's patience, concentration, and determination. A high Resolve allows a character to focus despite distractions or discouragement.`,
    tasks:
      "Meditation (Resolve + Composure, extended action), Staying Awake (Resolve + Stamina, instant action)",
  },
  // ########################################################
  {
    id: "strength",
    value: 1,
    type: "physical",
    label: "Strength",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!",
    tasks: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: "dexterity",
    value: 1,
    type: "physical",
    label: "Dexterity",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!",
    tasks: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: "stamina",
    value: 1,
    type: "physical",
    label: "Stamina",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!",
    tasks: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  // ########################################################
  {
    id: "presence",
    value: 1,
    type: "social",
    label: "Presence",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!",
    tasks: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: "manipulation",
    value: 1,
    type: "social",
    label: "Manipulation",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!",
    tasks: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    id: "composure",
    value: 1,
    type: "social",
    label: "Composure",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!",
    tasks: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
];

const SKILLS = [
  {
    id: "academics",
    value: 0,
    type: "mental",
    label: "Academics",
    specialties: ["Test", "Test"],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "computer",
    value: 0,
    type: "mental",
    label: "Computer",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "crafts",
    value: 0,
    type: "mental",
    label: "Crafts",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "investigation",
    value: 0,
    type: "mental",
    label: "Investigation",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "medicine",
    value: 0,
    type: "mental",
    label: "Medicine",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "occult",
    value: 0,
    type: "mental",
    label: "Occult",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "politics",
    value: 0,
    type: "mental",
    label: "Politics",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "science",
    value: 0,
    type: "mental",
    label: "Science",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  // ########################################################
  {
    id: "athletics",
    value: 0,
    type: "physical",
    label: "Athletics",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "brawl",
    value: 0,
    type: "physical",
    label: "Brawl",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "drive",
    value: 0,
    type: "physical",
    label: "Drive",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "firearms",
    value: 0,
    type: "physical",
    label: "Firearms",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "larceny",
    value: 0,
    type: "physical",
    label: "Larceny",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "stealth",
    value: 0,
    type: "physical",
    label: "Stealth",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "survival",
    value: 0,
    type: "physical",
    label: "Survival",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "weaponry",
    value: 0,
    type: "physical",
    label: "Weaponry",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  // ########################################################
  {
    id: "animalKen",
    value: 0,
    type: "social",
    label: "Animal Ken",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "empathy",
    value: 0,
    type: "social",
    label: "Empathy",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "expression",
    value: 0,
    type: "social",
    label: "Expression",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "intimidation",
    value: 0,
    type: "social",
    label: "Intimidation",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "persuasion",
    value: 0,
    type: "social",
    label: "Persuasion",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "socialize",
    value: 0,
    type: "social",
    label: "Socialize",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "streetwise",
    value: 0,
    type: "social",
    label: "Streetwise",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
  {
    id: "subterfuge",
    value: 0,
    type: "social",
    label: "Subterfuge",
    specialties: [],
    description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nam quos consequuntur, nostrum tenetur nulla earum laboriosam cum veritatis ab!`,
    sampleActions: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    sampleSpecialties: "Lorem ipsum dolor sit.",
    sampleContacts: "Lorem ipsum dolor sit.",
  },
];

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

const housrules = {
  defense_without_athletics: false,
  no_aspirations: false,
};

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
};
