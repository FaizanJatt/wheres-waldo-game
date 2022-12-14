import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";

function App() {
  const [cord, setCord] = useState({
    x: "",
    y: "",
  });
  const [dimensions, setDimensions] = useState({
    x: "",
    y: "",
  });
  const [extra, setExtra] = useState(1);
  let Pat = {
    x: dimensions.x / 1.61,
    y: dimensions.y / 1.3,
  };
  let Diane = {
    x: dimensions.x / 1.33,
    y: dimensions.y / 1.284,
  };
  let Tom = {
    x: dimensions.x / 1.2,
    y: dimensions.y / 1.07,
  };
  const [found, setFound] = useState({
    patrick: false,
    tom: false,
    diane: false,
  });
  const [clientWidth, setClientWidth] = useState("");
  const [selection, setSelection] = useState(false);

  function checkPatrick(pat, x, y) {
    if (
      x >= pat.x - 25 &&
      x <= pat.x + 50 &&
      y >= pat.y - 50 &&
      y <= pat.y + 50
    ) {
      setFound((prev) => {
        return {
          ...prev,
          patrick: true,
        };
      });
    }
  }
  function checkTom(tomm, x, y) {
    if (
      x >= tomm.x - 40 &&
      x <= tomm.x + 50 &&
      y >= tomm.y - 50 &&
      y <= tomm.y + 100
    ) {
      setFound((prev) => {
        return {
          ...prev,
          tom: true,
        };
      });
    }
  }
  function checkDiane(Diane, x, y) {
    if (
      x >= Diane.x - 25 &&
      x <= Diane.x + 50 &&
      y >= Diane.y - 25 &&
      y <= Diane.y + 100
    ) {
      setFound((prev) => {
        return {
          ...prev,
          diane: true,
        };
      });
    }
  }

  function getImageDimensions(e) {
    let clientWidth = e.target.clientWidth;
    let clientHeight = e.target.clientHeight;
    setClientWidth(clientWidth);
    let height = e.target.clientHeight;
    let width = e.target.clientWidth;
    setDimensions({
      x: width,
      y: height,
    });
  }

  const encircle = (e) => {
    e.preventDefault();
    let { pageX: x, pageY: y } = e;
    if (clientWidth > 500) {
      x = x - 40;
      y = y - 30;
      setExtra(100);
      setCord({ x, y });
      setSelection(true);
    } else {
      setExtra(18);
      setCord({ x, y });
      setSelection(true);
    }
  };
  return (
    <div className="App">
      <Header dimensions={dimensions} found={found} />
      {selection && (
        <>
          <span
            style={{ display: "block", top: cord.y, left: cord.x, zIndex: 1 }}
            className="circled"
          ></span>
          <div
            className="container"
            style={{ top: cord.y, left: cord.x + extra, zIndex: 1 }}
          >
            <button
              onClick={() => checkPatrick(Pat, cord.x, cord.y)}
              className={found.patrick ? "options found" : "options"}
            >
              Patrick{found.patrick && <i className="fa-solid fa-check"></i>}
            </button>
            <button
              onClick={() => checkTom(Tom, cord.x, cord.y)}
              className={found.tom ? "options found" : "options"}
            >
              Tom{found.tom && <i className="fa-solid fa-check"></i>}
            </button>
            <button
              onClick={() => checkDiane(Diane, cord.x, cord.y)}
              className={found.diane ? "options found" : "options"}
            >
              Diane{found.diane && <i className="fa-solid fa-check"></i>}
            </button>
          </div>
        </>
      )}
      <div className="MAIN-IMAGE">
        <img
          className="main--img"
          onLoad={getImageDimensions}
          onClick={encircle}
          src="main.jpg"
          alt="main"
        />
      </div>
    </div>
  );
}

export default App;
