import { getCharacters } from "./db";

function Box({ coordinates, cb }) {
  const character = getCharacters();

  const styling = {
    position: "absolute",
    top: coordinates.y + 50,
    left: coordinates.x,
    height: 100 + "px",
    width: 75 + "px",
    borderRadius: 5 + "px",
  };

  function checkIfInBox(name) {
    const chara = character.filter((item) => item.name === name);

    if (
      chara[0].minX < coordinates.x &&
      chara[0].maxX > coordinates.x &&
      chara[0].minY < coordinates.y &&
      chara[0].maxY > coordinates.y
    ) {
      cb(`You found ${chara[0].name}!`);
    } else {
      cb("Wrong character! Try again!", true);
    }
  }

  return (
    <div className="box" style={styling}>
      <ul>
        <li>
          <button onClick={() => checkIfInBox("Jotaro")}>Jotaro Kujo</button>
        </li>
        <li>
          <button onClick={() => checkIfInBox("Saitama")}>Saitama</button>
        </li>
        <li>
          <button onClick={() => checkIfInBox("Asuka")}>Asuka</button>
        </li>
      </ul>
    </div>
  );
}

export default Box;
