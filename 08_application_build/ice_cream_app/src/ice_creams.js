import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

const IceCreams = function () {
  const [ice_creams, set_ice_creams]  = useState([]);
  const heading_title                 = useRef(null);

  useEffect(function () {
    
    return function () {

    };
  }, []);

  return (
    <main id="main" tabIndex="-1">
      <Helmet>
        <title>
          Ice creams flavors | Ice Cream Application
        </title>
      </Helmet>
      <h2 ref={heading_title} tabIndex={"-1"}>Ice Creams</h2>
    </main>
  );
};

export default IceCreams;