import React, { useState } from "react";
import InteractiveView from "./InteractiveView";

const Random = function () {
    const [random_number, set_random_number] = useState(0);

    const on_randomise_handler = function () {
        let r_value = Math.floor(Math.random() * 1000);
        
        set_random_number(r_value);
    };

    return (
        <InteractiveView 
            value={random_number}
            text={"Randomise"}
            on_action={on_randomise_handler}
        />
    );
};

export default Random;