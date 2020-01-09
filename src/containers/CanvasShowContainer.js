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
                <ActionCableConsumer
                        channel={{ 
                            channel: `PicturesChannel`, 
                            id: this.props.paramsId
                            }}
                        onReceived={this.handleRecievedBurst} 
                        onDisconnected={() => console.log("Disconnected")}
                        onConnected={() => console.log("Connected!")}/>
                <Canvas />
            </div>
        )
    }
}

export default CanvasShowContainer