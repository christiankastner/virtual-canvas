import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {ReactComponent as Logo} from '../assets/header.svg'
import './styles/NavBar.scss'

const Navbar = props => {

    const conditionalUserLink = () => {
        if (props.user_id) {
            return (
                <>
                    <li>
                        <NavLink exact to="/" >
                            <button onClick={handleLogout}>
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

    const handleLogout = () => {
        localStorage.clear()
        props.dispatch({type: "LOGOUT"})
      }

    return (
        <header >
            <Logo />
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

const mapStateToProps = (state) => {
    return {
        user_id: state.user_id
    }
}

export default connect(mapStateToProps)(Navbar)