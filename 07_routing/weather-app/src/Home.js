import React from "react";
import { Link } from "react-router-dom";

import Section from "./Section";

const Home = function () {
    return (
        <Section heading_text={"Home"}>
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
            <p>This is the Home Page.</p>
        </Section>
    );
};

export default Home;