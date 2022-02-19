import React, {useState, useEffect} from "react";
import "./Stopwatch.css"
import "./Buttons.css"


const Stopwatch = () => {
    const[time1, setTime1] = useState(0);
    const[timer1On, setTimer1On] = useState(false);
    
    const[time2, setTime2] = useState(0);
    const[timer2On, setTimer2On] = useState(false);


    //turn on timer1 and turn off timer 2
    const handleTimer1On = () => {
      setTimer1On(true);
      setTimer2On(false);
    };
    
    //turn off timer 1 and turn on timer 2
    const handleTimer2On = () => {
      setTimer1On(false);
      setTimer2On(true);
    };

    //pause both timer 1&2
    const handleTimer1and2 = () => {
      setTimer1On(false);
      setTimer2On(false);
    };

    //reset both timer 1&2
    const resetTimer1and2 = () => {
      setTime1(0);
      setTime2(0);
      setTimer1On(false);
      setTimer2On(false);
    };


    //timer 1
    useEffect(() => {
      let interval1 = null;

      if (timer1On) {
        interval1 = setInterval(() => {
          // 100ms = 0.1 second
          setTime1(prevTime1 => prevTime1 + 0.01)}, 10) 
      } else {
        clearInterval(interval1)
      }

      return () => clearInterval(interval1)
    }, [timer1On]);

    //timer 2
    useEffect(() => {
      let interval2 = null;

      if (timer2On) {
        interval2 = setInterval(() => {
          // 100ms = 0.1 second
          setTime2(prevTime2 => prevTime2 + 0.01)}, 10) 
      } else {
        clearInterval(interval2)
      }

      return () => clearInterval(interval2)
    }, [timer2On]);

  //convert time_in_seconds into hh:mm:ss +0.ss format
  function format_time_in_seconds (time_in_seconds) {
    let hours_no_remainder = Math.abs(Math.floor(time_in_seconds/3600));
    let hours_remainder_in_seconds = Math.abs(time_in_seconds%3600);
    let minutes_no_remainder = Math.abs(Math.floor(hours_remainder_in_seconds/60));
    let seconds = Math.abs(hours_remainder_in_seconds%60);
    let milliseconds = Math.abs(seconds%1);

    if (time_in_seconds<60) {
      return(
        `${seconds.toFixed(0)}s ${(milliseconds.toFixed(2)).slice(-2)}`
      );
    } else
    if (time_in_seconds<3600) {
      return(
        `${minutes_no_remainder}m ${("0"+Math.floor(seconds)).slice(-2)}s ${(milliseconds.toFixed(2)).slice(-2)}`
      );
    } else
    if (time_in_seconds>=3600) {
      return(
        `${hours_no_remainder}h ${("0"+minutes_no_remainder).slice(-2)}m ${("0"+Math.floor(seconds)).slice(-2)}s ${(milliseconds.toFixed(2)).slice(-2)}`
      );
    };
  };


    return (
    <div className="entire-stopwatch">
      <br></br>
      <div className="left-side">
        <div>Stopwatch 1</div>
        <br></br>
        <div>{format_time_in_seconds(time1)}</div>
        <br></br>
        {!timer1On && (<button onClick={handleTimer1On} className="run-button">Run</button>)}
      </div>

      <div className="right-side">
        <div>Stopwatch 2</div>
        <br></br>
        <div>{format_time_in_seconds(time2)}</div>
        <br></br>
        {!timer2On && (<button onClick={handleTimer2On} className="run-button">Run</button>)}
      </div>  

      <div className="center-content">
        <br></br>
        {timer1On||timer2On ? (<button onClick={handleTimer1and2} className="pause-button">Pause</button>) : ""}
        {time1!=0||time2!=0 ? (<button onClick={resetTimer1and2} className="reset-button">Reset</button>) : ""}
      </div>
      
    </div>
  );
};

export default Stopwatch;
