import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header       from "./header";
import Footer       from "./footer";
import IceCreamMenu from "./ice_cream_menu";

import './styles/app.css';

function App() {
  

  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={ <IceCreamMenu /> } />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
