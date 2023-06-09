import React, { Fragment } from "react";
import Counter from "./Counter";
import Random from "./Random";

const App = function () {

    return (
        <Fragment>
            <p>This is a counting Application.</p>
            <Counter />
            <Random />
        </Fragment>
    );
};

export default App;