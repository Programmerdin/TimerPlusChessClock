import React, {useState, useEffect} from "react";


const Timer = () => {
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

    

    //input desired time where 500 would equal 5min
    const[desired_time1, setDesiredTime1] = useState('');
    const[desired_time2, setDesiredTime2] = useState('');

    //get digit on nth position of the text
    const get_digit_of_nth_position = (time_in_text_format, n) => {
      let digit_retrieved = time_in_text_format[n];
      return digit_retrieved;
    };

    //push text into an array in reverse order 
    let time_digits_in_array = [];
    for (let i = desired_time1.length; i >= 0; i--) {
      time_digits_in_array.push(get_digit_of_nth_position(desired_time1, i));
    }

    //convert time_digits_in_array into a number in seconds and times the array digits by 1 to convert to number format 
    //need to convert into seconds first because inputs like 599: 5 minutes 99 seconds should be displayed as 6min39seconds
    let time_in_seconds = 0;
    for (let i = 1; i < time_digits_in_array.length; i++) {
      if (i === 1) { //1s of seconds *need to still times it by 1 to change it from text format to number format
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*1;
      } else 
      if (i === 2) { //10s of seconds
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*10;
      } else 
      if (i === 3) { //1s of minutes
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*60;
      } else 
      if (i === 4) { //10s of minutes
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*600;
      } else
      if (i === 5) { //1s of hours
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*3600;
      } else
      if (i === 6) { //10s of hours
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*36000;
      } else
      if (i === 7) { //1s of days
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*24*3600;
      } else
      if (i === 8) { //10s of days
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*240*3600;
      } else
      if (i === 9) { //100s of days
        time_in_seconds = time_in_seconds + time_digits_in_array[i]*2400*3600;
      } else {return null}
    };

    //convert time_in_seconds into dd:hh:mm:ss format in text
    let days_no_remainder = Math.floor(time_in_seconds/(24*3600));
    let days_remainder_in_seconds = time_in_seconds%(24*3600);
    let hours_no_remainder = Math.floor(days_remainder_in_seconds/3600);
    let hours_remainder_in_seconds = days_remainder_in_seconds%3600;
    let minutes_no_remainder = Math.floor(hours_remainder_in_seconds/60);
    let minutes_remainder_in_seconds = hours_remainder_in_seconds%60;


    return (
    <div>
        <h1>Timer</h1>
        
        <input 
          type="number" 
          value={time_in_seconds - time1}
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

        <br></br>
        <br></br>
        
        <p>desired time1</p>
        
        <form>
          <input 
            type="text"
            value={desired_time1}
            onChange={(e) => setDesiredTime1(e.target.value)}
          ></input>
        </form>
        
        <p>
          {`${("0"+days_no_remainder).slice(-2)}:${("0"+hours_no_remainder).slice(-2)}:${("0"+minutes_no_remainder).slice(-2)}:${("0"+minutes_remainder_in_seconds).slice(-2)}`}
        </p>
        
    </div>
  );
};

export default Timer;