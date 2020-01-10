import React from 'react';
import {Menu} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


const Navbar = props => {

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
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar