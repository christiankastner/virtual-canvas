import React, { useState } from 'react'
import "./PaintEdit.scss"
import { connect } from "react-redux"
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

const PaintEdit = props => {

    const [stroke, setStroke] = useState({
        red: 0,
        green: 0,
        blue: 0
    })

    const handleChange = (color,v) => {
        setStroke({
            ...stroke,
            [color]: v
        })
    }

    return (
        <div className="paint-controls">
            <form>
                <h3>Stroke Color</h3>
                <RedSlider 
                    value={stroke.red}
                    min={0}
                    max={255}
                    lable="Red" 
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleChange("red", v)} />
                <GreenSlider 
                    value={stroke.green}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    label="Green" 
                    onChange={(e,v) => handleChange("green", v)} />
                <BlueSlider 
                    value={stroke.blue}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    label="Blue" 
                    onChange={(e,v) => handleChange("blue", v)} />
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        myBrush: state.myBrush
    }
}

export default connect()(PaintEdit)