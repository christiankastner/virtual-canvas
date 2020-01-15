import React from 'react';
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { API_ROOT, HEADERS } from '../../constants/index'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'

class BurstEdit extends React.Component {
    state = {
        burst: this.props.selectAnimation
    }

    handleSliderChange = (sliderId) => {
        return (data, newValue) => {
            this.setState({
                burst: {
                    ...this.state.burst,
                    [sliderId]: newValue
                }
            })
        }
    }

    handleSelectChange = (data) => {
        this.setState({
            burst: {
                ...this.state.burst, 
                [data.id]: data.value
            }
        })
    }

    handleSubmit = () => {
        fetch(`${API_ROOT}/animate_mos/${this.props.selectAnimation.id}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                animate_mo: {
                    ...this.state.burst
                }
            })}
        )
            .then(resp => resp.json())
            .then(json => {
                this.props.dispatch({type: "HTTP_EDIT_ANIMATION", animation: json})
            })
    }

    conditionalFormRender = () => {
        const shapeOptions = [
            {text: "Circle", value: "circle"},
            {text: "Rectangle", value: "rect"},
            {text: "Cross", value: "cross"},
            {text: "Polygon", value: "polygon"},
            {text: "Zigzag", value: "zigzag"},
            {text: "Curve", value: "curve"},
        ]
        if (this.props.selectAnimation !== null) {
            return (
                <Form onChange={this.handleChange} >
                    <label><h2>Burst {this.props.selectAnimation.id}</h2></label>
                    <Form.Dropdown id="shape" onChange={(e,data) => this.handleSelectChange(data)} placeholder={this.props.selectAnimation.shape} options={shapeOptions} />
                    <Slider 
                        onChange={this.handleSliderChange("radius")} 
                        aria-labelledby="range-slider" />
                    <Button onClick={this.handleSubmit}>Save Burst</Button>
                </Form>
            )
        } else {
            return <h3>Nothing Selected</h3>
        }
    }
    render() {
        return (
            <div className="animation-edit" >
                {this.conditionalFormRender()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectAnimation: state.selectAnimation
    }
}

export default connect(mapStateToProps)(BurstEdit)