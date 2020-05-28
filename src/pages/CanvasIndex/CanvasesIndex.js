import React from 'react';
import CanvasesContainer from '../../containers/CanvasesContainer/CanvasesContainer'
import "./CanvasesIndex.scss"

const CanvasesIndex = props => {

    const handleNewCanvas = (canvas) => {
        props.history.push(`/canvases/${canvas.id}`)
    }

    return (
        <main className="canvases-index" >
            <CanvasesContainer handleNewCanvas={handleNewCanvas}/>
        </main>
    )
    
}

export default CanvasesIndex