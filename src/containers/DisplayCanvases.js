import React from 'react';
import { Link } from 'react-router-dom';

const DisplayCanvases = (props) => {
    const renderCanvases = () => {
        if (props.canvases.length > 0) {
            return props.canvases.map(canvas => {
                return (
                    <div key={canvas.id}>
                        <Link key={canvas.id} to={`/canvases/${canvas.id}`} >
                            {canvas.title}
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <div className="canvas-list">
        {props.title ? <h3>{props.title}</h3> : null}
            {renderCanvases()}
        </div>
    )
}

export default DisplayCanvases