import React from 'react';

import {NavLink} from 'react-router-dom'

const Navbar = props => {

    const conditionalUserLink = () => {
        if (props.loggedin) {
            return (
                <>
                    <li>
                        <button onClick={props.handleLogout}>
                            Log out
                        </button>
                    </li>
                    <li>
                        <NavLink exact to="/user" >  
                            Profile
                        </NavLink>
                    </li>
                </>
            ) 
        } else {
            return (
                <button onClick={() => props.toggleModal()}>
                    Log in
                </button>
            )
        }
    }

    return (
        <header >
            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <NavLink exact to="/" >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/about" >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/canvases" >
                            Canvases
                        </NavLink>
                    </li>
                    {conditionalUserLink()}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar