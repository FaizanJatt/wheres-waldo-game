import { useState, useEffect } from "react";
import Confetti from "react-confetti";
export default function Header({ found, dimensions }) {
  const [showChara, setShowChara] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [time, setTime] = useState({
    min: minutes,
    sec: seconds,
  });
  const Timecounter = () => {
    if (!hasWon) {
      setSeconds((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const id = setInterval(Timecounter, [1000]);
    return () => {
      clearInterval(id);
    };
  }, [Timecounter]);
  function showAllCharacter() {
    setShowChara((prev) => !prev);
  }

  function remaining() {
    if (found.patrick && found.diane && found.tom) {
      if (hasWon === false) setHasWon((prev) => !prev);
    }
  }
  remaining();
  if (seconds === 60) {
    setSeconds((prev) => prev - 60);
    setMinutes((prev) => prev + 1);
  }
  useEffect(() => {
    setTime((prev) => {
      return {
        ...prev,
        min: minutes,
        sec: seconds,
      };
    });
  }, [hasWon]);

  if (hasWon && console.log(time));

  return (
    <div className="header">
      {hasWon && (
        <Confetti
          width={dimensions.x}
          numberOfPieces={600}
          height={dimensions.y}
        />
      )}
      <p>Search Game</p>
      <p>
        {minutes} : {seconds}
      </p>
      <div className="chara" onClick={showAllCharacter}>
        Find
        {hasWon && (
          <p className="winning-text">
            You won in {minutes} mins and {seconds} seconds!{" "}
            {minutes < 5 && "Amazing"}
            {minutes > 5 && "Not bad"}
          </p>
        )}
        {!hasWon && showChara && (
          <div className="characters">
            <div className="info--container">
              <div className="info--left">
                <p className={found.tom ? "chara--name found" : "chara--name"}>
                  Tom {found.tom && <i className="fa-solid fa-check"></i>}
                </p>
                <p className="chara--details">Tom & Jerry Show</p>
              </div>
              <img alt="tom" src="characters/tom.jpg"></img>
            </div>
            <div className="info--container">
              <div className="info--left">
                <p
                  className={
                    found.patrick ? "chara--name found" : "chara--name"
                  }
                >
                  Patrick{" "}
                  {found.patrick && <i className="fa-solid fa-check"></i>}
                </p>
                <p className="chara--details">Spongebob </p>
              </div>
              <img alt="patrick" src="characters/patrickstar.png"></img>
            </div>
            <div className="info--container">
              <div className="info--left">
                <p
                  className={found.diane ? "chara--name found" : "chara--name"}
                >
                  Diane {found.diane && <i className="fa-solid fa-check"></i>}
                </p>
                <p className="chara--details">Seven Deadly Sins</p>
              </div>
              <img alt="diane" src="characters/diane.jpg"></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
