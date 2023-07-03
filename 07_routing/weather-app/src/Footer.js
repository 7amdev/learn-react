import React from "react";
import { Link } from "react-router-dom";

const Footer = function () {
    return (
        <footer>
            <h4>Footer</h4>
            <nav aria-label="secondary">
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"about"}>About</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;