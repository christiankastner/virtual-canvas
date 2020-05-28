import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {

    return (
        <main className="about-container" >
            <div >
                {/* <img className="left" src={image} alt="lights" /> */}
                <div className="right" >
                    <div className="text">
                        <h1>
                            Virtual Canvas
                        </h1>
                        <p>
                            Virtual Canvas is an app that lets you and any of your friends jump on the same canvas to create audio visualizers together. Shapes, bursts, music, and canvas settings all render in real time across your screen and anyone else who wants to join.
                        </p>
                        <p>
                            Anyone, logged in or not, can jump onto a canvas and see what others have made. On the bottom panel you'll be able to upload or play any of the music saved to this canvas. The shapes you build will move along to the music!
                        </p>
                        <p>
                            To get started, you'll need to create an account first. From there, you'll be able to jump onto any previously made canvas and start creating. You can paint and specialize your brush stroke with the settings on the left hand side.
                        </p>
                        <p>
                            You can then 
                        </p>
                    </div>
                    <div className="links">
                        <button>
                            <Link exact to="/canvases" >
                                    See Some Canvases
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default About