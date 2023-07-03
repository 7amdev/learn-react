import React, { Fragment } from "react";
import {Routes, Route, Link} from "react-router-dom"

import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import Report from "./Report";

import './app.css';

const App = function () {
    return (
        <Fragment>
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
            <main>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/about" element={ <About /> } />
                    <Route path="/reports/:scale" element={ <Report /> } />
                </Routes>
            </main>
            <Footer />
        </Fragment>
    );
};

export default App;