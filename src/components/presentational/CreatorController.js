import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider'

const CreatorController = props => {
    const [canvas, setCanvas] = useState({...props.canvas})
    

    return (
        <form>
            <Slider valueLabelDisplay='auto' />
        </form>
    )
}