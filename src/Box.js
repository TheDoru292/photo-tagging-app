import { getCharacters, getPlayer } from "./db";

function Box({ coordinates, cb }) {
  const character = getCharacters();
  const uid = 1234567;

  const styling = {
    position: "absolute",
    top: coordinates.y + 50,
    left: coordinates.x,
    height: 100 + "px",
    width: 75 + "px",
    borderRadius: 5 + "px",
  };

  function setPlayerChara(name) {
    const player = getPlayer(uid);

    const newPlayer = {
      ...player,
      characters: {
        ...player.characters,
        [name]: true,
      },
    };

    // queryToDb(newPlayer)
  }

  function checkIfInBox(name) {
    const chara = character.filter((item) => item.name === name);

    if (
      chara[0].minX < coordinates.relativeX &&
      chara[0].maxX > coordinates.relativeX &&
      chara[0].minY < coordinates.relativeY &&
      chara[0].maxY > coordinates.relativeY
    ) {
      cb(`You found ${chara[0].name}!`);
      setPlayerChara(chara[0].name);
    } else {
      cb("Wrong character! Try again!", true);
    }
  }

  return (
    <div className="box" style={styling}>
      <ul>
        <li>
          <button onClick={() => checkIfInBox("jotaro")}>Jotaro Kujo</button>
        </li>
        <li>
          <button onClick={() => checkIfInBox("saitama")}>Saitama</button>
        </li>
        <li>
          <button onClick={() => checkIfInBox("asuka")}>Asuka</button>
        </li>
      </ul>
    </div>
  );
}

export default Box;
