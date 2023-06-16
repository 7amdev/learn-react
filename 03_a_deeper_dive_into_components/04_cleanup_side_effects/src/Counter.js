import React, { Fragment, useState, useEffect } from "react";

// If a function is a constant and does not use anything 
// defined inside our component, it probably doesn't 
// belong inside our component.

const on_component_init   = function () {
    console.log("subscribe to service A....");
};
const on_component_destroy = function () {
    console.log("unsubscribe from service A...");
};

const subscribe_counter_value_changes = function (count) {
    console.log(`subscribe to counter value: ${count}...`);
};
const unsubscribe_counter_value_changes = function (count) {
    console.log(`unsubscribe to counter value: ${count}...`);
};

const Counter = function () {
    const [counter_value, set_counter_value] = useState(0);


//  (1) This Side Effect will run ONCE when the component is mounted and
//      subscribes to a service. The code that tells React to call this side effect
//      only ONCE the empty array as a second argument on the function call.
//  (2) When the component is unmounted or removed from the DOM it 
//      unsibscribes from the service.

    useEffect(function () {

        on_component_init();

//  If the useEffect callback parameter returns a function, it 
//  becomes the Cleanup Function or the unmount function.

        return (
            function () {
                on_component_destroy();
            }
        );
    }, []);

    useEffect(function () {
        subscribe_counter_value_changes(counter_value);

        return( 
            function () {
                unsubscribe_counter_value_changes(counter_value);
            }
        );
    }, [counter_value]);

    const on_increment_handler = function () {
        set_counter_value( counter_value + 1 );
    };

    console.log("Counter Component Render");

    return (
        <Fragment>
            <p>{ counter_value }</p>
            <button type="button" onClick={on_increment_handler}>Increment</button>
        </Fragment>
    );
};

export default Counter;