import React, { useState } from 'react'
import "./PaintEdit.scss"
import { connect } from "react-redux"
import ColorPicker from "../ColorPicker/ColorPicker"
import { Slider } from "@material-ui/core"

const PaintEdit = props => {

    const [stroke, setStroke] = useState({
        red: props.myBrush.red,
        green: props.myBrush.green,
        blue: props.myBrush.blue,
        weight: props.myBrush.weight
    })

    const handleChange = (color,v) => {
        setStroke({
            ...stroke,
            [color]: v
        })
    }

    const handleSave = (e) => {
        e.preventDefault()
        props.dispatch({type: "BRUSH_EDIT", brush: stroke})
    }

    return (
        <div className="paint-controls">
            <form onSubmit={handleSave}>
                <button className="save-btn" type="submit">Save Changes</button>
                <h4>Stroke Weight</h4>
                <Slider 
                    name="strokeWeight"
                    label="strokeWeight"
                    min={0}
                    max={10}
                    value={stroke.weight}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleChange("weight", v)} />
                <h4>Stroke Color</h4>
                <ColorPicker red={stroke.red} blue={stroke.blue} green={stroke.green} handleChange={handleChange}/>
            </form>
        </div>
    )
}

export default connect()(PaintEdit)