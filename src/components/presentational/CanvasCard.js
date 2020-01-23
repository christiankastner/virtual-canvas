import React from 'react'

const CanvasCard = props => {

    return (
        <div className="canvas-card" >
            <h4>{props.canvas.title}</h4>
            <p>{props.username}</p>
        </div>
    )
}

export default CanvasCard