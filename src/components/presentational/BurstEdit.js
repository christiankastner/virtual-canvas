import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const BurstEdit = props => {
    
    const [burst, setBurst] = useState({})

    const handleChange = (data) => {
        console.log(data.id, data.value)
        setBurst({
            ...burst, 
            [data.id]: data.value
        })
    }

    const handleSubmit = () => {
        fetch(`${API_ROOT}/animate_mos/${props.selectAnimation.id}`, {
            method: 
        })
    }

    const shapeOptions = [
        {text: "Circle", value: "circle"},
        {text: "Rectangle", value: "rect"},
        {text: "Cross", value: "cross"},
        {text: "Polygon", value: "polygon"},
        {text: "Zigzag", value: "zigzag"},
        {text: "Curve", value: "curve"},
    ]

    const conditionalFormRender = () => {
        if (props.selectAnimation != null) {
            return (
                <Form onChange >
                    <label><h2>Burst {props.selectAnimation.id}</h2></label>
                    <Form.Dropdown id="shape" onChange={(e,data) => handleChange(data)} placeholder={props.selectAnimation.shape} options={shapeOptions} />
                    <Button onClick={handleSubmit}>Save Burst</Button>
                </Form>
            )
        } else {
            return <h3>Nothing Selected</h3>
        }
    }
    return (
        <div className="animation-edit" >
            {conditionalFormRender()}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectAnimation: state.selectAnimation
    }
}

export default connect(mapStateToProps)(BurstEdit)