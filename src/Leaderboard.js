import { useEffect, useState } from "react";
import { addUserScore, getLeaderboard } from "./App";

function Leaderboard({ playerTime }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [name, setName] = useState("");

  async function getLead() {
    const lead = await getLeaderboard();

    setLeaderboard(lead);
  }

  useEffect(() => {
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

  async function submitScore(event) {
    event.preventDefault();
    await addUserScore(name, playerTime);
    setSubmit(false);
    setSubmited(true);
  }

  function displaySubmitScore() {
    return (
      <div className="lead">
        <form onSubmit={(e) => submitScore(e)} action="">
          <div className="lead-child">
            <label className="wh100" htmlFor="player-name">
              Player Name
            </label>
            <input
              type="text"
              name="player-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              id="player-name"
            />
          </div>
          <div className="lead-child">
            <p className="wh100">Your time:</p>
            <p>{formatTime(playerTime)}</p>
          </div>
          <div className="lead-buttons">
            <button type="submit">Submit score</button>
            <button onClick={() => setSubmit(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  function displayLeaderboard() {
    getLead();

    if (leaderboard.length > 0) {
      return (
        <div className="lead">
          <div className="lead-score-div">
            {leaderboard.map((item, i) => {
              return (
                <div className="score">
                  <p className="lead-ranking">{i + 1}.</p>
                  <p className="lead-nickname">{item.name}</p>
                  <p className="lead-timing">{formatTime(item.time)}</p>
                </div>
              );
            })}
          </div>
          <div className="lead-buttons">
            <button
              disabled={submited === true ? true : false}
              onClick={() => setSubmit(true)}
            >
              Submit score
            </button>
            <button onClick={() => window.location.reload(false)}>Retry</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="lead">
          <div className="lead-score-div">
            <p>There are no scores submitted yet! Want to submit yours?</p>
          </div>
          <div className="lead-buttons">
            <button onClick={() => setSubmit(true)}>Submit score</button>
            <button onClick={() => window.location.reload(false)}>Retry</button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="lead-container">
        {submit === true ? displaySubmitScore() : displayLeaderboard()}
      </div>
    </div>
  );
}

export default Leaderboard;
