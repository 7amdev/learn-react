import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header         from "./header";
import Footer         from "./footer";
import PMenu          from "./page_menu";
import PMenuItemEdit  from './page_menu_item_edit';
import PMenuItemAdd   from "./page_menu_item_add";
import PIceCreams     from "./page_ice_creams";

import './styles/app.css';

function App() {
  return (
    <Router>
      <a href="#main" className="skip-content">Skip to content</a>
      <Header />
      <Routes>
        <Route 
          path="/"               
          element={ <PMenu /> } 
        />
        <Route 
          path="/menu-items/:id" 
          element={ <PMenuItemEdit /> } 
        />
        <Route 
          path="/menu-items/add" 
          element={ <PMenuItemAdd /> } 
        />
        <Route 
          path="/menu-items/add/choose-ice-cream" 
          element={ <PIceCreams /> } 
        />
        <Route 
          path="/ice-creams"     
          element={ <PIceCreams /> } 
        />
        <Route 
          path="*"               
          element={ <PMenu /> } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
