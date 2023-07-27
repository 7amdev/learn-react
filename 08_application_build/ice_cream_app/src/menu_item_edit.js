import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet";
// todo
// [] fetch data from the server
// [] create a form
// [] style the page

const INITIAL_STATE = {
  id: '', 
  in_stock: false,
  price: 0,
  quantity: 0,
  ice_cream: { name: '' },
  description: ''
};

const generate_uid = function () {
  const seed = 'abcdefghijklmnopqrstuvwxyz01234567890!@#$%&-_+=';
  const upper_bound = seed.length;
  const lower_bound = 0;
  const N = 7;
  let uid = '';

  for (let i = 0; i < N; i += 1) {
      const seed_idx = Math.random() * (upper_bound - lower_bound) + lower_bound;
      uid += seed.charAt(seed_idx);
  }

  return uid;
} 

const MenuItemEdit = function () {
  const [menu_item, set_menu_item] = useState(INITIAL_STATE);
  const navigate = useNavigate();
  const { current: abort_controller } = useRef(new AbortController());
  const { id } = useParams();
  let   {current: input_uid} = useRef({});

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
        const data_keys = Object.keys(data);
        for (let i = 0; i < data_keys.length; i++) {
          input_uid[data_keys[i]] = generate_uid();
        }
        set_menu_item({
          ...data,
          price: data.price.toFixed(2),
          quantity: data.quantity.toString()
        });
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
    let value = e.target.value;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }
  
    if (e.target.name === 'in_stock' && value === false ) {
      new_menu_item = {
        ...new_menu_item,
        quantity: '0'
      };
    }

    new_menu_item = {
      ...new_menu_item,
      [e.target.name]: value
    };

    set_menu_item(new_menu_item);
  };

  const on_form_submit_handler = function (e) {
    e.preventDefault();
    console.log(menu_item);
  };

  console.log(input_uid);

  return (
    <main>
      <Helmet>
        <title>
          Edit ice cream flavor | Ice Cream App
        </title>
      </Helmet>
      <h2>Edit Menu Item Page</h2>
      <form className="form" onSubmit={on_form_submit_handler}>
        <dl>
          <dt className="form__title">{ menu_item.ice_cream.name }</dt>
          <dd className="form__description">{ menu_item.description }</dd>
        </dl>

        <label 
          htmlFor={input_uid.in_stock} 
          className="form__label">
            In stock? 
        </label>
        <input 
          id={input_uid.in_stock}
          type="checkbox"
          name="in_stock"
          checked={menu_item.in_stock}
          onChange={on_change_handler}/>

        <label 
          htmlFor={input_uid.price} 
          className="form__label">
            Price: 
        </label>
        <input 
          id={input_uid.price}
          type="number"
          name="price"
          value={menu_item.price}
          step={".01"}
          onChange={on_change_handler}/>

        <label 
          htmlFor={input_uid.quantity} 
          className="form__label">
            Quantity: 
        </label>
        <select 
          id={input_uid.quantity}
          name="quantity" 
          value={menu_item.quantity}
          onChange={on_change_handler}>
          <option>0</option>
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
        </select>

        <input className="form__submit" type="submit" value={"Save"}/>
      </form>
    </main>
  );
};

export default MenuItemEdit;