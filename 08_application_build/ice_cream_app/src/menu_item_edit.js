import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet";
// todo
// [] fetch data from the server
// [] create a form
// [] style the page

const MenuItemEdit = function () {
  const [menu_item, set_menu_item] = useState({});
  const navigate = useNavigate();
  const { current: abort_controller } = useRef(new AbortController());
  const { id } = useParams();

  useEffect(function () {
    // On desmount run the function bellow
    return function () {
      abort_controller.abort();  
    };
  }, []);

  useEffect(function () {
    const request = new Request(`/api/stock/${id}?include=ice-creams `, {
      method: 'GET',
      signal: abort_controller.signal
    });

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
        console.log({
          ...data,
          price: data.price.toFixed(2),
          quantity: data.quantity.toString()
        });
        set_menu_item(data);
      })
      .catch(function (error) {
        console.warn(error);
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

  return (
    <main>
      <Helmet>
        <title>
          Edit ice cream flavor | Ice Cream App
        </title>
      </Helmet>
      <h2>Edit Menu Item Page</h2>
    </main>
  );
};

export default MenuItemEdit;