import React, { useState, useEffect } from "react";
import "./Timer.css"
import "./Buttons.css"
import "./Timer-InputDisplayOutput.css"

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




  const[user_input1,SetUserInput1] = useState('77');
  const[user_input2,SetUserInput2] = useState('500');

  //format user input into hh:mm:ss format
  function format_timer_input (timer_input) {
      const clean_timer_input = timer_input.replace(/[^\d]/g,"");
      const timer_input_length = clean_timer_input.length;
      
      if (timer_input_length === 0) { //return seconds
        return `0s`
      ;} else
      if (timer_input_length < 3) { //return seconds
        return `${clean_timer_input}s`
      ;} else
      if (timer_input_length < 4) { //return mm:ss
        return(
          `${clean_timer_input.slice(0,1)}m ${clean_timer_input.slice(-2)}s`
        );
      } else 
      if (timer_input_length < 5) { //return mm:ss
        return(
          `${clean_timer_input.slice(0,2)}m ${clean_timer_input.slice(-2)}s`
        );
      } else 
      if (timer_input_length < 6) { //return mm:ss
        return(
          `${clean_timer_input.slice(0,1)}h ${clean_timer_input.slice(-4,-2)}m ${clean_timer_input.slice(-2)}s`
        );
      } else 
      if (timer_input_length < 7) { //return mm:ss
        return(
          `${clean_timer_input.slice(0,2)}h ${clean_timer_input.slice(-4,-2)}m ${clean_timer_input.slice(-2)}s`
        );
      } else return (
        `${clean_timer_input.slice(0,-4)}h ${clean_timer_input.slice(-4,-2)}m ${clean_timer_input.slice(-2)}s`
      );
  };

  //convert user input to seconds

  //get digit on nth position of the text
  const get_digit_of_nth_position = (time_in_text_format, n) => {
    let digit_retrieved = time_in_text_format[n];
    return digit_retrieved;
  };

  //push text into an array in reverse order 
  function push_time_text_into_an_array (time_in_text_format) {
    let time_digits_in_array = [];
    for (let i = time_in_text_format.length; i >= 0; i--) {
        time_digits_in_array.push(get_digit_of_nth_position(time_in_text_format, i));
    };
    return time_digits_in_array;
  };

  //convert time_digits_in_array into a number in seconds and times the array digits by 1 to convert to number format 
  //need to convert into seconds first because inputs like 599: 5 minutes 99 seconds should be displayed as 6min39seconds
  function convert_time_digits_in_array_into_seconds (time_in_text_format) {
    let time_in_seconds = 0;
    let time_array = push_time_text_into_an_array(time_in_text_format);
      for (let i = 1; i < time_array.length; i++) {
        if (i === 1) { //1s of seconds *need to still times it by 1 to change it from text format to number format
          time_in_seconds = time_in_seconds + time_array[i]*1;
        } else 
        if (i === 2) { //10s of seconds
          time_in_seconds = time_in_seconds + time_array[i]*10;
        } else 
        if (i === 3) { //1s of minutes
          time_in_seconds = time_in_seconds + time_array[i]*60;
        } else 
        if (i === 4) { //10s of minutes
          time_in_seconds = time_in_seconds + time_array[i]*600;
        } else
        if (i === 5) { //1s of hours
            time_in_seconds = time_in_seconds + time_array[i]*3600;
        } else
        if (i === 6) { //10s of hours
            time_in_seconds = time_in_seconds + time_array[i]*36000;
        } else
        if (i === 7) { //100s of hours
            time_in_seconds = time_in_seconds + time_array[i]*360000;
        } else
        if (i === 8) { //1,000s of hours
            time_in_seconds = time_in_seconds + time_array[i]*3600000;
        } else
        if (i === 9) { //10,000s of hours
            time_in_seconds = time_in_seconds + time_array[i]*36000000;
        } else return (0);
      };
      return time_in_seconds;
  };

  //convert time_in_seconds into hh:mm:ss format
  function format_time_in_seconds (time_in_seconds) {
    let hours_no_remainder = Math.abs(Math.floor(time_in_seconds/3600));
    let hours_remainder_in_seconds = Math.abs(time_in_seconds%3600);
    let minutes_no_remainder = Math.abs(Math.floor(hours_remainder_in_seconds/60));
    let seconds = Math.abs(hours_remainder_in_seconds%60);
    
    if(time_in_seconds<-3600){
      return(
        `${hours_no_remainder}h ${("0"+minutes_no_remainder).slice(-2)}m ${Math.floor(seconds)}`
      );
    } else
    if (time_in_seconds<-60) {
      return(
        `${minutes_no_remainder}m ${("0"+Math.floor(seconds)).slice(-2)}s`
      );
    } else
    if (time_in_seconds===0) {
      return(
        `${seconds.toFixed(0)}s`
      );
    } else
    if (time_in_seconds<60) {
      return(
        `${seconds.toFixed(0)}s`
      );
    } else
    if (time_in_seconds<3600) {
      return(
        `${minutes_no_remainder}m ${("0"+Math.floor(seconds)).slice(-2)}s`
      );
    } else
    if (time_in_seconds>=3600) {
      return(
        `${hours_no_remainder}h ${("0"+minutes_no_remainder).slice(-2)}m ${("0"+Math.floor(seconds)).slice(-2)}s`
      );
    };
  };

    return(
        <div className="entire-timer">
          <div className="left-side">
            <br></br>
            <div className="timer-input-field-div">
              <input
                className={timer1On||timer2On?"timer-input-field-false":"timer-input-field"}
                type="number"
                value={user_input1}
                onChange={(e) => SetUserInput1(e.target.value)}
              ></input>
            </div>
            
            <div 
              className="timer-display-field-div"
            >{format_timer_input(user_input1)}</div>
            <div
              className={timer1On||timer2On?"timer-output-field-div":"timer-output-field-div-false"}
            >{format_time_in_seconds(convert_time_digits_in_array_into_seconds(user_input1)-time1)}</div>
            <br></br>
            <br></br>
            <br></br>
            {!timer1On && (<button onClick={handleTimer1On} className="run-button">Run</button>)}
          </div>

          <div className="right-side">
            <br></br>
            <div className="timer-input-field-div">
              <input
                className={timer1On||timer2On?"timer-input-field-false":"timer-input-field"}
                type="number"
                value={user_input2}
                onChange={(e) => SetUserInput2(e.target.value)}
              ></input>
            </div>

            <div 
              className="timer-display-field-div"
            >{format_timer_input(user_input2)}</div>
            
            <div
              className={timer1On||timer2On?"timer-output-field-div":"timer-output-field-div-false"}
            >{format_time_in_seconds(convert_time_digits_in_array_into_seconds(user_input2)-time2)}</div>
            <br></br>
            <br></br>
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

export default Timer;