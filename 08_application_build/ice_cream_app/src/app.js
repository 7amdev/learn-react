import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header           from "./header";
import Footer           from "./footer";
import IceCreamMenu     from "./ice_cream_menu";
import MenuItemEdit from './menu_item_edit';

import './styles/app.css';

function App() {
  return (
    <Router>
      <a href="#main" className="skip-content">Skip to content</a>
      <Header />
      <Routes>
        <Route path="/" element={ <IceCreamMenu /> } />
        <Route path="/menu-items/:id" element={ <MenuItemEdit /> } />
        <Route path="*" element={ <IceCreamMenu /> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
