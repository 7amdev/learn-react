import React, { Fragment, useRef } from "react";
import { generate_uid } from './Utils';

const Input = function ({ type = 'INPUT', label_text, ...props }) {
    const uid = useRef(generate_uid());
    const INPUT_TYPES = Object.freeze({ INPUT: 'INPUT', TEXTAREA: 'TEXTAREA' });
    const type_val = type.toUpperCase();

    return (
        <Fragment>
            <label htmlFor={uid.current}>{ label_text }</label>
            { type_val === INPUT_TYPES.INPUT    && <input id={uid.current} {...props} /> }
            { type_val === INPUT_TYPES.TEXTAREA && <textarea id={uid.current} {...props} /> }
            { Object.keys(INPUT_TYPES).includes(type_val) || <p>Input Type not supported. </p> }
        </Fragment>
    );
};

export default Input;