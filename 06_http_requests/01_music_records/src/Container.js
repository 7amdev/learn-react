import React, { Fragment, useState, useEffect } from "react";

import Header   from "./Header";
import Section  from "./Section";
import Form     from "./Form";
import List     from './List';
import { sort } from './Utils'

import './Container.css';

const Container = function () {
    const [records, set_records] = useState([]);
    const [live_text, set_live_text] = useState('');
    const API_ENDPOINT = '/api/records';

    useEffect(function () {
        fetch(API_ENDPOINT)
            .then(function (response) {
                if (!response.ok) throw new Error('Not a valid response');

                return response.json();
            })
            .then(function (data) {
                set_records(sort(data));
            })
            .catch(console.warn);
    }, []);

    const on_submit_handler = function (new_record) {
        let request = new Request(API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(new_record),
            headers: {
                'content-type': 'application/json'
            }
        });

        fetch(request)
        .then(function (response) {
            if (!response.ok) throw new Error('Not a valid response');

            return response.json();
        })
        .then(function (data) {
            
            set_records(
                sort([...records, data])
            );    

            //  Pontuaction is important
            set_live_text(`${data.name} successfuly added.`);
        })
        .catch(console.warn);
    };

    return (
        <Fragment>
            <Header />
            <main>
                <Section heading_type="h8" heading_title={"Add a new record"}>
                    <Form onSubmit={on_submit_handler} />
                </Section> 
                <Section heading_title={"List of records"} >
                    <List records={records}/>
                </Section> 
            </main>
            <div className="visually-hidden" aria-live="polite" aria-atomic="true">{ live_text }</div>
        </Fragment>
    );
};

export default Container;