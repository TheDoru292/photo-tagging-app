import Game from "./Game";
import "./assets/style.css";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(0);

  setInterval(() => {
    setTime(time + 1);
  }, 1000);

  function showTimer() {
    console.log(time);
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

  return (
    <div className="App">
      <header>
        <h1>FindCharacters</h1>
        <p>{showTimer()}</p>
      </header>
      <Game />
    </div>
  );
}

export default App;
