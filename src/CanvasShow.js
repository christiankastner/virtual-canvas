import React from 'react';
import CanvasShowContainer from './containers/CanvasShowContainer'
import { API_ROOT, HEADERS } from './constants/index'
import { connect } from 'react-redux'

class CanvasShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canvas: {},
            myAnimations: [],
            selectedAnimation: null
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        fetch(`${API_ROOT}/pictures/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                this.props.dispatch({type: "LOAD_CANVAS", canvas: json})
                this.setState({
                    canvas: json,
                    myAnimations: json.animate_mos.filter(animation => animation.user_id == localStorage["id"])
                })
            })
    }

    handleNewAnimation = () => {
        fetch(`${API_ROOT}/animate_mos`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                animate_mo: {
                    user_id: localStorage["id"],
                    picture_id: this.props.paramsId
                }
            })
        })
            .then(resp => resp.json())
            .then(json => {
                if (!json.error) {
                    this.props.dispatch({type: "HTTP_NEW_ANIMATION", })
                }
            })
    }

    render() {
        return (
            <div className="canvas-show">
                <h2>{this.state.canvas.title}</h2>
                <CanvasShowContainer 
                    paramsId={this.props.match.params.id} 
                    handleNewAnimation={this.handleNewAnimation}
                    canvas={this.state.canvas} />
            </div>
        )
    }
}

export default connect()(CanvasShow)