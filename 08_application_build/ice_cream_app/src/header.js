import React from "react";
import logo from './assets/logo.svg';
import './styles/header.css';

const Header = function () {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="App logo" />
        <h1>Awesome Ice Cream</h1>
    </header>
  );
};

export default Header;