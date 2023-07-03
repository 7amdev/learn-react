import React, { Fragment } from "react";
import {Routes, Route, Link} from "react-router-dom"

import Home from "./Home";
import About from "./About";
import Footer from "./Footer";
import './app.css';

const App = function () {
    return (
        <Fragment>
            <nav aria-label="primary">
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"about"}>About</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/about" element={ <About /> } />
                </Routes>
            </main>
            <Footer />
        </Fragment>
    );
};

export default App;