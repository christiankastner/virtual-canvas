import React from 'react';
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { API_ROOT, HEADERS } from '../constants/index'
import DisplayCanvases from './DisplayCanvases';

class CanvasesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            canvases: [],
            newCanvas: {
                title: "",
                user_id: this.props.user_id
            }
        }
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            fetch(`${API_ROOT}/pictures`)
                .then(resp => resp.json())
                .then(json => {
                    this.setState({
                        canvases: json,
                        loading: false
                    })
                })
        })
    }

    handleNewCanvas = () => {
        if (this.props.user_id) {
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
                    this.props.handleNewCanvas(json)
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
                <div className="canvas-form">
                    <h3>Create Your Own</h3>
                    {this.props.user_id ? <Form onChange={this.handleOnChange}>
                        <label>Name</label><br/>
                        <Form.Group >
                            <Form.Field >
                                <input value={this.state.newCanvas.title} id="title"/>
                            </Form.Field>
                            <Button onClick={() => this.handleNewCanvas()}>New Canvas</Button>
                        </Form.Group>
                    </Form> : <h4>Must login or create a profile to create a canvas</h4>}
                </div>
                <div className="canvas-list">
                    <h3>Active Canvases</h3>
                    {this.state.loading ? <CircularProgress /> : ""}
                    <DisplayCanvases canvases={this.state.canvases} />
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    }
}

export default connect(mapStateToProps)(CanvasesContainer)

