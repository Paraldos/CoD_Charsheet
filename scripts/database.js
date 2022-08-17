"use strict";
/* ======================================================
Basics
====================================================== */
const ATTRIBUTES = {
  mental: {
    intelligence: {
      value: "1",
      label: "Intelligence",
      description: `Intelligence is your character's book smarts and ability to process data. It represents memory, general knowledge, and ability to solve complex and difficult problems.`,
    },
    wits: {
      value: "1",
      label: "Wits",
      description: `Wits represents quick thinking and improvisation. A character with a high Wits responds quickly to new information and situations. It also represents perception and the ability to notice details and subtle tells.`,
    },
    resolve: {
      value: "1",
      label: "Resolve",
      description: `Resolve represents your character's patience, concentration, and determination. A high Resolve allows a character to focus despite distractions or discouragement.`,
    },
  },
  physical: {
    strength: {
      value: "1",
      label: "Strength",
      description: "",
    },
    dexterity: {
      value: "1",
      label: "Dexterity",
      description: "",
    },
    stamina: {
      value: "1",
      label: "Stamina",
      description: "",
    },
  },
  social: {
    presence: {
      value: "1",
      label: "Presence",
      description: "",
    },
    manipulation: {
      value: "1",
      label: "Manipulation",
      description: "",
    },
    composure: {
      value: "1",
      label: "Composure",
      description: "",
    },
  },
};

const SKILLS = {
  mental: {
    academics: { value: 0, label: "Academics" },
    computer: { value: 0, label: "Computer" },
    crafts: { value: 0, label: "Crafts" },
    investigation: { value: 0, label: "Investigation" },
    medicine: { value: 0, label: "Medicine" },
    occult: { value: 0, label: "Occult" },
    politics: { value: 0, label: "Politics" },
    science: { value: 0, label: "Science" },
  },
  physical: {
    athletics: { value: 0, label: "Athletics" },
    brawl: { value: 0, label: "Brawl" },
    drive: { value: 0, label: "Drive" },
    firearms: { value: 0, label: "Firearms" },
    larceny: { value: 0, label: "Larceny" },
    stealth: { value: 0, label: "Stealth" },
    survival: { value: 0, label: "Survival" },
    weaponry: { value: 0, label: "Weaponry" },
  },
  social: {
    animalKen: { value: 0, label: "Animal Ken" },
    empathy: { value: 0, label: "Empathy" },
    expression: { value: 0, label: "Expression" },
    intimidation: { value: 0, label: "Intimidation" },
    persuasion: { value: 0, label: "Persuasion" },
    socialize: { value: 0, label: "Socialize" },
    streetwise: { value: 0, label: "Streetwise" },
    subterfuge: { value: 0, label: "Subterfuge" },
  },
};

/* ======================================================
Vampire
====================================================== */
const BANES = {
  wantonCurse: {
    label: "The Wanton Curse",
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
    favoredAttributes: [ATTRIBUTES.dexterity, ATTRIBUTES.manipulation],
    disciplines: [DISCIPLINES.celerity, DISCIPLINES.majesty, DISCIPLINES.vigor],
  },
];

const CLANS1 = {
  daeva: {
    label: "Daeva",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, commodi error labore ullam consequuntur officia, ipsum in earum nihil veniam saepe assumenda numquam! Nobis error, nulla numquam temporibus velit eaque!",
    nickname: "Serpents",
    bane: BANES.wantonCurse,
    favoredAttributes: [ATTRIBUTES.dexterity, ATTRIBUTES.manipulation],
    disciplines: [DISCIPLINES.celerity, DISCIPLINES.majesty, DISCIPLINES.vigor],
  },
};

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

const BLOODLINES = [
  { label: "Test1" },
  { label: "Test2" },
  { label: "Test3" },
  { label: "Test4" },
];

const DB = {
  name: { value: "Test", label: "Name", aktive: true },
  age: { value: "", label: "Age", aktive: false },
  player: { value: "", label: "Player", aktive: true },
  chronicle: { value: "", label: "Chronicle", aktive: true },
  concept: { value: "", label: "Concept", aktive: true },
  covenant: { value: "", label: "Covenant", aktive: true },
  faction: { value: "", label: "Faction", aktive: false },
  groupName: { value: "", label: "Group Name", aktive: false },
  //
  aspirations: ["Test", "", ""],
  //
  attributes: ATTRIBUTES,
  skills: SKILLS,
  //
  clans: CLANS,
  bloodlines: BLOODLINES,
  banes: BANES,
  mask: { value: 0, label: "Mask", aktive: true },
  dirge: { value: 0, label: "Dirge", aktive: true },
  masksAndDirges: MASKS_AND_DIRGES,
  disciplines: DISCIPLINES,
};
