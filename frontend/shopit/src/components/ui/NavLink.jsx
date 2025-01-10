import React from 'react';
import { Link } from 'react-router-dom';

function NavLink () {
    return (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/" className="nav-link fw-semibold">Home</Link>    
            </li>
            <li className="nav-item">

                <Link to="/cart" className="nav-link fw-semibold">Cart</Link>        
            </li>
            <li className="nav-item">

                <Link to="/login" className="nav-link fw-semibold">Login</Link>
            </li>

        </ul>
    );
};

export default NavLink;