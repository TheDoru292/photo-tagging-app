import { useState, useRef } from "react";
import Box from "./Box";

function Game() {
  const [coordinates, setCoordinates] = useState();
  const [game, setGame] = useState(false);
  const [message, setMessage] = useState();
  const divRef = useRef();

  function handleClick(event) {
    const scaleX = 1920 / divRef.current.offsetWidth;
    const scaleY = 1080 / divRef.current.offsetHeight;
    const offsetTop = divRef.current.offsetTop;
    const offsetLeft = divRef.current.offsetLeft;
    const relativeX = (event.pageX - offsetLeft) * scaleX;
    const relativeY = (event.pageY - offsetTop) * scaleY;

    if (game === true) {
      setGame(false);
    } else {
      setCoordinates({
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
        relativeX: relativeX,
        relativeY: relativeY,
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

  function showBox() {
    if (game === true) {
      return <Box coordinates={coordinates} cb={setMessageCb} />;
    }
  }

  return (
    <div className="game" ref={divRef}>
      {showBox()}
      {showMessage()}
      <img onMouseDown={handleClick} src="./assets/img/game_image.jpg" alt="" />
    </div>
  );
}

export default Game;
