import React, { Fragment } from "react";

const InteractiveView = function ({ value, text, on_action }) {
    return (
        <Fragment>
            <p>{ value }</p>
            <button type="button" onClick={on_action}>
                {text}
            </button>
        </Fragment>
    );

};

export default InteractiveView;
