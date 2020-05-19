import React from 'react';
import CanvasesContainer from '../../containers/CanvasesContainer/CanvasesContainer'

const CanvasesIndex = props => {

    const handleNewCanvas = (canvas) => {
        props.history.push(`/canvases/${canvas.id}`)
    }

    return (
        <div className="canvases-index" >
            <CanvasesContainer handleNewCanvas={handleNewCanvas}/>
        </div>
    )
    
}

export default CanvasesIndex