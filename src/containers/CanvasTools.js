import React from 'react';
import { Button } from 'semantic-ui-react'

const CanvasTools = (props) => {

    const renderMyAnimations = props.renderMyAnimations ? props.renderMyAnimations.map(animation => <AnimationCard animation={animation} />) : null

    return (
        <div className="tools">
            <Button onClick={props.handleClick}>New Burst</Button>
            {renderMyAnimations()}
        </div>
    )
}

export default CanvasTools