import { useState } from "react";
import Box from "./Box";

function Game() {
  const [coordinates, setCoordinates] = useState();
  const [game, setGame] = useState(false);
  const [result, setResult] = useState();

  function handleClick(event) {
    setCoordinates({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });

    setGame(true);
  }

  return (
    <div className="game">
      {game === false ? console.log() : <Box coordinates={coordinates} />}
      <img onMouseDown={handleClick} src="./assets/img/game_image.jpg" alt="" />
    </div>
  );
}

export default Game;
