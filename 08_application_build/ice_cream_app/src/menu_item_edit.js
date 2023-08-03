import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet";
import useIds from './useUids';

const INITIAL_STATE = {
  id: '', 
  in_stock: false,
  price: '0.00',
  quantity: '0',
  ice_cream: { name: '' },
  description: ''
};

const MenuItemEdit = function () {
  const [menu_item, set_menu_item]    = useState(INITIAL_STATE);
  const [is_loading, set_is_loading]  = useState(undefined);
  const navigate                      = useNavigate();
  const { current: abort_controller } = useRef(new AbortController());
  const heading_title                 = useRef(null);
  const { id }                        = useParams();
  const location                      = useLocation();
  const [
    in_stock_uid, 
    price_uid, 
    quantity_uid
  ] = useIds(3)

  useEffect(function () {
    // On desmount run the function bellow
    return function () {
      abort_controller.abort();  
    };
  }, []);

  useEffect(function () {
    const { current: title_element } = heading_title;
    if (location.state && location.state.heading_title_focus) {
      title_element.focus();
    } 
  }, [location.state]);

  useEffect(function () {
    const request = new Request(`/api/menu/${id}?include=ice-creams `, {
      method: 'GET',
      signal: abort_controller.signal
    });

    set_is_loading(true);

    fetch(request)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(
            'Error: failed to load resources from the server', {
              cause: response
            }
          );
        }
        return response.json();
      })
      .then(function (data) {
        set_menu_item({
          ...data,
          price: data.price.toFixed(2),
          quantity: data.quantity.toString()
        });
        set_is_loading(false);
      })
      .catch(function (error) {
        // console.warn(error);
        if (error.cause && error.cause.status) {
          switch (error.cause.status) {
            case 400: 
              console.warn('400 error');
              break;
            case 401:
              console.warn('401 error'); 
              break;
            case 404: 
              navigate(`/`);
              console.warn('404 error');
              break;
            case 500: 
              console.warn('500 error');
              break;
          }
        }
      });
    
  }, [useParams().id]);

  const on_change_handler = function (e) {
    let new_menu_item = {...menu_item};
    let value         = e.target.value;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
  
    new_menu_item = {
      ...new_menu_item,
      [e.target.name]: value
    };

    if (e.target.name === 'in_stock') {
      if (value === false) {
        new_menu_item = {
          ...new_menu_item,
          quantity: '0'
        };
      }
    }

    if (e.target.name === 'quantity') {
      if (value === '0') {
        new_menu_item = {
          ...new_menu_item,
          in_stock: false
        };
      } else {
        new_menu_item = {
          ...new_menu_item,
          in_stock: true
        };
      }
    }

    set_menu_item(new_menu_item);
  };

  const on_form_submit_handler = function (e) {
    e.preventDefault();

    const {
      id, 
      ice_cream_id, 
      in_stock, 
      price, 
      quantity, 
      description
    } = menu_item;    

    const payload = JSON.stringify({
      id,
      ice_cream_id,
      in_stock,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      description
    });

    const http_request = new Request(`/api/menu/${id}`, {
      method: 'PUT',
      body: payload,
      headers: {
        'content-type': 'application/json'
      }
    });

    fetch(http_request)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error: response not ok...', {
            cause: response
          })
        }

        return response.json();
      })
      .then(function (response_data) {
        navigate('/', {
          state: { heading_title_focus: true }
        });
      })
      .catch(function (error) {
        console.warn(error);
        if (error.cause && error.cause.status) {
          switch (error.cause.status) {
            case 400: break;
            case 401: break;
            case 404: break;
            case 500: break;
          }
        } 
      });
    
  };

  return (
    <main id="main" tabIndex={"-1"}>
      <Helmet>
        <title>
          Menu Item | Ice Cream App
        </title>
      </Helmet>
      <h2 ref={heading_title} tabIndex="-1">Edit Menu Item Page</h2>
      { is_loading === true && <p>Loading menu item, please wait...</p> }
      { is_loading === false 
        && (
          <dl>
            <dt className="form__title">{ menu_item.ice_cream.name }</dt>
            <dd className="form__description">{ menu_item.description }</dd>
          </dl>
        )
      }
      { is_loading === false && 
        <form className="form" onSubmit={on_form_submit_handler}>
          <label 
            htmlFor={in_stock_uid} 
            aria-label="in stock"
            className="form__label">
              In stock? 
          </label>
          <input 
            id={in_stock_uid}
            type="checkbox"
            name="in_stock"
            checked={menu_item.in_stock}
            onChange={on_change_handler}/>

          <label 
            htmlFor={price_uid} 
            className="form__label">
              Price: 
          </label>
          <input 
            id={price_uid}
            type="number"
            name="price"
            value={menu_item.price}
            step={".01"}
            onChange={on_change_handler}/>

          <label 
            htmlFor={quantity_uid} 
            className="form__label">
              Quantity: 
          </label>
          <select 
            id={quantity_uid}
            name="quantity" 
            value={menu_item.quantity}
            onChange={on_change_handler}>
            <option value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>

          <input className="form__submit" type="submit" value={"Save"}/>
        </form>
      }
    </main>
  );
};

export default MenuItemEdit;