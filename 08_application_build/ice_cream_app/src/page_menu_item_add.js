import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import MenuItemForm from "./menu_item_form";

const PMenuItemAdd = function () {
  const heading_title = useRef(null);
  const { search }    = useLocation();
  const search_params = new URLSearchParams(search);
  const ICE_CREAM     = { ID: 'ice-cream-id', NAME: 'ice-cream-name' };

  const on_form_submit_handler = function (form_data) {
    console.log(form_data);
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