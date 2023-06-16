import React, { useState } from "react";
import Counter from "./Counter";

const App = function () {
    const [show_counter, set_show_counter] = useState(true);

    const set_show_counter_callback = function (current_value) {
        return !current_value;
    };

    const on_show_counter_handler = function () {
        set_show_counter(set_show_counter_callback)
    };

    return (
        <main>
            <h1>Ultimate Counter</h1>
            <button type="button" aria-pressed={!show_counter} onClick={on_show_counter_handler}>
                { show_counter ? "Hide" : "Show" }
            </button>
            { show_counter && <Counter />}
        </main>
    );
};

export default App;