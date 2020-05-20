import React from 'react';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { api } from '../../services/api'
import DisplayCanvases from '../DisplayCanvases/DisplayCanvases';
import "./CanvasesContainer.scss"

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
            api.canvas.fetchCanvases()
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
    
    render() {
        return (
            <>
                {/* <div className="canvas-form">
                    <h3>Create Your Own</h3>
                    {this.props.user_id ? <form onChange={this.handleOnChange}>
                                <input value={this.state.newCanvas.title} id="title"/>
                    </form> : <h4>Must login or create a profile to create a canvas</h4>}
                </div> */}
                {/* <div id='divider'/> */}
                {this.state.loading ? <CircularProgress /> : ""}
                <DisplayCanvases canvases={this.state.canvases} />
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

