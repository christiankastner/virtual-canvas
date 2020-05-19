import React from 'react';
import CanvasCard from '../../components/CanvasCard/CanvasCard'
import { Link } from 'react-router-dom';
import "./DisplayCanvases.scss"

const DisplayCanvases = (props) => {
    const renderCanvases = () => {
        if (props.canvases && props.canvases.length > 0) {
            return props.canvases.map(canvas => {
                return (
                    <li key={canvas.id}>
                        <Link key={canvas.id} to={`/canvases/${canvas.id}`} >
                            <CanvasCard canvas={canvas} user={canvas.user ? canvas.user.name : ""} />
                        </Link>
                    </li>
                )
            })
        }
    }

    return (
        <ul>
            {props.title ? <h3>{props.title}</h3> : ""}
            {renderCanvases()}
        </ul>
    )
}

export default DisplayCanvases