import React, { useState, useEffect } from "react";

const TimerTesting = () => {
  //set userinput useState
  const [user_input1_state,setUserInput1State] = useState('');
  const [user_input2_state,setUserInput2State] = useState('');

  //set timer useState
  const [timer1,setTimer1] = useState(0);
  const [timer2,setTimer2] = useState(0);
  const [timer1On,setTimer1On] = useState(false);
  const [timer2On,setTimer2On] = useState(false);
  //turn timers on/off
  const handleSetTimer1On = () => {
    setTimer1On(true);
  };
  const handleSetTimer1Off = () => {
    setTimer1On(false);
  };

  //set output useState
  const [output1_state,setOutput1State] = useState(0);
  const [output2_state,setOutput2State] = useState(0);


  //Reset
  const ResetTimer1and2 = () => {
    setTimer1(0);
    setTimer2(0);
    setTimer1On(false);
    setTimer2On(false);
  };

  //update both input and output state as user types
  const handleInput1AndOutput1States = (user_input) => {
    setUserInput1State(user_input);
    setOutput1State(user_input);
  };
  
  //1.user types pure nums in
  //2.turn it into formatted nums within the input field 
  //3.take the formatted nums and unformat it into pure seconds 
  //and update it to output state when run1 is pressed
  //output state - timer = seconds left
  //4.whenever pause is pressed
  //take seconds left and convert it into perf formatted nums 
  //then update it to user input state 
  
  //rawnums: raw input
  //level1Format: formatted to be time but not correcting 66s into 1m6s
  //level2Format: formatted time and correct 
  function rawToLevel1Format (timer_raw_input) {
    if (!timer_raw_input) return timer_raw_input;
    const clean_raw_input = timer_raw_input.replace(/[^\d]/g, "");
    const clean_raw_input_length = clean_raw_input.length;
    if (clean_raw_input_length < 3) { //return seconds
      return clean_raw_input
    ;} else
    if (clean_raw_input_length < 4) { //return mm ss
      return(
        `${clean_raw_input.slice(0,1)} ${clean_raw_input.slice(-2)}`
      );
    } else 
    if (clean_raw_input_length < 5) { //return mm ss
      return(
        `${clean_raw_input.slice(0,2)} ${clean_raw_input.slice(-2)}`
      );
    } else 
    if (clean_raw_input_length < 6) { //return mm ss
      return(
        `${clean_raw_input.slice(0,1)} ${clean_raw_input.slice(-4,-2)} ${clean_raw_input.slice(-2)}`
      );
    } else 
    if (clean_raw_input_length < 7) { //return mm ss
      return(
        `${clean_raw_input.slice(0,2)} ${clean_raw_input.slice(-4,-2)} ${clean_raw_input.slice(-2)}`
      );
    } else return (
      `${clean_raw_input.slice(0,-4)} ${clean_raw_input.slice(-4,-2)} ${clean_raw_input.slice(-2)}`
    );
  };
  const handleRawToLevel1Format = (e) => {
    const level1_formatted_time = rawToLevel1Format(e.target.value);
    setUserInput1State(level1_formatted_time);
  };

  function Level1FormatToPureSeconds (level1_formatted_time_input) {
    //remove spaces from the level1 formatted time and covert it into number format
    const cleaned_level1_formatted_time = level1_formatted_time_input.replace(/\s+/g, '');

    //get character length of the cleaned level1 formatted time
    let length_of_cleaned_level1_formatted_time = cleaned_level1_formatted_time.length;

    //below 2 lines for for loop that will add up all the seconds from each digit of cleaned lvl1 formatted time
    let time_in_pure_seconds = 0;
    const time_multiply_factor_array = [1,10,60,600,3600,36000,360000,3600000];

    for (let i=length_of_cleaned_level1_formatted_time; i>0; i--){
      time_in_pure_seconds = time_in_pure_seconds + (Number(cleaned_level1_formatted_time.charAt(i-1))*Number(time_multiply_factor_array[length_of_cleaned_level1_formatted_time-i]));
      // //get an array 1,10,60,600,3600,36000 and look up what to times it by based on i
      // //add the (specific digit x value from array) to time in pure seconds
      console.log(time_in_pure_seconds);
    };
  };

  //timer 1
  useEffect(() => {
    let interval1 = null;

    if (timer1On) {
      interval1 = setInterval(() => {
        // 100ms = 0.1 second
        setTimer1(prevTime1 => prevTime1 + 0.01)}, 10) 
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
        setTimer2(prevTime2 => prevTime2 + 0.01)}, 10) 
    } else {
      clearInterval(interval2)
    }
    return () => clearInterval(interval2)
  }, [timer2On]);

  return(
    <div>
      <input 
        onChange={(e)=>handleRawToLevel1Format(e)}
        value={user_input1_state}
      ></input>
      <button onClick={handleSetTimer1On}>Run</button>
      <button onClick={handleSetTimer1Off}>Pause</button>
      <button onClick={ResetTimer1and2}>Reset</button>
      <p>user_input1_state:{user_input1_state}</p>
      <p>output1_state:{output1_state}</p>
      <p>timer1:{timer1}</p>
      <p>output1-timer1:{output1_state-timer1}</p>
    </div>
  );
};

export default TimerTesting;