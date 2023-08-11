import React from "react";


const MenuList = function ({ children }) {
  return (
    <ul className="list-group list-group--flush">
      { 
        React.Children.map(children, function (menu_item) {
          return (
            <li className="list-group__item">
              { menu_item }
            </li>
          );
        })
      }
    </ul>
  );
};

export default MenuList;