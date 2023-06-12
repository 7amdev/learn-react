import React, { useState, Fragment } from "react";

const list_1 = [
    'The beach',
    'The mountains',
    'Vibrant cities',
    'Roughing it',
    'Ultimate survival',
];

const list_2 = [
    'The beach',
    'Ultimate survival',
    'Vibrant cities',
    'Roughing it',
    'The mountains',
];

const list_3 = [
    { id: 1, name: 'The beach', top_destination: true },
    { id: 2, name: 'The mountains', top_destination: false },
    { id: 3, name: 'Vibrant cities', top_destination: true },
    { id: 4, name: 'Roughing it', top_destination: false },
    { id: 5, name: 'Ultimate survival', top_destination: false },
    { id: 6, name: '', top_destination: true },
];

const obj_1 = {
    val_1: 'Value 1',
    val_2: 'Value 2',
    val_3: 'Value 3',
    val_4: 'Value 4',
};

const UltimateHolidayList = function () {

    const [list, set_list] = useState(list_1);
    const [show_all, set_show_all] = useState(true);

    const list_view = list.map(function (item, index) {

//  In this case <Fragment> element is unnecessary since we
//  are returning one JSX element. We use it just as an example
//  that Fragment element can resceive a key prop.

        return (
            <Fragment key={item}>
                <li>
                    <label htmlFor={`item-${index}`}>{ item }</label>
                    <input id={`item-${index}`} />
                </li>
            </Fragment>
        );
    });

    const list_3_view = (
        list_3
            .filter(function (item) {
                return show_all ? true : item.name && item.top_destination;
//              return show_all ? item.name : item.name && item.top_destination
            })
            .map(function (item) {
                return <li key={item.id.toString()} >{item.name}</li>;
            })
    );

    const change_view_handler = function () {
        set_list(
            list === list_1 
            ? list_2
            : list_1
        );
    };

    const show_all_handler = function () {
        set_show_all(true);
    };

    const show_top_destination_handler = function () {
        set_show_all(false);
    };

    return (
        <section>
            <h1>The Ultimate Holiday List</h1>
            <ul>
                <button onClick={change_view_handler}>Change List</button>
                { list_view }
                <li><h4>Render a list/Array of obejct</h4></li>
                <button onClick={show_all_handler}>Show All</button>
                <button onClick={show_top_destination_handler}>Show top destinations</button>
                { list_3_view }
            </ul>

            <h1>The Ultimate Object List</h1>
            <ol>
                {
                    Object
                        .keys(obj_1)
                        .map(function (key) {
                            return <li key={key}>{obj_1[key]}</li>
                        })
                }
            </ol>
        </section>
    );
};

//  const UltimateHolidayList = function () {
//      return (
//          <section>
//              <h1>The Ultimate Holiday List</h1>
//              <ul>
//                  {
//                      list.map(
//                          function (item, index) { 
//                              return ( <li>{item.name}</li> );
//                          }
//                      )
//                  }
//              </ul>
//          </section>
//      );
//  };

export default UltimateHolidayList;
