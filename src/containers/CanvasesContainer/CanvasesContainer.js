import React from 'react';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { api } from '../../services/api'
import DisplayCanvases from '../DisplayCanvases/DisplayCanvases';
import "./CanvasesContainer.scss"
import Form from '../../components/Form/Form';

class CanvasesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            canvases: [],
            newCanvas: {
                seen: false,
                title: "",
                user_id: this.props.user_id
            }
        }
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            api.canvas.fetchCanvases()
                .then(resp => resp.json())
                .then(json => {
                    this.setState({
                        canvases: json.reverse(),
                        loading: false
                    })
                })
        })
    }

    handleSubmit = () => {
        if (this.props.user_id) {
            api.canvas.newCanvas(this.state.newCanvas)
                .then(resp => resp.json())
                .then(json => {
                    this.props.handleNewCanvas(json)
                    this.setState(prevState => {
                        return {
                            canvases: [...prevState.canvases, json]
                        }
                    })
                })
                .catch(console.log)
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

    showForm = () => {
        this.setState({
            newCanvas: {
                ...this.state.newCanvas,
                seen: !this.state.newCanvas.seen
            }
        })
    }
    
    render() {
        return (
            <div className="canvases-container">
                <div className="header">
                    <h1>Active Canvases</h1>
                    <button className="btn-primary" onClick={this.showForm}>New Canvas</button>
                </div>
                <div id="form" className={this.state.newCanvas.seen ? "": "seen"}>
                    <span className="error">{this.props.user_id ? "" : "Must Log in before creating a canvas"}</span>
                    <Form inputs={[{name:"title"}]} submitText="Create" handleSubmit={this.handleSubmit} />
                </div>
                {this.state.loading ? <CircularProgress /> : ""}
                <DisplayCanvases canvases={this.state.canvases} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.user_id
    }
}

export default connect(mapStateToProps)(CanvasesContainer)

