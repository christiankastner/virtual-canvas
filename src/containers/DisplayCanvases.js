import React from 'react';
import { Link } from 'react-router-dom';


const DisplayCanvases = (props) => {
    const renderCanvases = () => {
        return props.canvases ? props.canvases.map(canvas => {
            return (
                <div key={canvas.id}>
                    <Link key={canvas.id} to={`/canvases/${canvas.id}`} >
                        {canvas.title}
                    </Link>
                </div>
            )
        }) : []
    }

    return (
        <div className="canvas-list">
            {renderCanvases()}
        </div>
    )
}

export default DisplayCanvases