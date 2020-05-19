import React from 'react'
import {ReactComponent as Line} from "../../assets/Line.svg"
import "./Landing.scss"

const Landing = () => {

    return (
        <div>
            <main>
                <div className="banner-text">
                    <h1>
                        Build Visualizers Together
                    </h1>
                    <p>
                    A space for friends to jump onto online canvases, share music, draw, and animate shapes
                    </p>
                    <button>Get Started</button>
                </div>
            </main>
            <div className="line-container">
                <Line />
            </div>
        </div>
    )
}

export default Landing