import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../../constants/index';
import { Slider, Button, FormControl, MenuItem, Select, Typography, Divider } from '@material-ui/core';
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

const ShapeEdit = props => {

    useEffect(() => {
        if (props.shape.id !== shape.id) {
            setShape({
                ...props.shape,
                fill: [...props.shape.fill.split(',').map(num => parseInt(num))],
                stroke: [...props.shape.stroke.split(',').map(num => parseInt(num))]
            })
        }
    })

    const [shape, setShape] = useState({
        ...props.shape,
        fill: [...props.shape.fill.split(',').map(num => parseInt(num))],
        stroke: [...props.shape.stroke.split(',').map(num => parseInt(num))]
    })

    const handleSubmit = () => {
        fetch(`${API_ROOT}/p5_shapes/${props.shape.id}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                p5_shape: {
                    ...shape,
                    stroke: shape.stroke.join(','),
                    fill: shape.fill.join(',')
                }
            })}
        )
            .then(resp => resp.json())
            .then(json => {
                props.dispatch({type: "HTTP_EDIT_SHAPE", animation: json})
            })
    }

    const handleDelete = () => {
        fetch(`${API_ROOT}/p5_shapes/${props.shape.id}`, {
            method: "DELETE",
            headers: HEADERS
        })
            .then(resp => resp.json())
            .then(json => {
                props.dispatch(json)
            })
    }

    const handleInputChange = (name, value) => {
        setShape({
                ...shape, 
                [name]: value
            })
    }

    const handleColorChange = (id, name, value) => {
        setShape({
            ...shape,
            [name]: [...shape[name].slice(0,id), value, ...shape[name].slice(id + 1)]
        })
    }

    return (
        <>
        <div className="tool-header">
            <Button onClick={handleSubmit}>Save Shape</Button>
            <Button onClick={handleDelete}>Delete Shape</Button>
        </div>
        <div className="tool" >
            <div className="toolbox1">
                <FormControl>
                    <Select 
                        labelId="frequency-select"
                        id="frequency"
                        name="frequency"
                        defaultValue={""}
                        value={shape.frequency} 
                        onChange={(e,v) => handleInputChange("frequency", e.target.value)}>
                        <MenuItem value="treble" >Treble</MenuItem>
                        <MenuItem value="mid" >Mid</MenuItem>
                        <MenuItem value="bass" >Bass</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <Select 
                        labelId="shape-select"
                        id="shape"
                        name="shape"
                        defaultValue={""}
                        value={shape.shape} 
                        onChange={(e,v) => handleInputChange("shape", e.target.value)}>
                        <MenuItem value="rect" >Rectangle</MenuItem>
                        <MenuItem value="ellipse" >Ellipse</MenuItem>
                        <MenuItem value="triangle" >Triangle</MenuItem>
                        <MenuItem value="line" >Line</MenuItem>
                    </Select>
                </FormControl>
                <Typography id="vertical-slider" gutterBottom>
                    Stagger Radius 
                </Typography>
                <Slider 
                    name="stagger_radius"
                    label="stagger_radius"
                    min={-20}
                    max={20}
                    value={shape["stagger_radius"]}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleInputChange("stagger_radius", v)} />
                <Typography id="vertical-slider" gutterBottom>
                    Stagger Place
                </Typography>
                <Slider 
                    name="stagger_place"
                    label="stagger_place"
                    min={-20}
                    max={20}
                    value={shape['stagger_place']}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleInputChange("stagger_place", v)} />
            </div>
            <div className="toolbox2">
                        <Typography id="slider" gutterBottom>
                            Fill Color
                        </Typography>
                    <RedSlider 
                        value={shape.fill[0]}
                        min={0}
                        max={255}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleColorChange(0, "fill", v)} />
                    <GreenSlider 
                        value={shape.fill[1]}
                        min={0}
                        max={255}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleColorChange(1, "fill", v)} />
                    <BlueSlider 
                        value={shape.fill[2]}
                        min={0}
                        max={255}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleColorChange(2, "fill", v)} />
          
            </div>
            <div className="toolbox4">
                        <Typography id="vertical-slider" gutterBottom>
                            Width
                        </Typography>
                        <Slider 
                            name="width"
                            label="Width"
                            min={0}
                            max={50}
                            orientation="vertical"
                            value={shape.width}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("width", v)} />
                        <Typography id="vertical-slider" gutterBottom>
                            Height
                        </Typography>
                        <Slider 
                            name="height"
                            label="height"
                            min={0}
                            max={50}
                            orientation="vertical"
                            value={shape.height}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("height", v)} />
                        <Typography id="vertical-slider" gutterBottom>
                            Amount
                        </Typography>
                        <Slider 
                            name="amount"
                            label="Amount"
                            min={0}
                            max={20}
                            orientation="vertical"
                            value={shape.amount}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("amount", v)}
                            />
                        <Typography id="vertical-slider" gutterBottom>
                            Orbit
                        </Typography>
                        <Slider
                            name="orbit"
                            label="Orbit"
                            min={-100}
                            orientation="vertical"
                            value={shape.orbit}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("orbit", v)} />
                        <Typography id="vertical-slider" gutterBottom>
                            Spin
                        </Typography>
                        <Slider
                            name="spin"
                            label="Spin"
                            min={-100}
                            orientation="vertical"
                            value={shape.spin}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("spin", v)}
                            />
            </div>
            <div className="toolbox3">
                    <Typography id="slider" gutterBottom>
                            Stroke Color
                        </Typography>
                    <RedSlider 
                        name="stroke"
                        valueLabelDisplay="auto"
                        value={shape.stroke[0]}
                        min={0}
                        max={255}
                        aria-label="Stroke"
                        onChange={(e,v) => handleColorChange(0, "stroke", v)} />
                    <GreenSlider 
                        name="stroke"
                        label="Stroke"
                        valueLabelDisplay="auto"
                        value={shape.stroke[1]}
                        min={0}
                        max={255}
                        onChange={(e,v) => handleColorChange(1, "stroke", v)} />
                    <BlueSlider 
                        name="stroke"
                        label="Stroke"
                        valueLabelDisplay="auto"
                        value={shape.stroke[2]}
                        min={0}
                        max={255}
                        onChange={(e,v) => handleColorChange(2, "stroke", v)} />
            </div>  
            
        </div>
        <Divider />
        </>
    )
}


export default connect()(ShapeEdit)