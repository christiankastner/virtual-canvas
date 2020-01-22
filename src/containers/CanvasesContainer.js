import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import { API_ROOT, HEADERS } from '../constants/index'
import DisplayCanvases from './DisplayCanvases';

class CanvasesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canvases: [],
            newCanvas: {
                title: "",
                user_id: localStorage["id"]
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
        if (localStorage["id"]) {
            fetch(`${API_ROOT}/pictures`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    picture: this.state.newCanvas,
                })
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json)
                    this.setState(prevState => {
                        return {
                            canvases: [...prevState.canvases, json]
                        }
                    })
                })
        }
    }

    handleOnChange = (event) => {
        this.setState({
            newCanvas: {
                ...this.state.newCanvas,
                [event.target.id]: event.target.value
            }
        })
    }
    
    render() {
        return (
            <>
                <div >
                    {localStorage["id"] ? <Form onChange={this.handleOnChange}>
                        <label>Name</label><br/>
                        <Form.Group >
                            <Form.Field >
                                <input value={this.state.newCanvas.title} id="title"/>
                            </Form.Field>
                            <Button onClick={() => this.handleNewCanvas()}>New Canvas</Button>
                        </Form.Group>
                    </Form> : ""}
                </div>
                <div>
                    <h3>Canvases</h3>
                    <DisplayCanvases canvases={this.state.canvases} />
                </div>
            </>
        )
    }
}

export default CanvasesContainer

