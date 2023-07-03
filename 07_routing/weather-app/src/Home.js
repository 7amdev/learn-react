import React from "react";
import { Link } from "react-router-dom";

const Home = function () {
    return (
        <section>
            <h1>Home</h1>
            <nav aria-label="main">
                <ul>
                    <li>
                        <Link to={"/reports/celsius"}>Temperature in celsius</Link>
                    </li>
                    <li>
                        <Link to={"/reports/fahrenheit"}>Temperature in fahrenheit</Link>
                    </li>
                    <li>
                        <Link to={"/reports/kelvin"}>Temperature in kelvin</Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
};

export default Home;