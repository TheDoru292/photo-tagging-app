const character = [
  {
    name: "Asuka",
    minX: 417,
    maxX: 491,
    minY: 341,
    maxY: 484,
  },
  {
    name: "Jotaro",
    minX: 1460,
    maxX: 1556,
    minY: 90,
    maxY: 189,
  },
  {
    name: "Saitama",
    minX: 814,
    maxX: 866,
    minY: 412,
    maxY: 519,
  },
];

const player = {
  uid: 999999,
  characters: {
    asuka: false,
    jotaro: false,
    saitama: false,
  },
};

function getCharacters() {
  return character;
}

function getPlayer() {
  return player;
}

export { getCharacters, getPlayer };
