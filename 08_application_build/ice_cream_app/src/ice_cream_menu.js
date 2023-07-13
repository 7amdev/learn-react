import React, { useState, useEffect } from "react";

const IceCreamMenu = function () {
  const [menu, set_menu] = useState([]);
  const [loading, set_loading] = useState(true);

  useEffect(function () {
    fetch('/api/stock?include=ice-creams')
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Error: failed to load resources from the server");
        } 

        return response.json();
      })
      .then(function (menu_data) {
        set_loading(function (previous_value) {
          return !previous_value;
        });
        set_menu([]);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, []);

  return (
    <section>
      <h2>Rock your taste buds with one of these!</h2>
      <ul>
        { menu && menu.length === 0 && <li><p>No Menu Avaible today.</p></li> }
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