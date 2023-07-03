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
            <main>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/about" element={ <About /> } />
                    <Route path="/reports/:scale" element={ <Report /> } />
                    <Route path="*" element={ <h1>URL Not Found</h1> } />
                </Routes>
            </main>
            <Footer />
        </Fragment>
    );
};

export default App;