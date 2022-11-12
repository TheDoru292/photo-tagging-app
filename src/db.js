const character = [
  {
    name: "asuka",
    minX: 417,
    maxX: 491,
    minY: 341,
    maxY: 484,
  },
  {
    name: "jotaro",
    minX: 1460,
    maxX: 1556,
    minY: 90,
    maxY: 189,
  },
  {
    name: "saitama",
    minX: 814,
    maxX: 866,
    minY: 412,
    maxY: 519,
  },
];

const player = [
  {
    uid: 999999,
    characters: {
      asuka: false,
      jotaro: false,
      saitama: false,
    },
  },
  {
    uid: 1234567,
    characters: {
      asuka: false,
      jotaro: false,
      saitama: false,
    },
  },
];

function getCharacters() {
  return character;
}

function getPlayer(uid) {
  let playerFound = player.filter((item) => item.uid === uid);
  return playerFound[0];
}

function getUid() {
  return player.uid;
}

export { getCharacters, getPlayer, getUid };
