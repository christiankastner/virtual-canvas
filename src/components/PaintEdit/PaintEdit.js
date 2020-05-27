import React, { useState } from 'react'
import "./PaintEdit.scss"
import { connect } from "react-redux"
import ColorPicker from "../ColorPicker/ColorPicker"
import { Slider } from "@material-ui/core"

const PaintEdit = props => {

    const [stroke, setStroke] = useState({
        red: 0,
        green: 0,
        blue: 0,
        weight: 1
    })

    const handleChange = (color,v) => {
        setStroke({
            ...stroke,
            [color]: v
        })
    }

    const handleSave = () => {
        props.dispatch({type: "BRUSH_EDIT", brush: stroke})
    }

    return (
        <div className="paint-controls">
            <form>
                <h3>Stroke Weight</h3>
                <Slider 
                    name="strokeWeight"
                    label="strokeWeight"
                    min={0}
                    max={10}
                    value={stroke.weight}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleChange("weight", v)} />
                <h3>Stroke Color</h3>
                <ColorPicker red={stroke.red} blue={stroke.blue} green={stroke.green} handleChange={handleChange}/>
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