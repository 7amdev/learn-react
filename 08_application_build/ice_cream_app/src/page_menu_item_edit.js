import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet";
import MenuItemForm from "./menu_item_form";


const PMenuItemEdit = function () {
  const [menu_item, set_menu_item]          = useState({});
  const [is_loading, set_is_loading]        = useState(undefined);
  const navigate                            = useNavigate();
  const { current: abort_controller }       = useRef(new AbortController());
  const heading_title                       = useRef(null);
  const { id }                              = useParams();
  const location                            = useLocation();

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

  const on_form_submit_handler = function (form_data, set_is_submitting) {
    const {
      id, 
      ice_cream_id, 
      in_stock, 
      price, 
      quantity, 
      description
    } = form_data;    

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
        set_is_submitting(false);
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
      { is_loading === false && 
        <MenuItemForm
          data={menu_item}
          onSubmit={on_form_submit_handler} 
          onDelete={on_delete_handler}
        />
      }
    </main>
  );
};

export default PMenuItemEdit;