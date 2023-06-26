import React from "react";

const Section = function ({ heading_type = 2, heading_title, children }) {
    const HEADINGS = { H2: 'H2', H3: 'H3', H4: 'H4', H5: 'H5', H6: 'H6' };
    const heading_type_val = `H${heading_type}`;

    return (
        <section>
            { heading_type_val === HEADINGS.H2 && <h2>{ heading_title }</h2> }
            { heading_type_val === HEADINGS.H3 && <h3>{ heading_title }</h3> }
            { heading_type_val === HEADINGS.H4 && <h4>{ heading_title }</h4> }
            { heading_type_val === HEADINGS.H5 && <h5>{ heading_title }</h5> }
            { heading_type_val === HEADINGS.H6 && <h6>{ heading_title }</h6> }
            { Object.keys(HEADINGS).includes(heading_type_val) || <h2>{ heading_title }</h2> }
            { children }
        </section>
    );
};

//  const Section = function ({ heading_type = 2, heading_title, children }) {
//      const H = `h${heading_type}`;
//  
//      return (
//          <section>
//              <H>{ heading_title }</H>
//              { children }
//          </section>
//      );
//  };

export default Section;