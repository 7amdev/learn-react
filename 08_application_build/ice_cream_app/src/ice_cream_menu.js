import React, { useState, useEffect } from "react";

const IceCreamMenu = function ({ data }) {

  console.log(data);
  return (
    <section>
      <h2>Rock your taste buds with one of these!</h2>
      <ul>
        {
          data.map(item => {
            return (
              <li key={item.id.toString()}>
                <section>
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