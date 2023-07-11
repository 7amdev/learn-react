import React, { useState, useEffect } from "react";

import Header       from "./header";
import Footer       from "./footer";
import IceCreamMenu from "./ice_cream_menu";

import './styles/app.css';

function App() {
  const [menu, set_menu] = useState([]);

  useEffect(function () {
    fetch('/api/stock?include=ice-creams')
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Error: failed to load resources from the server");
        } 

        return response.json();
      })
      .then(function (menu_data) {
        set_menu(menu_data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }, []);

  return (
    <>
      <Header />
        <main>
          <IceCreamMenu data={menu} />
        </main>
      <Footer />
    </>
  );
}

export default App;
