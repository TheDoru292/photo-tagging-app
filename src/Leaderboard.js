import { useEffect, useState } from "react";
import { getLeaderboard } from "./App";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function getLead() {
      const lead = await getLeaderboard();

      setLeaderboard(lead);
    }

    getLead();
  }, []);

  function formatTime(time) {
    let hours = String(Math.floor(time / 3600)).padStart(2, "0");
    let resultTime = time % 3600;
    let minutes = String(Math.floor(resultTime / 60)).padStart(2, "0");
    let seconds = String(Math.floor(resultTime % 60)).padStart(2, "0");

    let hoursEdited = `${hours}:`;
    if (hoursEdited === "00:") {
      hoursEdited = "";
    }

    let string = `${hoursEdited}${minutes}:${seconds}`;

    return string;
  }

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      {leaderboard.map((item, i) => {
        return (
          <div className="lead">
            <p>{i + 1}</p>
            <p>{item.name}</p>
            <p>{formatTime(item.time)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Leaderboard;
