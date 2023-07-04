import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

const Section = function ({ children, heading_text, heading_level = 1 }) {
    const HEADINGS = {H1: 'H1', H2: 'H2', H3: 'H3', H4: 'H4', H5: 'H5'};
    const h_tag = `H${heading_level}`;
    const h_element = useRef(null);

    useEffect(function () {
        h_element.current.focus();
    }, []);

    return (
        <section>
            <Helmet>
                <title>{ heading_text } | Weather App</title>
            </Helmet>
            { HEADINGS.H1 === h_tag && <h1 ref={h_element} tabIndex={-1}>{ heading_text }</h1> }
            { HEADINGS.H2 === h_tag && <h2 ref={h_element} tabIndex={-1}>{ heading_text }</h2> }
            { HEADINGS.H3 === h_tag && <h3 ref={h_element} tabIndex={-1}>{ heading_text }</h3> }
            { HEADINGS.H4 === h_tag && <h4 ref={h_element} tabIndex={-1}>{ heading_text }</h4> }
            { HEADINGS.H5 === h_tag && <h5 ref={h_element} tabIndex={-1}>{ heading_text }</h5> }
            { !HEADINGS[h_tag]      && <h1 ref={h_element} tabIndex={-1}>{ heading_text }</h1> }
            { children }
        </section>
    );
};

export default Section;