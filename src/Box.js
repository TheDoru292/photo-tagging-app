import { useEffect, useState } from "react";
import { editUserData, getCharacters, getUserData } from "./App";

function Box({ coordinates, cb, state }) {
  const [player, setPlayer] = useState();
  const [loading, setLoading] = useState(true);

  const styling = {
    position: "absolute",
    top: coordinates.y + 50,
    left: coordinates.x,
    height: 100 + "px",
    width: 75 + "px",
    borderRadius: 5 + "px",
  };

  useEffect(() => {
    if (loading === true) {
      async function getData() {
        setPlayer(await getUserData());
      }

      getData();

      setLoading(false);
    }
  }, [loading, setLoading, player]);

  async function setPlayerChara(name) {
    editUserData(player, name);
    state(false);
  }

  async function checkIfInBox(name) {
    const character = await getCharacters();

    const chara = character.characters.filter((item) => item.name === name);

    if (player.charactersLeft === 0) {
      console.log("Woah there buddy");
    } else if (
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
