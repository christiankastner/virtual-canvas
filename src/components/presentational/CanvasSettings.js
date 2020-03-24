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

const CanvasSettings = props => {
    const [background, setBackground] = useState([...props.canvas.background.split(',').map(num => parseInt(num))])
    const [bass, setBass] = useState([props.canvas.bass_mapping_1, props.canvas.bass_mapping_2])
    const [mid, setMid] = useState([props.canvas.mid_mapping_1, props.canvas.mid_mapping_2])
    const [treble, setTreble] = useState([props.canvas.treble_mapping_1, props.canvas.treble_mapping_2])


    const handleChange = (num,v) => {
        setBackground([...background.slice(0,num), v, ...background.slice(num+1)])
    }

    const handleSaveCanvas = () => {
        api.canvas.editCanvas(props.canvas.id, {
            picture: {
                background: background.join(','),
                bass_mapping_1: bass[0],
                bass_mapping_2: bass[1],
                mid_mapping_1: mid[0],
                mid_mapping_2: mid[1],
                treble_mapping_1: treble[0],
                treble_mapping_2: treble[1]
            }
        })
            .then(resp => resp.json())
            .then(json => {return })
    }

    return (
        <>
            <div className="canvas-settings">
                <Button onClick={handleSaveCanvas}>Save Canvas</Button>
                <h3>Background Color</h3>
                <RedSlider 
                    value={background[0]}
                    min={0}
                    max={255}
                    lable="Red" 
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleChange(0, v)} />
                <GreenSlider 
                    value={background[1]}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    label="Green" 
                    onChange={(e,v) => handleChange(1, v)} />
                <BlueSlider 
                    value={background[2]}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    label="Blue" 
                    onChange={(e,v) => handleChange(2, v)} />
            </div>
            <div className="canvas-settings">
                <h3>Frequencies </h3>
                <Typography id="vertical-slider" gutterBottom>
                    Bass Mapping
                </Typography>
                <Slider
                    name="bass"
                    value={bass}
                    max={300}
                    label="bass"
                    valueLabelDisplay='auto'
                    onChange={(e,v) => setBass(v)} />
                <Typography id="vertical-slider" gutterBottom>
                    Mid Mapping
                </Typography>
                <Slider
                    name="mid"
                    value={mid}
                    label="mid"
                    max={300}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => setMid(v)} />
                <Typography id="vertical-slider" gutterBottom>
                    Treble Mapping
                </Typography>
                <Slider
                    name="treble"
                    value={treble}
                    label="treble"
                    max={300}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => setTreble(v)} />
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