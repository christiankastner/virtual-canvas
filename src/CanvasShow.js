import React from 'react';
import {ActionCableConsumer} from 'react-actioncable-provider'
import Canvas from './components/Canvas'
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
        // fetch(`${API_ROOT}/pictures/${this.props.match.params.id}`)
        //     .then(resp => resp.json())
        //     .then(json => {
        //         this.setState({
        //             canvas: json
        //         })
        //     })
    }

    render() {
        console.log(this.props.match)
        return (
            <div className="canvas-show">
                <ActionCableConsumer />
                <h2>{}</h2>
                <Canvas />
            </div>
        )
    }
}

export default CanvasShow