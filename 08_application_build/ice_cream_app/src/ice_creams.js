import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";

const IceCreams = function () {
  const [ice_creams, set_ice_creams]  = useState([]);
  const heading_title                 = useRef(null);
  const {current: abort_controller}   = useRef(new AbortController());

  useEffect(function () {
    const request = new Request('/api/ice-creams/available', {
      method: 'GET',
      signal: abort_controller.signal
    });

    fetch(request)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error: request response is not ok.', {
            cause: response
          });
        }
        
        return response.json();
      })
      .then(function (response_data) {
        set_ice_creams(response_data);
      }) 
      .catch(function (error) {
        if (error.cause && error.cause.status) {
          switch (error.cause.status) {
            case 400: break;
            case 401: break;
            case 404: break;
            case 500: break;
          }
        }
        console.warn(error);
      })
    
    return function () {
      abort_controller.abort();
    };
  }, []);


  console.log(ice_creams);

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