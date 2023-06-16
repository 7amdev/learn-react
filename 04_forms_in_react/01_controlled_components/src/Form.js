import React, { useState, Fragment, useEffect } from "react";

import './Form.css'

const INITIAL_STATE = {
    first_name: '',
    last_name: '',
    biography: '',
    transport: '',
    breakfast: false,
    lunch: false,
    dinner: false,
    shirt_size: '',
    agree: false
};

const loaded_data = {
    first_name: 'Alfredo',
    last_name: 'Monteiro',
    biography: 'im a react developer based in Cape Verd island.',
    transport: 'planes',
    breakfast: true,
    lunch: false,
    dinner: true,
    shirt_size: 'l',
    agree: true
};

const FormContainer = function () {
    const [data, set_data] = useState(INITIAL_STATE);

    const on_load_data_handler = function () {
        set_data({...loaded_data});
    };

    const on_form_submit_handler = function (form_state) {
        console.log(`Form state:`);
        console.log(form_state);
    };

    return (
        <Fragment>
            <Form data={data} onSubmit={on_form_submit_handler}/>
            <button type="button" onClick={on_load_data_handler}>Load data</button>
        </Fragment>
    );
};

const Form = function ({ data, onSubmit }) {
    const [form_state, set_form_state] = useState(INITIAL_STATE);

    useEffect(function () {
        set_form_state(data);
    }, [data]);

    const on_change_handler = function (e) {
        let value = e.target.value;

        if (e.target.type === 'checkbox') {
            value = e.target.checked;
        } 

        set_form_state(
            {
                ...form_state,
                [e.target.name]: value
            }
        );
    };

    const on_form_submit_handler = function (e) {
        e.preventDefault();
        onSubmit(form_state);
    };

    const on_form_reset_handler = function () {
        set_form_state(INITIAL_STATE);
    };

    return (
        <form onSubmit={on_form_submit_handler}>
            <label htmlFor="first_name">First name</label>
            <input 
                id="first_name" 
                name="first_name"
                value={form_state.first_name}
                onChange={on_change_handler} 
            />

            <label htmlFor="last_name">Last name</label>
            <input 
                id="last_name" 
                name="last_name"
                value={form_state.last_name}
                onChange={on_change_handler} 
            />

            <label htmlFor="biography">Biography</label>
            <textarea 
                id="biography"
                name="biography"
                value={form_state.biography}
                rows="10"
                onChange={on_change_handler}
            />

            <label htmlFor="transport">Preferred transport</label>
            <select
                id="transport"
                name="transport"
                value={form_state.transport}
                onChange={on_change_handler}>
                <option>None Selected</option>
                <option value="planes">Planes</option>
                <option value="trains">Trains</option>
                <option value="cars">Cars</option>
                <option value="boats">Boats</option>
            </select>

            <fieldset>
                <legend>Select your meals</legend>
                
                <input 
                    type="checkbox"
                    id="breakfast"
                    name="breakfast"
                    checked={form_state.breakfast}
                    onChange={on_change_handler}
                />
                <label htmlFor="breakfast">Breakfast</label>
                
                <input 
                    type="checkbox"
                    id="lunch"
                    name="lunch"
                    checked={form_state.lunch}
                    onChange={on_change_handler}
                />
                <label htmlFor="lunch">Lunch</label>
                
                <input 
                    type="checkbox"
                    id="dinner"
                    name="dinner"
                    checked={form_state.dinner}
                    onChange={on_change_handler}
                />
                <label htmlFor="dinner">Dinner</label>
            </fieldset>

            <fieldset>
                <legend>Select a t-shirt size</legend>

                <input
                    type="radio"
                    id="size_s"
                    name="shirt_size"
                    value="s"
                    checked={form_state.shirt_size === 's'}
                    onChange={on_change_handler}
                />
                <label htmlFor="size_s">Small</label>
                <input
                    type="radio"
                    id="size_m"
                    name="shirt_size"
                    value="m"
                    checked={form_state.shirt_size === 'm'}
                    onChange={on_change_handler}
                />
                <label htmlFor="size_m">Medium</label>
                <input
                    type="radio"
                    id="size_l"
                    name="shirt_size"
                    value="l"
                    checked={form_state.shirt_size === 'l'}
                    onChange={on_change_handler}
                />
                <label htmlFor="size_l">Large</label>
            </fieldset>

            <label htmlFor="agree">I agree to the TOC</label>
            <input 
                type="checkbox"
                id="agree"
                name="agree"
                checked={form_state.agree}
                onChange={on_change_handler}
            />

            <button type="submit">Save</button>
            <button type="button" onClick={on_form_reset_handler}>Reset</button>

        </form>
    );
};

export default FormContainer;