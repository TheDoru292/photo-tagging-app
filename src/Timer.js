import { useEffect, useState } from "react";

function Timer({ characters, cb }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (characters > 0) {
      interval = setInterval(() => {
        setTime((seconds) => {
          cb(seconds + 1);
          return seconds + 1;
        });
      }, 1000);
    } else if (characters === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [characters]);

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

  return <p>{showTimer()}</p>;
}

export default Timer;
