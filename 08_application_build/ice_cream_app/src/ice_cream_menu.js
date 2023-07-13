import React, { useState, useEffect } from "react";

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
    <section>
      <h2>Rock your taste buds with one of these!</h2>
      { loading && <p>Loading menu, please wait.</p> }
      { menu && menu.length === 0 && <p>No Menu Available today.</p> }
      <ul>
        
        { menu && menu.length > 0 &&  
          menu.map(item => {
            return (
              <li key={item.id.toString()}>
                <section>
                  <img src={`/ice_cream_images/ice_cream_${item.id}.jpg`} loading="lazy" />
                  <h3>{ item.ice_cream.name }</h3>
                  <p>{`$${item.price} · ${item.quantity} in stock`}</p>
                  <p>{ item.description }</p>
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