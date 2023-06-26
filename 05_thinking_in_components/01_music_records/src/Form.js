import React, { useState } from "react";

import Input from "./Input";

const INITIAL_STATE = {
    name: '',
    artist_name: '',
    description: ''
};

const Form = function ({ onSubmit }) {
    const [entry, set_entry] = useState(INITIAL_STATE);

    const on_change_handler = function (e) {
        set_entry({
            ...entry,
            [e.target.name]: e.target.value
        });
    };

    const on_form_submit = function (e) {
        e.preventDefault();

        if (!entry.name) return;
        if (!entry.artist_name) return;

        onSubmit({ ...entry });

        set_entry(INITIAL_STATE);
    };

    return (
        <form onSubmit={on_form_submit}>
            <Input 
                name="name"
                label_text={"Record Name"}
                value={entry.name}
                onChange={on_change_handler}
            />
            <Input 
                name="artist_name" 
                label_text={"Artist Name"}
                value={entry.artist_name}
                onChange={on_change_handler}
            />
            <Input
                type={"textarea"}
                name="description"
                label_text={"Description"}
                value={entry.description}
                onChange={on_change_handler}
            />
            <button type="submit">Save</button>
        </form>
    );

//  return (
//      <form onSubmit={on_form_submit}>
//          <label htmlFor="record_name">Record Name</label>
//          <input 
//              id="record_name" 
//              name="name"
//              value={entry.name}
//              onChange={on_change_handler}
//          />
//          <label htmlFor="artist_name">Artist Name</label>
//          <input 
//              id="artist_name" 
//              name="artist_name" 
//              value={entry.artist_name}
//              onChange={on_change_handler}
//          />
//          <label htmlFor="description">Description</label>
//          <textarea
//              id="description"
//              name="description"
//              value={entry.description}
//              onChange={on_change_handler}
//          />
//          <button type="submit">Save</button>
//      </form>
//  );
};

export default Form;