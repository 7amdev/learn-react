import React, { useState, useEffect, useRef} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Helmet from "react-helmet";

import MenuItem from "./menu_item";
import MenuList from "./menu_list";

import './styles/component.css';

const Menu = function () {
  const [menu, set_menu]        = useState(undefined);
  const [loading, set_loading]  = useState(false);
  const navigate                = useNavigate();
  const heading_title           = useRef(null);
  const location                = useLocation();
  const CARD_EVENTS             = Object.freeze({ click: 'click', keyup: 'keyup' });

  // On Mount Component
  useEffect(function () {
    const abort_controller = new AbortController();
    const request = new Request('/api/menu?include=ice-creams', {
      method: 'GET',
      signal: abort_controller.signal
    });
    const interval = setInterval(function () {
      set_loading(true);
    }, 400);

    fetch(request)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            'Error: failed to load resources from the server', {
              cause: response 
            }
          );
        } 

        return response.json();
      })
      .then(function (menu_data) {
        set_loading(false);
        set_menu(menu_data);
  
        clearInterval(interval);
      })
      .catch(function (error) {
        set_loading(false);
        set_menu([]);
        clearInterval(interval);

        if (error.cause && error.cause.status) {
          switch (error.cause.status) {
            case 400: break;
            case 401: break;
            case 404: break;
            case 500: break;
          }
        }

        console.warn(error);
      });

      return function () {
        set_loading(false);
        clearInterval(interval);
        abort_controller.abort();
      };
  }, []);

  useEffect(function () {
    const title_element = heading_title.current;
    if (location.state && location.state.heading_title_focus) {
      title_element.focus();
    } 

  }, [location.state]);

  const on_card_click_handler = function (event_type, event_which, card_item_id) {
    if (!(event_type in CARD_EVENTS)) return; 
    if (event_type === 'keyup' && event_which != 13) return; 
    
    navigate(`/menu-items/${card_item_id}`, {
      state: { heading_title_focus: true }
    });
  };

  return (
    <main id="main" tabIndex="-1">
      <Helmet>
        <title>
          List of ice cream flavors | Ice Cream App
        </title>
      </Helmet>
      <h2 ref={heading_title} tabIndex={"-1"}>Ice Cream Menu</h2>
      { loading && <p>Loading menu, please wait.</p> }
      { menu && menu.length === 0 && <p>No Menu Available today.</p> }
      <MenuList>
        { menu && menu.length > 0 &&  
          menu.map(function (item) {
            return (
              <MenuItem 
                key={item.id.toString()}
                id={item.id} 
                ice_cream_name={item.ice_cream.name} 
                ice_cream_id={item.ice_cream_id}
              >
                <div className="card__group--inline">
                  <p className="card__price">{`$${item.price.toFixed(2)}`}</p>
                  <span className="card__dot">{` · `}</span>
                  { item.quantity == 0 && <p className="card__quantity text-red">{`Currently out of stock`}</p>}
                  { item.quantity > 0  && <p className="card__quantity text-green">{`${item.quantity} in stock`}</p>}
                </div>
                <p className="card__description">{ item.description }</p>
              </MenuItem>                    
            );
          })
        }
      </MenuList>
    </main>
  );
};

export default Menu;