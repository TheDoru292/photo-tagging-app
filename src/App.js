import Game from "./Game";
import "./assets/style.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import Timer from "./Timer";

const firebaseConfig = {};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const firstTime = localStorage.getItem("account");

function signInAnon() {
  signInAnonymously(auth)
    .then(() => {
      console.log("Logged in!");
      if (firstTime === null) {
        createUserDb();
      }
    })
    .catch((error) => console.log(error.code, error.message));
}

async function createUserDb() {
  const userUid = auth.currentUser;
  await setDoc(doc(db, "users", userUid.uid), {
    characters: {
      asuka: false,
      jotaro: false,
      saitama: false,
    },
    charactersLeft: 3,
  });

  localStorage.setItem("account", true);
}

async function editUserData(obj, name) {
  const userUid = auth.currentUser;
  await setDoc(doc(db, "users", userUid.uid), {
    characters: {
      ...obj.characters,
      [name]: true,
    },
    charactersLeft: obj.charactersLeft - 1,
  });
}

async function getUserData() {
  const userUid = auth.currentUser;
  const docRef = doc(db, "users", userUid.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No document found!");
  }
}

async function getCharacters() {
  const docRef = doc(db, "characters", "first-game");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No document found!");
  }
}

async function getLeaderboard() {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, orderBy("time"), limit(5));

  let array = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push(doc.data());
  });

  return array;
}

signInAnon();

function App() {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const playerData = onSnapshot(
          doc(db, "users", auth.currentUser.uid),
          (doc) => {
            setPlayer(doc.data());
          }
        );
      }
    });

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [seconds]);

  function setTime(time) {
    setSeconds(time);
  }

  function firstLoad() {
    if (loading === true) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="App">
          <header>
            <div className="title">
              <h1>FindCharacters</h1>
            </div>
            <div className="rest">
              <Timer characters={player.charactersLeft} cb={setTime} />
              <p>{player.charactersLeft}</p>
            </div>
          </header>
          <Game charactersLeft={player.charactersLeft} time={seconds} />
        </div>
      );
    }
  }

  return <div>{firstLoad()}</div>;
}

export default App;
export { getUserData, editUserData, getCharacters, getLeaderboard };
