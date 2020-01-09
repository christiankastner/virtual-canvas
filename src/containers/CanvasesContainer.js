import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import { API_ROOT, HEADERS } from '../constants/index'

class CanvasesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canvases: [],
            newCanvas: {
                name: ""
            }
        }
    }

    componentDidMount() {
        fetch(`${API_ROOT}/pictures`)
            .then(resp => resp.json())
            .then(json => {
                this.setState({
                    canvases: json
                })
            })
    }

    handleNewCanvas = () => {
        fetch(`${API_ROOT}/pictures`, {
            method: 'Post',
            headers: HEADERS,
            body: JSON.stringify(this.state.newCanvas)
        })
    }

    handleOnChange = (event) => {
        this.setState({
            newCanvas: {
                ...this.state.newCanvas,
                [event.target.id]: event.target.value
            }
        })
    }



    renderCanvases
    render() {
        return (
            <div >
                <Form onChange={this.handleOnChange}>
                    <Form.Field >
                        <label>Name</label>
                        <input value={this.state.newCanvas.title} id="name"/>
                    </Form.Field>
                    <Button onClick={this.handleNewCanvas}>New Canvas</Button>
                </Form>
            </div>
        )
    }
}

export default CanvasesContainer

