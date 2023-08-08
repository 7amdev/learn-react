import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header           from "./header";
import Footer           from "./footer";
import Menu             from "./menu";
import MenuItemEdit     from './menu_item_edit';
import IceCreams        from "./ice_creams";

import './styles/app.css';

function App() {
  return (
    <Router>
      <a href="#main" className="skip-content">Skip to content</a>
      <Header />
      <Routes>
        <Route path="/"               element={ <Menu /> } />
        <Route path="/menu-items/:id" element={ <MenuItemEdit /> } />
        <Route path="/ice-creams"     element={ <IceCreams /> } />
        <Route path="*"               element={ <Menu /> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
