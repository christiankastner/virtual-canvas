import React from 'react';
import CanvasShowContainer from './containers/CanvasShowContainer'
import { API_ROOT } from './constants/index'

class CanvasShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            canvas: {}
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        fetch(`${API_ROOT}/pictures/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                this.setState({
                    canvas: json
                })
            })
    }

    render() {
        return (
            <div className="canvas-show">
                <h2>{this.state.canvas.title}</h2>
                <CanvasShowContainer paramsId={this.props.match.params.id} canvas={this.state.canvas} />
            </div>
        )
    }
}

export default CanvasShow