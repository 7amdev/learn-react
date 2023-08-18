import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import MenuList from "./menu_list";
import MenuItem from "./menu_item";

const PIceCreams = function () {
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

  return (
    <main id="main" tabIndex="-1">
      <Helmet>
        <title>
          Ice creams flavors | Ice Cream Application
        </title>
      </Helmet>
      <h2 ref={heading_title} tabIndex={"-1"}>Ice Creams</h2>
      <MenuList>
        {
          ice_creams.length > 0 
          ? ice_creams.map(function (ice_cream) {
            return (
              <MenuItem
                key={ice_cream.id.toString()}
                ice_cream_id={ice_cream.id}
                ice_cream_name={ice_cream.name}
                navigate_to={'/'}
              />
            );
          })
          : <p>No ice cream available for now!</p>
        }
      </MenuList>
    </main>
  );
};

export default PIceCreams;