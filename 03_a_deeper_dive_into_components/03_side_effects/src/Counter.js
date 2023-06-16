import React, { Fragment, useState, useEffect } from "react";

// Updates Browser document title as side effects

const Counter = function () {
    const [counter, set_counter] = useState(0);
    const [counter_internal, set_counter_internal] = useState(0);

//  Run the side effect bellow ONCE when the component mounts.

    useEffect(function () {
        let saved_counter_value = localStorage.getItem('ultimate_counter_value');

        if (!saved_counter_value) return;

        set_counter(parseInt(saved_counter_value));

    }, []);

//  [1] Runs the code bellow in an asynchronous matter as to not block
//      ui-render. 
//  [2] By adding [counter] into the dependency array argument, we are telling react 
//      to render this callback only when "counter" state changes.
//  [3] This function will be called every time a "counter" state changes after
//      the rendering phase is finished.
    
    useEffect(
        function () {
            document.title = `Counter set to ${ counter } | Ultimate Counter`;
            console.log(`Title Updated`);
        }, 
        [counter]
    );

//  [1] Runs the code bellow in an asynchronous matter as to not block
//      ui-render. 
//  [2] By ommiting the dependency array argument, we are telling react 
//      to render this callback function every time a state changes.
//  [3] This function will be called every time a state changes after
//      the render phase is finished.
//
//  useEffect(
//      function () {
//          document.title = `Counter set to ${ counter } | Ultimate Counter`;
//          console.log(`Title Updated`);
//      }
//  );


//  When updating state based on its previous value, you need to pass a function 
//  to the setter function that updates the state.

    const set_counter_fn = function (previous_value) {
        return previous_value + 1;
    };

    const set_counter_internal_fn = function (previous_value) {
        return previous_value + 1;
    };

    const on_increment_handler = function () {
        set_counter( set_counter_fn );
    };

    const on_increment_internal_handler = function () {
        set_counter_internal( set_counter_internal_fn );
    };

    const on_save_counter = function () {
        localStorage.setItem('ultimate_counter_value', counter);        
    };

    console.log("Main Render");
    
    return (
        <Fragment>
            <p>{ counter }</p>
            <button type="button" onClick={on_increment_handler}>Increment</button>
            <button type="button" onClick={on_increment_internal_handler}>Increment Internal</button>
            <button type="button" onClick={on_save_counter}>Save counter value</button>
        </Fragment>
    );
};

export default Counter;