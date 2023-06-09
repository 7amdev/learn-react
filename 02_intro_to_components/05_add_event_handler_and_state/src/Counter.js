import React, { Fragment, useState } from "react";

const Counter = function () {
    const [counter, set_counter] = useState(0);

    const on_increment_handler = function () {
        set_counter( counter + 1 );
    };

    return (
        <Fragment>
            <p>{ counter }</p>
            <button type="button" onClick={on_increment_handler}>Increment</button>
        </Fragment>
    );
};

export default Counter;