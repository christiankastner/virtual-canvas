import React, { useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../../constants/index';
import { Slider, Button, FormControl, MenuItem, Select, Typography, Divider } from '@material-ui/core';


const ShapeEdit = props => {

    const [shape, setShape] = useState({...props.shape})

    const handleSubmit = () => {
        fetch(`${API_ROOT}/p5_shapes/${props.shape.id}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                p5_shape: {
                    ...shape
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

    return (
        <>
        <div className="tool" >
            <div className="toolbox1">
            <h3>Shape</h3>
            <Button onClick={handleSubmit}>Save Shape</Button>
            <Button onClick={handleDelete}>Delete Shape</Button>
                <FormControl>
                    <Select 
                        labelId="frequency-select"
                        id="frequency"
                        name="frequency"
                        value={shape.frequency} 
                        onChange={handleInputChange}>
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
                        value={shape.shape} 
                        onChange={handleInputChange}>
                        <MenuItem value="rect" >Rectangle</MenuItem>
                        <MenuItem value="ellipse" >Ellipse</MenuItem>
                        <MenuItem value="triangle" >Triangle</MenuItem>
                        <MenuItem value="line" >Line</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="toolbox2">
                        <Typography id="slider" gutterBottom>
                            Fill Color
                        </Typography>
                    <Slider 
                        name="fill"
                        label="Fill"
                        onChange={(e,v) => handleInputChange("width", v)} />
                    <Slider 
                        name="fill"
                        label="Fill"
                        onChange={(e,v) => handleInputChange("width", v)} />
                    <Slider 
                        name="fill"
                        label="Fill"
                        onChange={(e,v) => handleInputChange("width", v)} />
          
            </div>
            <div className="toolbox4">
                        <Typography id="vertical-slider" gutterBottom>
                            Width
                        </Typography>
                        <Slider 
                            name="width"
                            label="Width"
                            orientation="vertical"
                            value={shape.width}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("width", v)} />
                        <Typography id="vertical-slider" gutterBottom>
                            Amount
                        </Typography>
                        <Slider 
                            name="amount"
                            label="Amount"
                            onChange={handleInputChange} 
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange} 
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
                    <Slider 
                        name="stroke"
                        label="Stroke"
                        onChange={handleInputChange} />
                    <Slider 
                        name="stroke"
                        label="Stroke"
                        onChange={handleInputChange} />
                    <Slider 
                        name="stroke"
                        label="Stroke"
                        onChange={handleInputChange} />
            </div>  
            
        </div>
        <Divider />
        </>
    )
}

export default connect()(ShapeEdit)