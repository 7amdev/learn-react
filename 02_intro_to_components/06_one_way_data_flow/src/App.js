import React, { Fragment } from "react";
import Counter from "./Counter";

const App = function () {

    return (
        <Fragment>
            <p>This is a counting Application.</p>
            <Counter />
        </Fragment>
    );
};

export default App;