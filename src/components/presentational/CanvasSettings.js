import React, { useState } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { HEADERS, API_ROOT } from '../../constants';

const CanvasSettings = props => {
    const [background, setBackground] = useState([...props.canvas.background.split(',').map(num => parseInt(num))])

    const handleChange = (num,v) => {
        setBackground([...background.slice(0,num), v, ...background.slice(num+1)])
    }

    const useStyles = makeStyles(theme => ({
        root: {
          height: 100,
        },
        margin: {
          height: theme.spacing(3),
        },
    }));

    const handleSaveCanvas = () => {
        fetch(`${API_ROOT}/pictures/${props.canvas.id}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                picture: {
                    background: background.join(',')
                }
            })
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
            })
    }

    return (
        <div className={useStyles().root}>
            <Button onClick={handleSaveCanvas}>Save Canvas</Button>
            <Typography id="vertical-slider" gutterBottom>
                Background Color
            </Typography>
            <Slider 
                valueLabelDisplay='on' 
                value={background[0]}
                min={0}
                max={255}
                lable="Red" 
                onChange={(e,v) => handleChange(0, v)} />
            <Slider 
                valueLabelDisplay='on' 
                value={background[1]}
                min={0}
                max={255}
                label="Blue" 
                onChange={(e,v) => handleChange(1, v)} />
            <Slider 
                valueLabelDisplay='on' 
                value={background[2]}
                min={0}
                max={255}
                label="Green" 
                onChange={(e,v) => handleChange(2, v)} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        canvas: state.canvas
    }
}

export default connect(mapStateToProps)(CanvasSettings)