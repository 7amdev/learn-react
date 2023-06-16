import React, { useState, useEffect } from "react";    

const Stopwatch = function () {
    const [time, set_time]   = useState(0);
    const [stopwatch_active, set_stopwatch_active] = useState(true);

    useEffect(function () {

        let interval = null; 

        if (stopwatch_active) {
            interval = setInterval(function () {   
                set_time(function (previous_value) {
                    return previous_value + 1;
                });
            }, 1000); 
        }

        return (
            function () {
                clearInterval(interval);
            }
        );
    }, [stopwatch_active]);

    const set_start_callback = function (previous_value) {
        return !previous_value;
    };  

    const on_stopwatch_active = function () {
        set_stopwatch_active( set_start_callback );
    };

    const formatteTime = new Date(time * 1000).toISOString().substr(11, 8);

    console.log(`Main Component Render: ${formatteTime}`);

    return (
        <section className="stopwatch-frame">
            <h1>Stopwatch</h1>
            <button 
                type="button" 
                onClick={on_stopwatch_active}
                aria-pressed={!stopwatch_active}>
                Start/Stop
            </button>

            <p>{ formatteTime }</p>
        </section>
    );
};

export default Stopwatch;