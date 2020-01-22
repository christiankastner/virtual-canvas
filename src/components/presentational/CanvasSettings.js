import React, { useState } from 'react';
import { connect } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { HEADERS, API_ROOT } from '../../constants';
import { withStyles } from '@material-ui/core/styles'

const RedSlider = withStyles({
    root: {
        color: 'red'
    },
    thumb: {
        color: 'red'
    }
})(Slider);

const GreenSlider = withStyles({
    root: {
        color: 'green'
    },
    thumb: {
        color: 'green'
    }
})(Slider)

const BlueSlider = withStyles({
    root: {
        color: 'blue'
    },
    thumb: {
        color: 'blue'
    }
})(Slider)

// const theme = createMuiTheme({
//     status: {
//         red: 'red',
//         green: 'green',
//         blue: 'blue'
//     }
// })

const CanvasSettings = props => {
    const [background, setBackground] = useState([...props.canvas.background.split(',').map(num => parseInt(num))])

    const handleChange = (num,v) => {
        setBackground([...background.slice(0,num), v, ...background.slice(num+1)])
    }

    const handleInputChange = () => {
        
    }

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
        <>
        <div className="canvas-settings">
            <Button onClick={handleSaveCanvas}>Save Canvas</Button>
            <Typography id="vertical-slider" gutterBottom>
                Background Color
            </Typography>
            <RedSlider 
                value={background[0]}
                min={0}
                max={255}
                lable="Red" 
                valueLabelDisplay='auto'
                onChange={(e,v) => handleChange(0, v)} />
            <BlueSlider 
                value={background[1]}
                min={0}
                max={255}
                valueLabelDisplay='auto'valueLabelDisplay='auto'
                label="Blue" 
                onChange={(e,v) => handleChange(1, v)} />
            <GreenSlider 
                value={background[2]}
                min={0}
                max={255}
                valueLabelDisplay='auto'
                label="Green" 
                onChange={(e,v) => handleChange(2, v)} />
        </div>
        <div className="canvas-settings">
            <h1>Frequency Mappings</h1>
            <Typography id="vertical-slider" gutterBottom>
                Bass Mapping
            </Typography>
            <Slider
                name="radius_1"
                orientation="vertical"
                value={0}
                label="Radius 1"
                valueLabelDisplay='auto'
                onChange={(e,v) => handleInputChange("radius_1", v)} />
        </div>
        <Divider />
        </>
    )
}

const mapStateToProps = state => {
    return {
        canvas: state.canvas
    }
}

export default connect(mapStateToProps)(CanvasSettings)