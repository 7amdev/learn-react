import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import MenuItemForm from "./menu_item_form";

const PMenuItemAdd = function () {
  const heading_title = useRef(null);
  const { search }    = useLocation();
  const navigate      = useNavigate()
  const search_params = new URLSearchParams(search);
  const ICE_CREAM     = { ID: 'ice-cream-id', NAME: 'ice-cream-name' };

  const on_form_submit_handler = function (form_data, set_is_submitting) {
    const {
      ice_cream_id, 
      in_stock, 
      price, 
      quantity, 
      description
    } = form_data;    

    const payload = JSON.stringify({
      ice_cream_id: parseInt(ice_cream_id, 10),
      in_stock,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      description
    });

    const http_request = new Request(`/api/menu`, {
      method: 'POST',
      body: payload,
      headers: {
        'content-type': 'application/json'
      }
    });

    fetch(http_request)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error: response not ok...', {
            cause: response
          })
        }

        return response.json();
      })
      .then(function (response_data) {
        navigate('/', {
          state: { heading_title_focus: true }
        });
      })
      .catch(function (error) {
        console.warn(error);
        if (error.cause && error.cause.status) {
          switch (error.cause.status) {
            case 400: break;
            case 401: break;
            case 404: break;
            case 500: break;
          }
        } 
      });
  };

  const parse_url_search_params = function () {  
    let ice_cream = {};

    if (search_params.size === 0) return;

    Object.keys(ICE_CREAM).forEach(function (key) {
      ice_cream = {
        ...ice_cream,
        [key.toLowerCase()]: search_params.get(ICE_CREAM[key]) 
      };
    });

    return ice_cream;
  };

  const ice_cream = parse_url_search_params();

  return (
    <main id="main" tabIndex={"-1"}>
      <Helmet>
        <title>
          Add Menu Item | Ice Cream App
        </title>
      </Helmet>
      <h2 ref={heading_title} tabIndex="-1">Add Menu Item Page</h2>
      { !ice_cream && <p>Warning: No Ice Cream information provided</p> }
      { ice_cream && 
        <MenuItemForm
          data={{ice_cream: {...ice_cream}, ice_cream_id: ice_cream.id}}
          onSubmit={on_form_submit_handler} 
        />
      }
    </main>
  );
};

export default PMenuItemAdd;