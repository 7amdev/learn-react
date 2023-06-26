import React, { Fragment, useRef } from "react";

const generate_uid = function () {
    const seed = 'abcdefghijklmnopqrstuvwxyz01234567890!@#$%&-_+=';
    const upper_bound = seed.length;
    const lower_bound = 0;
    const N = 7;
    let uid = '';

    for (let i = 0; i < N; i += 1) {
        const seed_idx = Math.random() * (upper_bound - lower_bound) + lower_bound;
        uid += seed.charAt(seed_idx);
    }

    return uid;
} 

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