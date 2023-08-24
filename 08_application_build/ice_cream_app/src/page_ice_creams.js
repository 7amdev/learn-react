import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import MenuList from "./menu_list";
import MenuItem from "./menu_item";

const PIceCreams = function () {
  const [ice_creams, set_ice_creams]  = useState([]);
  const [is_loading, set_is_loading]  = useState(undefined); 
  const heading_title                 = useRef(null);
  const {current: abort_controller}   = useRef(new AbortController());

  useEffect(function () {
    const request = new Request('/api/ice-creams/available', {
      method: 'GET',
      signal: abort_controller.signal
    });

    // We wrap the set_is_loading code to prevent the label "is loading..."
    // to show up in a View if we get the requet response before 400ms.
    const interval = setTimeout(function () {
      set_is_loading(true);
    }, 400);

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
        set_is_loading(false);

        // IMPORTANT: if the response is fast and we dont clearInterval 
        //            the set_is_loading(true) will trigger last and making the
        //            render page with a empty list because of condition 
        //            like is_loading === false.
        clearInterval(interval);
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
        set_is_loading(false);
        clearInterval(interval);
        console.warn(error);
      });
    
    return function () {
      abort_controller.abort();
      clearInterval(interval);
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
      { is_loading === true && <p>Loading ice creams, please wait...</p> }
      {
        is_loading === false && 
        ice_creams.length === 0 && 
        <p>No ice cream available for now!</p>
      }
      <MenuList>
        {
          is_loading === false    && 
          ice_creams.length > 0   && 
          ice_creams.map(function (ice_cream) {
            return (
              <MenuItem
                key={ice_cream.id.toString()}
                ice_cream_id={ice_cream.id}
                ice_cream_name={ice_cream.name}
                navigate_to={`/menu-items/add?ice-cream-id=${ice_cream.id}&ice-cream-name=${ice_cream.name}`}
              />
            );
          })
        }
      </MenuList>
    </main>
  );
};

export default PIceCreams;