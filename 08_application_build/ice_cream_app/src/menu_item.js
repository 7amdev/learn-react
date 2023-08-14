import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MenuItem = function ({ children, id, ice_cream_id, ice_cream_name, navigate_to }) {
  const CARD_EVENTS = Object.freeze({ click: 'click', keyup: 'keyup' });
  const navigate    = useNavigate();


  const on_card_click_handler = function (event_type, event_which, card_item_id) {
    if (!(event_type in CARD_EVENTS)) return; 
    if (event_type === 'keyup' && event_which != 13) return; 
    
    navigate(navigate_to, {
      state: { heading_title_focus: true }
    });
  };

  return (
    <section 
      className="card" 
      tabIndex={0} 
      onClick={function (e) {
        on_card_click_handler(e.type, e.which, id);
      }}
      onKeyUp={function (e) {
        on_card_click_handler(e.type, e.which, id);
      }} 
    >
      <img 
        className="card__img" 
        src={`/ice_cream_images/ice_cream_${ice_cream_id}.jpg`} 
        loading="lazy" 
      />
      <div className="card__body">
        <h3 className="card__title">
          <Link 
            to={navigate_to} 
            className="card__link"
            state={ { heading_title_focus: true } }
            onClick={function (e) {
              e.stopPropagation();
            }}>
              { ice_cream_name }
          </Link>
        </h3>                    
        { children } 
      </div>
    </section>
  );
};

export default MenuItem;