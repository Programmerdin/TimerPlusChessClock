import React, {useState, useEffect} from "react";


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
          setTime1(prevTime1 => prevTime1 + 0.1)}, 100) 
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
          setTime2(prevTime2 => prevTime2 + 0.1)}, 100) 
      } else {
        clearInterval(interval2)
      }

      return () => clearInterval(interval2)
    }, [timer2On]);


    return (
    <div>
        <h1>Stopwatch</h1>
        <input 
          type="number" 
          value={time1}
          onChange={(e) => setTime1(e.target.value * 1)} // *1 to convert to number from string
        ></input>

        <input 
          type="number" 
          value={time2}
          onChange={(e) => setTime2(e.target.value * 1)} // *1 to convert to number from string
        ></input>

        {!timer1On && (<button onClick={handleTimer1On}>Run timer 1</button>)}
        {!timer2On && (<button onClick={handleTimer2On}>Run timer 2</button>)}
        {timer1On||timer2On ? (<button onClick={handleTimer1and2}>Pause</button>) : ""}
        {time1!=0||time2!=0 ? (<button onClick={resetTimer1and2}>reset</button>) : ""}
        
    </div>
  );
};

export default Stopwatch;
