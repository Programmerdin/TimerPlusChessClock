import React, {useState, useEffect} from "react";

const TimerTesting = () => {
    //input desired time where 500 would equal 5min
    const[desired_time1, setDesiredTime1] = useState('199');
    const[desired_time2, setDesiredTime2] = useState('299');

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
            if (i === 7) { //1s of days
                time_in_seconds = time_in_seconds + time_array[i]*24*3600;
            } else
            if (i === 8) { //10s of days
                time_in_seconds = time_in_seconds + time_array[i]*240*3600;
            } else
            if (i === 9) { //100s of days
                time_in_seconds = time_in_seconds + time_array[i]*2400*3600;
            } else {return null}
        };
        return time_in_seconds;
    };

    //convert time_in_seconds into dd:hh:mm:ss format in text
    function convert_time_in_seconds_into_time_format (time_in_text_format) {
        let time_in_seconds = convert_time_digits_in_array_into_seconds(time_in_text_format);

        let days_no_remainder = Math.floor(time_in_seconds/(24*3600));
        let days_remainder_in_seconds = time_in_seconds%(24*3600);
        let hours_no_remainder = Math.floor(days_remainder_in_seconds/3600);
        let hours_remainder_in_seconds = days_remainder_in_seconds%3600;
        let minutes_no_remainder = Math.floor(hours_remainder_in_seconds/60);
        let minutes_remainder_in_seconds = hours_remainder_in_seconds%60;

        return(
            <p>
                {`${("0"+days_no_remainder).slice(-2)}:${("0"+hours_no_remainder).slice(-2)}:${("0"+minutes_no_remainder).slice(-2)}:${("0"+minutes_remainder_in_seconds).slice(-2)}`}
            </p>
        );
    };
    
    return(
        <div>
            {convert_time_in_seconds_into_time_format(desired_time1)}
        </div>
    );
};

export default TimerTesting
