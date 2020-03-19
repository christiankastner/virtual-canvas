import React from 'react';
import { NavLink } from 'react-router-dom'
import './styles/NavBar.scss'

const Navbar = props => {

    const conditionalUserLink = () => {
        if (props.loggedin) {
            return (
                <>
                    <li>
                        <NavLink exact to="/" >
                            <button onClick={props.handleLogout}>
                                Log out
                            </button>
                        </NavLink>
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
                        <NavLink exact to="/canvases" >
                            Canvases
                        </NavLink>
                    </li>
                    <li>
                        |
                    </li>
                    {conditionalUserLink()}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar