import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import './styles/component.css';

const IceCreamMenu = function () {
  const [menu, set_menu]        = useState(undefined);
  const [loading, set_loading]  = useState(false);
  const navigate                = useNavigate();
  const CARD_EVENTS = Object.freeze({ click: 'click', keyup: 'keyup' });

  useEffect(function () {
    const abort_controller = new AbortController();
    const request = new Request('/api/stock?include=ice-creams', {
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
              cause: { response }
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

        if (error.cause && error.cause.response && error.cause.response.status) {
          switch (error.cause.response.status) {
            case 400: break;
            case 401: break;
            case 404: break;
            case 500: break;
          }
        }

        console.warn(error);
      });

      return function () {
        console.log(abort_controller);
        set_loading(false);
        clearInterval(interval);
        abort_controller.abort();
      };
  }, []);

  const on_card_click_handler = function (event_type, event_which, card_item_id) {
    if (!(event_type in CARD_EVENTS)) return; 
    if (event_type === 'keyup' && event_which != 13) return; 
    
    navigate(`/menu-items/${card_item_id}`);
  };

  return (
    <main>
      <Helmet>
        <title>
          List of ice cream  flavors | Ice Cream App
        </title>
      </Helmet>
      <h2>Rock your taste buds with one of these!</h2>
      { loading && <p>Loading menu, please wait.</p> }
      { menu && menu.length === 0 && <p>No Menu Available today.</p> }
      <ul className="list-group list-group--flush">
        
        { menu && menu.length > 0 &&  
          menu.map(item => {
            return (
              <li className="list-group__item" key={item.id.toString()}>
                <section 
                  className="card" 
                  tabIndex={0} 
                  onClick={function (e) {
                    on_card_click_handler(e.type, e.which, item.id);
                  }}
                  onKeyUp={function (e) {
                    on_card_click_handler(e.type, e.which, item.id);
                  }} >
                  <img className="card__img" src={`/ice_cream_images/ice_cream_${item.id}.jpg`} loading="lazy" />
                  <div className="card__body">
                    <h3 className="card__title">
                      <Link 
                        to={`/menu-items/${item.id}`} 
                        onClick={function (e) {
                          e.stopPropagation();
                        }}>
                          { item.ice_cream.name }
                      </Link>
                    </h3>                    
                    <div className="card__group--inline">
                      <p className="card__price">{`$${item.price}`}</p>
                      <span className="card__dot">{` · `}</span>
                      { item.quantity == 0 && <p className="card__quantity text-red">{`Currently out of stock`}</p>}
                      { item.quantity > 0  && <p className="card__quantity text-green">{`${item.quantity} in stock`}</p>}
                    </div>
                    <p className="card__description">{ item.description }</p>
                  </div>
                </section>
              </li>
            );
          })
        }
      </ul>
    </main>
  );
};

export default IceCreamMenu;