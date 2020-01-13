import React from 'react';
import CanvasShowContainer from './containers/CanvasShowContainer'
import { API_ROOT, HEADERS } from './constants/index'

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
                this.setState({
                    canvas: json,
                    myAnimations: json.animate_mos.filter(animation => animation.user_id == localStorage["id"])
                })
            })
    }

    handleNewAnimation = () => {
        console.log("I'm here")
        fetch(`${API_ROOT}/animate_mos`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                user_id: localStorage["id"],
                picture_id: this.props.paramsId
            })
        })
    }

    render() {
        return (
            <div className="canvas-show">
                <h2>{this.state.canvas.title}</h2>
                <CanvasShowContainer 
                    paramsId={this.props.match.params.id} 
                    handleNewAnimation={this.handleNewAnimation}
                    canvas={this.state.canvas} 
                    myAnimations={this.state.myAnimations}/>
            </div>
        )
    }
}

export default CanvasShow