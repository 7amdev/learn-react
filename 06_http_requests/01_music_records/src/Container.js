import React, { Fragment, useState, useEffect } from "react";

import Header   from "./Header";
import Section  from "./Section";
import Form     from "./Form";
import List     from './List';

import './Container.css';

const sort = function (records) {
    return records.sort(function (a, b) {
        const name_a = a.name.toUpperCase();
        const name_b = b.name.toUpperCase();

        if ( name_a > name_b) return 1;
        if ( name_a < name_b) return -1;

        return 0;
    });
};

const Container = function () {
    const [records, set_records] = useState([]);
    const [live_text, set_live_text] = useState('');

    useEffect(function () {
        fetch('/api/records')
            .then(function (response) {
                if (!response.ok) throw new Error('Not a valid response');

                return response.json();
            })
            .then(function (data) {
                console.log(data);
                set_records(sort(data));
            })
            .catch(console.warn);
    }, []);

    const on_submit_handler = function (record) {
        set_records(
            sort([...records, record])
        );

//  Pontuaction is important
        set_live_text(`${record.name} successfuly added.`);
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