import React, { Fragment, useState } from "react";

const CounterView = function ({ value, on_increment}) {
    return (
        <Fragment>
            <p>{ value }</p>
            <button type="button" onClick={on_increment}>
                Increment
            </button>
        </Fragment>
    );

};

const Counter = function () {
    const [counter, set_counter] = useState(0);

    const on_increment_handler = function () {
        set_counter( counter + 1 );
    };

    return (
        <CounterView 
            value={counter} 
            on_increment={on_increment_handler} 
        />
    );
};

export default Counter;