import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet";
import useIds from './useUids';
import { validator_price, validator_quantity } from './validators';
import useValidation from './useValidation';

const INITIAL_STATE = {
  id: '', 
  in_stock: false,
  price: '0.00',
  quantity: '0',
  ice_cream: { name: '' },
  description: ''
};

const MenuItemEdit = function () {
  const [menu_item, set_menu_item]          = useState(INITIAL_STATE);
  const [is_loading, set_is_loading]        = useState(undefined);
  const [is_submitting, set_is_submitting]  = useState(false);
  const [has_submitted, set_has_submitted]  = useState(false);
  const navigate                            = useNavigate();
  const { current: abort_controller }       = useRef(new AbortController());
  const heading_title                       = useRef(null);
  const form_element                        = useRef(null);
  const { id }                              = useParams();
  const location                            = useLocation();
  const [
    in_stock_uid, 
    price_uid,
    price_error_uid,
    quantity_uid,
    quantity_error_uid
  ] = useIds(5);

  const [price_validation, price_error_props] = useValidation({
    value         : menu_item.price, 
    validator_fn  : validator_price, 
    is_required   : true,
    error_id      : price_error_uid,
    show_error    : has_submitted
  });
  const [quantity_validation, quantity_error_props] = useValidation({
    value           : menu_item.quantity, 
    validator_fn    : validator_quantity, 
    compare_value   : menu_item.in_stock,
    is_required     : false,
    error_id        : quantity_error_uid,
    show_error      : has_submitted
  });

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

    set_has_submitted(true);

    if (quantity_validation || price_validation) {
      setTimeout(function () {
        const error_element = form_element.current.querySelector('[aria-invalid*="true"]');
        if (error_element) {
          error_element.focus();
        }
      }, 0);

      return;
    }

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

    set_is_submitting(true);

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
        set_is_submitting(false);
        navigate('/', {
          state: { heading_title_focus: true }
        });
      })
      .catch(function (error) {
        set_is_submitting(false);
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

  const on_delete_handler = function () {
    const http_request = new Request(`/api/menu/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    });

    fetch(http_request)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Error: respnse not ok...', { 
            cause: response
          });
        }

        return response.json();
      })
      .then(function (response_data) {
        console.log('Delete: ');
        console.log(response_data);
        navigate('/', {
          state: { heading_title_focus: true }
        });
      })
      .catch(function (error) {
        console.log(error);
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
        <form ref={form_element} className="form" onSubmit={on_form_submit_handler} noValidate>
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
              Price 
              <span 
                className="form__label--required" 
                aria-hidden="true">
                  (*)
              </span>: 
          </label>
          <input 
            id={price_uid}
            type="number"
            name="price"
            value={menu_item.price}
            step={".01"}
            className={ 
              (has_submitted && price_validation) 
              ? 'form__error form__error--input'
              : null 
            }
            onChange={on_change_handler}
            {...price_error_props}
          />
          { has_submitted && price_validation && 
            <div className="form__error"> 
              <p id={price_error_uid}>{ price_validation }</p>
            </div>
          }

          <label 
            htmlFor={quantity_uid} 
            className="form__label">
              Quantity: 
          </label>
          <select 
            id={quantity_uid}
            name="quantity" 
            value={menu_item.quantity}
            className={ 
              (has_submitted && quantity_validation) 
              ? 'form__error form__error--input' 
              : null 
            }
            onChange={on_change_handler}
            {...quantity_error_props}
          >
            <option value="0">0</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          { has_submitted && quantity_validation && 
            <div className="form__error">
              <p id={quantity_error_uid}>{ quantity_validation }</p>
            </div>
          }

          <div className="form_action">
            <input 
              type="submit" 
              disabled={is_submitting} 
              className="form__submit" 
              value={"Save"}
            />
            <input 
              type="button" 
              className="form__submit" 
              value={"Delete"} 
              onClick={on_delete_handler} 
            />
          </div>
        </form>
      }
    </main>
  );
};

export default MenuItemEdit;