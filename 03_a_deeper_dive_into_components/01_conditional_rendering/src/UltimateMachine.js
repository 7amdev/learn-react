import React, { useState } from "react";

//  Version 5.
//  Conditional Rendering with Boolean AND(&&) Operator 
//  Conditional Rendering with ternary operator and null 

const ErrorMessage = function () {
    return (
        <span>Oh no you have an error.</span>
    );
};
const ErrMesg = function ({ show_error }) {
    return (
        show_error 
        ? <span>Oh no you have an error.</span>
        : null
    );
};

const UltimateMachine = function () {
    const [show_error, set_show_error] = useState(false);

    const set_show_error_fn = function (value) {
        return !value;
    };

    const on_click_handler = function () {
        set_show_error( set_show_error_fn );
    };

    return (
        <section>
            <h1>The Ultimate Machine</h1>

            { show_error && <ErrorMessage /> }
            <ErrMesg show_error={show_error} />

            <button 
                type="button" 
                onClick={on_click_handler} 
                aria-pressed={show_error}>
                On/Off
            </button>
        </section>
    );
};

//  Version 4.
//  Conditional Renderung with Ternary Operator

//  const OnMessage = function () {
//      return (
//          <span>The machine in ON!</span>
//      );
//  };
//  const OffMessage = function () {
//      return (
//          <span>The machine in OFF!</span>
//      );
//  };
//  
//  const UltimateMachine = function () {
//      const [is_on, set_is_on] = useState(false);
//  
//      const set_is_on_fn = function (value) {
//          return !value;
//      };
//  
//      const on_click_handler = function () {
//          set_is_on( set_is_on_fn );
//      };
//  
//      return (
//          <section>
//              <h1>The Ultimate Machine</h1>
//              { is_on ? <OnMessage /> : <OffMessage /> }
//              <button 
//                  type="button" 
//                  onClick={on_click_handler} 
//                  aria-pressed={is_on}>
//                  On/Off
//              </button>
//          </section>
//      );
//  };

//  Version 3.
//  Conditional Rendering with function interpolation

//  const OnMessage = function () {
//      return (
//          <span>The machine in ON!</span>
//      );
//  };
//  const OffMessage = function () {
//      return (
//          <span>The machine in OFF!</span>
//      );
//  };
//  
//  const UltimateMachine = function () {
//      const [is_on, set_is_on] = useState(false);
//  
//      const set_is_on_fn = function (value) {
//          return !value;
//      };
//  
//      const on_click_handler = function () {
//          set_is_on( set_is_on_fn );
//      };
//  
//      const get_message = function () {
//          if (is_on) return <OnMessage />        
//  
//          return <OffMessage />
//      };
//  
//      return (
//          <section>
//              <h1>The Ultimate Machine</h1>
//              { get_message() }
//              <button type="button" onClick={on_click_handler}>
//                  On/Off
//              </button>
//          </section>
//      );
//  };



//  Version 2.
//  Conditional Rendering with variable interpolation

//  const OnMessage = function () {
//      return (
//          <span>The machine in ON!</span>
//      );
//  };
//  const OffMessage = function () {
//      return (
//          <span>The machine in OFF!</span>
//      );
//  };
//  
//  const UltimateMachine = function () {
//      const [is_on, set_is_on] = useState(false);
//  
//      const set_is_on_fn = function (value) {
//          return !value;
//      };
//  
//      const on_click_handler = function () {
//          set_is_on( set_is_on_fn );
//      };
//  
//      let message;
//  
//      if (is_on) {
//          message = <OnMessage />
//      } else {
//          message = <OffMessage />
//      }
//  
//      return (
//          <section>
//              <h1>The Ultimate Machine</h1>
//              { message }
//              <button type="button" onClick={on_click_handler}>
//                  On/Off
//              </button>
//          </section>
//      );
//  };


//  Version 1.
//  Conditional Rendering with component

//  const OnMessage = function () {
//      return (
//          <span>The machine in ON!</span>
//      );
//  };
//  const OffMessage = function () {
//      return (
//          <span>The machine in OFF!</span>
//      );
//  };
//  const OnOff = function ({ value }) {
//      if (value) return <OnMessage />;
//  
//      return <OffMessage />;
//  };
//  
//  const UltimateMachine = function () {
//      const [is_on, set_is_on] = useState(false);
//  
//      const set_is_on_fn = function (value) {
//          return !value;
//      };
//  
//      const on_click_handler = function () {
//          set_is_on( set_is_on_fn );
//      };
//  
//      return (
//          <section>
//              <h1>The Ultimate Machine</h1>
//              <OnOff value={is_on} />
//              <button type="button" onClick={on_click_handler}>
//                  On/Off
//              </button>
//          </section>
//      );
//  };

export default UltimateMachine;