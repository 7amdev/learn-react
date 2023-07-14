import React, { useState, useEffect } from "react";
import './styles/component.css';

const IceCreamMenu = function () {
  const [menu, set_menu] = useState(undefined);
  const [loading, set_loading] = useState(false);

  useEffect(function () {
    const interval = setInterval(function () {
      set_loading(true);
    }, 400);

    fetch('/api/stock?include=ice-creams')
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Error: failed to load resources from the server");
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
        
        console.warn(error);
      });

      return function () {
        set_loading(false);
        clearInterval(interval);
      };
  }, []);

  return (
    <section className="menu">
      <h2>Rock your taste buds with one of these!</h2>
      { loading && <p>Loading menu, please wait.</p> }
      { menu && menu.length === 0 && <p>No Menu Available today.</p> }
      <ul className="list-group list-group--flush">
        
        { menu && menu.length > 0 &&  
          menu.map(item => {
            return (
              <li className="list-group__item" key={item.id.toString()}>
                <section className="card">
                  <img className="card__img" src={`/ice_cream_images/ice_cream_${item.id}.jpg`} loading="lazy" />
                  <div className="card__body">
                    <h3 className="card__title">{ item.ice_cream.name }</h3>                    
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
    </section>
  );
};

export default IceCreamMenu;