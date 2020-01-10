import React from 'react';
import Canvas from '../components/Canvas'
import { ActionCableConsumer } from 'react-actioncable-provider'

class CanvasShowContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Canvas paramsId={this.props.paramsId} />
            </div>
        )
    }
}

export default CanvasShowContainer