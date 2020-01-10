import React from 'react';
import {Menu} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


const Navbar = props => {

    const conditionalUserLink = () => {
        if (props.loggedin) {
            return (
                <>
                    <Menu.Item name="login" onClick={props.handleLogout}>
                        Log out
                    </Menu.Item>
                    <NavLink exact to="/user" >
                        <Menu.Item name='profile'>
                            Profile
                        </Menu.Item>
                    </NavLink>
                </>
            ) 
        } else {
            return (
                <Menu.Item name="login" onClick={props.handleLogin}>
                    Log in
                </Menu.Item>
            )
        }
    }

    return (
        <Menu >
            <Menu.Menu position="right">
                <NavLink exact to="/" >
                    <Menu.Item name='home'>
                        Home
                    </Menu.Item>
                </NavLink>
                <NavLink exact to="/about" >
                    <Menu.Item name='about'>
                        About
                    </Menu.Item>
                </NavLink>
                <NavLink exact to="/canvases" >
                    <Menu.Item name='canvases'>
                        Canvases
                    </Menu.Item>
                </NavLink>
                {conditionalUserLink()}
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar