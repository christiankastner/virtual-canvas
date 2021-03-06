import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {ReactComponent as Logo} from '../../assets/header.svg'
import './NavBar.scss'

const Navbar = props => {

    const [open, setOpen] = useState(false)

    const handleMenuClick = () => {
        setOpen(!open)
    }

    const conditionalUserLink = () => {
        if (props.user_id) {
            return (
                <>
                    <li>
                        <NavLink onClick={handleMenuClick} exact to="/user" >  
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleMenuClick} exact to="/" >
                            <button onClick={handleLogout}>
                                Log out
                            </button>
                        </NavLink>
                    </li>
                </>
            ) 
        } else {
            return (
                <li>
                    <NavLink onClick={handleMenuClick} exact to="/login" >
                        Log In
                    </NavLink>
                </li>
            )
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        props.dispatch({type: "LOGOUT"})
      }

    return (
        <header >
            <Logo />
            <nav>
            <svg onClick={handleMenuClick} className="menu-btn" id="menu-btn" viewBox="0 0 100 80" width="40" height="40" >
                <rect width="100" height="20" fill="white"></rect>
                <rect y="30" width="100" height="20" fill="white"></rect>
                <rect y="60" width="100" height="20" fill="white"></rect>
            </svg>
                    <div className={open ? "nav-links" : "nav-links closed"}>
                        <ul>
                            <li>
                                <NavLink onClick={handleMenuClick} exact to="/" >
                                    Home
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink exact to="/about" >  
                                    About
                                </NavLink>
                            </li> */}
                            <li>
                                <NavLink onClick={handleMenuClick} exact to="/canvases" >
                                    Canvases
                                </NavLink>
                            </li>
                            {conditionalUserLink()}
                        </ul>
                    </div>
            </nav>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        user_id: state.user_id
    }
}

export default connect(mapStateToProps)(Navbar)