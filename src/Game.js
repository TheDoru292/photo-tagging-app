import { useState, useRef, useEffect } from "react";
import Box from "./Box";
import Leaderboard from "./Leaderboard";

function Game({ time, charactersLeft, cb }) {
  const [coordinates, setCoordinates] = useState();
  const [game, setGame] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [message, setMessage] = useState();
  const [leaderboard, setLeaderboard] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    if (charactersLeft === 0) {
      setLeaderboard(true);
    }
  }, [charactersLeft]);

  function handleClick(event) {
    const scaleX = 1920 / divRef.current.offsetWidth;
    const scaleY = 1080 / divRef.current.offsetHeight;
    const offsetTop = divRef.current.offsetTop;
    const offsetLeft = divRef.current.offsetLeft;
    const relativeX = (event.pageX - offsetLeft) * scaleX;
    const relativeY = (event.pageY - offsetTop) * scaleY;

    if (game === true) {
      setGame(false);
    } else if (showInstructions === true) {
      setShowInstructions(false);
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
      return (
        <Box coordinates={coordinates} cb={setMessageCb} state={setGame} />
      );
    }
  }

  function showInstruction() {
    if (showInstructions === true) {
      return (
        <div className="instructions">
          <h1>Welcome!</h1>
          <p>Your objective is to find 3 characters!</p>
          <div className="characters">
            <div className="card">
              <img src="./assets/img/jotaro.webp" alt="" />
              <p>Jotaro</p>
            </div>
            <div className="card">
              <img src="./assets/img/asuka.webp" alt="" />
              <p>Asuka</p>
            </div>
            <div className="card">
              <img src="./assets/img/saitama.webp" alt="" />
              <p>Saitama</p>
            </div>
          </div>
          <button onClick={() => setShowInstructions(false)}>Ok</button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function leaderboardElement() {
    if (leaderboard === true) {
      return <Leaderboard />;
    }
  }

  const imgStyling = {
    filter: showInstructions === true ? "brightness(50%)" : "brightness(100%)",
  };

  return (
    <div className="game" ref={divRef}>
      {showBox()}
      {showMessage()}
      {showInstruction()}
      {leaderboardElement()}
      <div>
        <img
          onMouseDown={(event) => {
            handleClick(event);
          }}
          style={imgStyling}
          src="./assets/img/game_image.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Game;
