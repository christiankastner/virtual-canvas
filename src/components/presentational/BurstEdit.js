import React, { useState } from 'react';
import { connect } from 'react-redux'

import { API_ROOT, HEADERS } from '../../constants/index'

import { Slider, Button, InputLabel, FormControl, MenuItem, Select, TextField } from '@material-ui/core';

const BurstEdit = props => {
  
    const [burst, setBurst] = useState({
        color: "blue",
        shape: "circle"
    })

    const handleSliderChange = (sliderId) => {
        return (data, newValue) => {
            setBurst({
                    ...burst,
                    [sliderId]: newValue
                }
            )
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        console.log(event)
        setBurst({
                ...burst, 
                [name]: value
            })
    }

    const handleSubmit = () => {
        fetch(`${API_ROOT}/animate_mos/${this.props.selectAnimation.id}`, {
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
                props.dispatch({type: "HTTP_EDIT_ANIMATION", animation: json})
            })
    }

    const conditionalFormRender = () => {
        if (props.selectAnimation !== null) {
            return (
                <div>
                    <h3>Burst</h3>
                    <FormControl>
                    <InputLabel >Shape</InputLabel>
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
                        <MenuItem value="curve" >Circle</MenuItem>
                    </Select>
                    </FormControl>

                    <FormControl>
                    <InputLabel >Color</InputLabel>
                        <TextField 
                            id="color" 
                            name="color"
                            label="Color" 
                            onChange={handleInputChange} />
                    </FormControl>
                    <Slider 
                        onChange={handleSliderChange("radius")} 
                        aria-labelledby="range-slider" />
                    <Button onClick={handleSubmit}>Save Burst</Button>
            </div>
                
            )
        } else {
            return <h3>Nothing Selected</h3>
        }
    }
    
    return (
        <>
            {conditionalFormRender()}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        selectAnimation: state.selectAnimation
    }
}

export default connect(mapStateToProps)(BurstEdit)