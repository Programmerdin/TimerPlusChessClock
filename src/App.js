import React, { useState } from "react";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import "./App.css";

import TimerTesting from "./TimerTesting";
import react from "react";


function App() {
  
  //display only one componenet at a time Timer or Stopwatch
  const[displayTimer, setDisplayTimer]=useState(true);
  const[displayStopwatch, setDisplayStopwatch]=useState(false);
  //show Timer and not show Stopwatch
  const handle_show_timer = () => {
    setDisplayTimer(true);
    setDisplayStopwatch(false);
  };
  //show Stopwatch and not show Timer
  const handle_show_stopwatch = () => {
    setDisplayTimer(false);
    setDisplayStopwatch(true);
  };

  return (
    <React.Fragment>
      <div className="main_body">
        <div className="entire-top-toggle">
          <div className="left-side-top-toggle">
            <button 
              onClick={handle_show_timer}
              className={displayTimer ? "display-component-true" : "display-component-false"}
            >Timer</button>
          </div>
          <div className="right-side-top-toggle">
            <button 
              onClick={handle_show_stopwatch}
              className={displayStopwatch ? "display-component-true" : "display-component-false"}
            >Stopwatch</button>
          </div>
        </div>

        <div className={!displayTimer && "display-content-false"}>
          <TimerTesting></TimerTesting>
        </div>
        <div className={!displayStopwatch && "display-content-false"}>
          <Stopwatch></Stopwatch>
        </div>
      </div>
      

    </React.Fragment>

  );
}

export default App;
