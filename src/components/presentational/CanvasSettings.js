import React, { useState } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider'

const CanvasSettings = props => {
    const [backgroundRed, setBackgroundRed] = useState({...props.})
    

    const useStyles = makeStyles(theme => ({
        root: {
          width: 300,
        },
        margin: {
          height: theme.spacing(3),
        },
     }));

    return (
        <div className={useStyles().root}>
            <Slider 
                orientation="vertical" 
                valueLabelDisplay='auto' 
                name="background" 
                onChange={(e,v) => handleChange("red", v)} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        canvas: state.canvas
    }
}

export default connect(mapStateToProps)(CanvasSettings)