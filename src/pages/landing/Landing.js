import React from 'react'
import {ReactComponent as Line} from "../../assets/Line.svg"
import { NavLink } from "react-router-dom"
import "./Landing.scss"

const Landing = () => {
    return (
        <div>
            <main className="landing">
                <div className="banner-text">
                    <h1>
                        Build Visualizers Together
                    </h1>
                    <p>
                        A space for friends to jump onto online canvases, share music, draw, and animate shapes
                    </p>
                    <NavLink exact to="/about">
                        <button className="btn-primary">Get Started</button>
                    </NavLink>
                </div>
            </main>
            <div className="line-container">
                <Line />
            </div>
        </div>
    )
}

export default Landing