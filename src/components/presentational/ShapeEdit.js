import React, { useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../../constants/index';
import { Slider, Button, InputLabel, FormControl, MenuItem, Select, TextField } from '@material-ui/core';

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
                console.log(json)
                props.dispatch({type: "HTTP_EDIT_SHAPE", animation: json})
            })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setShape({
                ...shape, 
                [name]: value
            })
    }
    return (
        <div>
            <h3>Shape</h3>
            <Button onClick={handleSubmit}>Save Shape</Button>
            <div>
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
                        name="type"
                        value={shape.type} 
                        onChange={handleInputChange}>
                        <MenuItem value="rect" >Rectangle</MenuItem>
                        <MenuItem value="ellipse" >Ellipse</MenuItem>
                        <MenuItem value="triangle" >Triangle</MenuItem>
                        <MenuItem value="line" >Line</MenuItem>
                    </Select>
                </FormControl>
                <form>
                    <TextField 
                        name="fill"
                        label="Fill"
                        onChange={handleInputChange} />
                    <TextField 
                        name="stroke"
                        label="Stroke"
                        onChange={handleInputChange} />
                    <TextField 
                        name="width"
                        label="Width"
                        onChange={handleInputChange} />
                    <TextField 
                        name="amount"
                        label="Amount"
                        onChange={handleInputChange} />
                    <TextField 
                        name="orbit"
                        label="Orbit"
                        onChange={handleInputChange} />
                    <TextField 
                        name="spin"
                        label="Spin"
                        onChange={handleInputChange} />
                </form>
            </div>
        </div>
    )
}

export default connect()(ShapeEdit)