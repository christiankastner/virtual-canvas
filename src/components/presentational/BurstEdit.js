import React, { useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../../constants/index';
import { Slider, Button, InputLabel, FormControl, MenuItem, Select, TextField } from '@material-ui/core';

const BurstEdit = props => {
  
    const [burst, setBurst] = useState({...props.animation})

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setBurst({
                ...burst, 
                [name]: value
            })
    }

    const handleSubmit = () => {
        fetch(`${API_ROOT}/animate_mos/${props.animation.id}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                animate_mo: {
                    ...burst
                }
            })}
        )
            .then(resp => resp.json())
            .then(json => {
                props.dispatch({type: "HTTP_EDIT_BURST", animation: json})
            })
    }

    const handleDelete = () => {
        fetch(`${API_ROOT}/animate_mos/${props.animation.id}`, {
            method: "DELETE",
            headers: HEADERS
        })
            .then(resp => resp.json())
            .then(json => {
                props.dispatch(json)
            })
    }
    
    return (
        <div>
            <h3>Burst</h3>
            <Button onClick={handleSubmit}>Save Burst</Button>
            <Button onClick={handleDelete}>Delete Burst</Button>
            <div>
                <FormControl>
                    <Select 
                        labelId="shape-select"
                        id="shape"
                        name="shape"
                        value={burst.shape} 
                        onChange={handleInputChange}>
                        <MenuItem value="circle" >Circle</MenuItem>
                        <MenuItem value="rect" >Rectangle</MenuItem>
                        <MenuItem value="cross" >Cross</MenuItem>
                        <MenuItem value="polygon" >Polygon</MenuItem>
                        <MenuItem value="zigzag" >Zigzag</MenuItem>
                        <MenuItem value="curve" >Curve</MenuItem>
                    </Select>
                </FormControl>
                <form>
                    <TextField 
                        name="color"
                        label="Color"
                        onChange={handleInputChange} />
                    <TextField 
                        name="radius_1"
                        label="Radius 1"
                        onChange={handleInputChange} />
                    <TextField 
                        name="radius_2"
                        label="Radius 2"
                        onChange={handleInputChange} />
                    <TextField 
                        name="count"
                        label="Count"
                        onChange={handleInputChange} />
                    <TextField 
                        name="duration"
                        label="Duration"
                        onChange={handleInputChange} />
                    <TextField 
                        name="angle"
                        label="Angle"
                        onChange={handleInputChange} />
                    <TextField 
                        name="stroke_width"
                        label="Stroke Width"
                        onChange={handleInputChange} />
                </form>
            </div>
        </div>
    )
}



export default connect()(BurstEdit)