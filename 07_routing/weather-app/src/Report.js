import React, { Fragment } from "react";
import { weather_data } from "./Weather_data";
import { useParams } from "react-router-dom";

const Report = function () {
  const { scale } = useParams();
  const w_data = weather_data(scale.toLowerCase());
  const scale_title = scale && scale.charAt(0).toUpperCase() + scale.slice(1) || 'Kelvin';

  return (
    <section>
      <h1>Weather Report in{' '} { scale_title }</h1>
      <dl>
        { 
          w_data.map(function (data) {
            return (
              <Fragment key={data.city.toString()}>
                <dt>{ data.city }</dt>
                <dd><b>{ data.temp.toString() }</b></dd>
              </Fragment>
            );
          }) 
        }
      </dl>
    </section>
  );
};

export default Report;