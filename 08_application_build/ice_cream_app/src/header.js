import React from "react";
import { NavLink } from "react-router-dom";
import logo from './assets/logo.svg';
import './styles/header.css';

const Header = function () {
  return (
    <header className="header">
      <div className="header__content">
        <a href="#" className="logo">
          <img className="logo__img" src={logo} alt="" />
          <h1 className="logo__title">Awesome Ice Cream</h1>
        </a>
      
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__list-item">
              <NavLink 
                to={'/'}
                state={ { heading_title_focus: true } }
                className={function ({isActive}) {
                  if (!isActive) return 'nav__link';
                  return 'nav__link nav__link--active';
                }}>
                  Menu
              </NavLink>
            </li>
            <li>
              <NavLink
              to={'/menu-items/add/choose-ice-cream'} 
              className={function ({isActive}) {
                if (!isActive) return 'nav__link';
                return 'nav__link nav__link--active';
              }}>
                  Add flavor
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;