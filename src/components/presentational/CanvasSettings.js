import React, { useState } from 'react';
import { connect } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
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
        <div className="canvas-settings">
            <Button onClick={handleSaveCanvas}>Save Canvas</Button>
            <Typography id="vertical-slider" gutterBottom>
                Background Color
            </Typography>
            <div className="red-slider">
                <RedSlider 
                    value={background[0]}
                    min={0}
                    max={255}
                    lable="Red" 
                    onChange={(e,v) => handleChange(0, v)} />
            </div>
            <BlueSlider 
                value={background[1]}
                min={0}
                max={255}
                label="Blue" 
                onChange={(e,v) => handleChange(1, v)} />
            <GreenSlider 
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