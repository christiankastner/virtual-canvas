import React from 'react';
import { Button } from 'semantic-ui-react'

const CanvasTools = (props) => {

    return (
        <div className="tools">
            <Button onClick={props.handleClick}>New Burst</Button>
        </div>
    )
}

export default CanvasTools