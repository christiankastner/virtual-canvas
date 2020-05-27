import React from "react"
import "./ColorPicker"
import { Slider } from '@material-ui/core'
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

const ColorPicker = ({red, green, blue, handleChange}) => {
    return (
        <>
            <RedSlider 
                value={red}
                min={0}
                max={255}
                lable="Red" 
                valueLabelDisplay='auto'
                onChange={(e,v) => handleChange("red", v)} />
            <GreenSlider 
                value={green}
                min={0}
                max={255}
                valueLabelDisplay='auto'
                label="Green" 
                onChange={(e,v) => handleChange("green", v)} />
            <BlueSlider 
                value={blue}
                min={0}
                max={255}
                valueLabelDisplay='auto'
                label="Blue" 
                onChange={(e,v) => handleChange("blue", v)} />
        </>
    )
}

export default ColorPicker