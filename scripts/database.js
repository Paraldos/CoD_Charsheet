const ATTRIBUTES = {
  mental: {
    /*
    name: "Mental Attributes",
    description:
      "Mental Attributes represent a characters mental resilience, intellect, and acuity.",
    */
    intelligence: {
      value: "3",
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

MASKS_AND_DIRGES = [
  { label: "Authoritarian" },
  { label: "Child" },
  { label: "Competitor" },
  { label: "Conformist" },
  { label: "Conspirator" },
];

CLANS = [
  { label: "Daeva" },
  { label: "Gangrel" },
  { label: "Mekhet" },
  { label: "Nosferatu" },
  { label: "Ventrue" },
];

BLOODLINES = [
  { label: "Test1" },
  { label: "Test2" },
  { label: "Test3" },
  { label: "Test4" },
];

const CONCEPTS = {
  name: {
    value: "",
    label: "Name",
    type: "input",
    aktive: true,
  },
  player: {
    value: "",
    label: "Player",
    type: "input",
    aktive: true,
  },
  chronicle: {
    value: "",
    label: "Chronicle",
    type: "input",
    aktive: true,
  },
  mask: {
    value: 0,
    label: "Mask",
    type: "dropDown",
    options: MASKS_AND_DIRGES,
    aktive: true,
  },
  dirge: {
    value: 0,
    label: "Dirge",
    type: "dropDown",
    options: MASKS_AND_DIRGES,
    aktive: true,
  },
  concept: {
    value: "",
    label: "Concept",
    type: "input",
    aktive: true,
  },
  clan: {
    value: 0,
    label: "Clan",
    type: "dropDown",
    options: CLANS,
    aktive: true,
  },
  bloodline: {
    value: 0,
    label: "Bloodline",
    type: "dropDown",
    options: BLOODLINES,
    aktive: true,
  },
  covenant: {
    value: "",
    label: "Covenant",
    type: "input",
    aktive: true,
  },
  age: {
    value: "",
    label: "Age",
    type: "input",
    aktive: false,
  },
  virtue: {
    value: "",
    label: "Virtue",
    aktive: false,
  },
  vice: {
    value: "",
    label: "Vice",
    aktive: false,
  },
  faction: {
    value: "",
    label: "Faction",
    type: "input",
    aktive: false,
  },
  groupName: {
    value: "",
    label: "Group Name",
    aktive: false,
  },
};
