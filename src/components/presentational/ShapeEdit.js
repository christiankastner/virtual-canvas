import React, { useState } from 'react'

const ShapeEdit = props => {

    [shape, setShape] = useState({...props.shape})


    return (
        <div>
            <h3>Burst</h3>
            <Button onClick={handleSubmit}>Save Shape</Button>
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

export default ShapeEdit