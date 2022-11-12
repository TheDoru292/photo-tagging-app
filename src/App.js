import Game from "./Game";
import "./assets/style.css";
import { useEffect, useState } from "react";
import { getPlayer } from "./db";

function App() {
  const [time, setTime] = useState(0);
  const [player, setPlayer] = useState(getPlayer());

  useEffect(() => {
    function timer() {
      setInterval(() => {
        setTime((prevValue) => prevValue + 1);
      }, 1000);
    }

    return () => {
      timer();
    };
  }, []);

  function showTimer() {
    let hours = String(Math.floor(time / 3600)).padStart(2, "0");
    let resultTime = time % 3600;
    let minutes = String(Math.floor(resultTime / 60)).padStart(2, "0");
    let seconds = String(Math.floor(resultTime % 60)).padStart(2, "0");
    return (
      <p>
        {hours}:{minutes}:{seconds}
      </p>
    );
  }

  function leftCharacters() {
    console.log(player.characters);
  }

  return (
    <div className="App">
      <header>
        <div className="title">
          <h1>FindCharacters</h1>
        </div>
        <div className="rest">
          {showTimer()}
          {/* {leftCharacters()} */}
        </div>
      </header>
      <Game />
    </div>
  );
}

export default App;
