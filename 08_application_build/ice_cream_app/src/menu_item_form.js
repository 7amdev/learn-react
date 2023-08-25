import React, { useRef, useState, useEffect } from "react";
import useValidation from "./useValidation";
import useIds from "./useUids";
import { 
  validator_price, 
  validator_quantity, 
  validator_description 
} from './validators';

const INITIAL_STATE = {
  id: '', 
  in_stock: false,
  ice_cream_id: '',
  price: '0.00',
  quantity: '0',
  ice_cream: { name: '' },
  description: ''
};

const MenuItemForm = function ({ data, onSubmit, onDelete }) {
  const form_element  = useRef(null);
  const [menu_item, set_menu_item] = useState(INITIAL_STATE);
  const [has_submitted, set_has_submitted] = useState(false);
  const [is_submitting, set_is_submitting] = useState(false);
  const [
    in_stock_uid, 
    price_uid,
    price_error_uid,
    quantity_uid,
    quantity_error_uid,
    description_uid, 
    description_error_uid, 
  ] = useIds(7);
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
  const [description_validation, description_error_props] = useValidation({
    value           : menu_item.description, 
    validator_fn    : validator_description, 
    is_required     : true,
    error_id        : description_error_uid,
    show_error      : has_submitted
  });

  useEffect(function () {
    set_menu_item({
      ...INITIAL_STATE, 
      ...data
    });
  }, [data]);

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

    if (
      quantity_validation || 
      price_validation || 
      description_validation
    ) {
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

    set_is_submitting(true);
    onSubmit(
      {
        id,
        ice_cream_id,
        in_stock,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        description
      }, 
      set_is_submitting
    );   
  };

  const on_delete_handler = function (e) {
    e.preventDefault();
    onDelete();
  }

  return (
    <form 
      ref={form_element} 
      className="form" 
      onSubmit={on_form_submit_handler} 
      noValidate
    >
      { menu_item.ice_cream_id && 
        <img 
          className="card__img" 
          src={`/ice_cream_images/ice_cream_${menu_item.ice_cream_id}.jpg`} 
          loading="lazy" 
        />
      }
      
      <p className="form__title">{ menu_item.ice_cream.name }</p>
      <label 
        htmlFor={description_uid} 
        aria-label="description"
        className="form__label">
          Description 
      </label>
      <textarea 
        id={description_uid}
        name="description"
        value={menu_item.description}
        rows={3}
        cols={40}
        onChange={on_change_handler} 
        className={ 
          (has_submitted && description_validation) 
          ? 'form__error form__error--input'
          : null 
        }
        {...description_error_props}
      />
      { has_submitted && description_validation && 
        <div className="form__error"> 
          <p id={description_error_uid}>{ description_validation }</p>
        </div>
      }

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
        onChange={on_change_handler}
      />

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
        { onDelete &&  
          <input 
            type="button" 
            className="form__submit" 
            value={"Delete"} 
            onClick={on_delete_handler} 
          />
        }
      </div>
    </form>
  );
};

export default MenuItemForm;