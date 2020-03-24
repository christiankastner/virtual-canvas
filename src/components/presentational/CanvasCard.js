import React from 'react'
import CanvasImg from './CanvasImg'
import { Button } from '@material-ui/core'
import "./styles/CanvasCard.scss"

const CanvasCard = props => {
    return (
        <div className="canvas-card">
            <CanvasImg canvas={props.canvas} />
           
            <h4>{props.canvas.title}</h4>
            {props.delete ? <button>Delete</button> : <p>By: {props.user}</p>}
        </div>
    )
}

export default CanvasCard