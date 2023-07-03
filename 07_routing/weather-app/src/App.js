import React from "react";
import {Route, Routes} from "react-router-dom"

import Home from "./Home";
import About from "./About";
import './app.css';



const App = function () {
    return (
        <main>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/about" element={ <About /> } />
            </Routes>
        </main>
    );
};

export default App;