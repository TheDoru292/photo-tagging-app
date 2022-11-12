import { useState } from "react";
import Box from "./Box";

function Game() {
  const [coordinates, setCoordinates] = useState();
  const [game, setGame] = useState(false);
  const [message, setMessage] = useState();

  function handleClick(event) {
    if (game === true) {
      setGame(false);
    } else {
      setCoordinates({
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      });
      setGame(true);
    }
  }

  function setMessageCb(message, errorBoolean = false) {
    setMessage({ message: message, error: errorBoolean });
    setTimeout(() => {
      setMessage();
    }, 5000);
  }

  function showMessage() {
    if (message !== undefined) {
      const styling = {
        backgroundColor: message.error
          ? "rgb(255, 107, 107)"
          : "rgb(95, 255, 116)",
      };

      return (
        <div className="message" style={styling}>
          <p>{message.message}</p>
        </div>
      );
    }
  }

  return (
    <div className="game">
      {game === false ? (
        console.log()
      ) : (
        <Box coordinates={coordinates} cb={setMessageCb} />
      )}
      {showMessage()}
      <img onMouseDown={handleClick} src="./assets/img/game_image.jpg" alt="" />
    </div>
  );
}

export default Game;
