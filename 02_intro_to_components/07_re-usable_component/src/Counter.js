import React, { useState } from "react";

import InteractiveView from "./InteractiveView";

const Counter = function () {
    const [counter, set_counter] = useState(0);

    const set_counter_fn = function (value) {
        return value + 1;
    };

    const on_increment_handler = function () {
        set_counter( set_counter_fn );
    };

    return (
        <InteractiveView 
            value={counter}
            text={"Increment"}
            on_action={on_increment_handler}
        />
    );
};

export default Counter;