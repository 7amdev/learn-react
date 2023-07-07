import React from "react";

import Header       from "./header";
import Footer       from "./footer";
import IceCreamMenu from "./ice_cream_menu";

import './styles/app.css';

function App() {
  return (
    <>
      <Header />
        <main>
          <IceCreamMenu />
        </main>
      <Footer />
    </>
  );
}

export default App;
