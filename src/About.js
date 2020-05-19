import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {

    return (
        <div className="about-container" >
            <div className="about-card">
                {/* <img className="left" src={image} alt="lights" /> */}
                <div className="right" >
                    <div className="text">
                        <h2>
                            SHARED CANVASES <br/><span>FOR AUDIO VISUALIZATION</span>
                        </h2>
                        <p>
                            Virtual Canvas is an app that lets you and any of your friends jump on the same canvas to create a visualizer together. Shapes, bursts, and canvas settings all render in real time across your screen and anyone else who wants to join. Using the same technology as instant messaging, users create, update, and delete visualizer shapes in a live and creative shared space.
                        </p>
                    </div>
                    <div className="links">
                        <button>
                            <Link exact to="/canvases" >
                                    <b>GET STARTED</b>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About