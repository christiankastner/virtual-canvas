import React from 'react';
import burst from "./Burst"
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants/index'

class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bursts: []
        }
    }

    handleClick = e => {
        console.log("I clicked!")
        fetch(`${API_ROOT}/animate_mos`, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({
            loc_x: e.pageX,
            loc_y: e.pageY,
            user_id: 1,
            picture_id: this.props.paramsId
          })
        })
    }

    handleRecievedBurst = response => {
        console.log(response)
        const {loc_x, loc_y} = response.animate_mo
        burst.tune({x: parseInt(loc_x), y: parseInt(loc_y)})
            .replay()
    }

    render() {
        return (
            <div className="canvas" onClick={this.handleClick} >
            <ActionCableConsumer
                        channel={{ 
                            channel: `PicturesChannel`, 
                            id: this.props.paramsId
                            }}
                        onReceived={this.handleRecievedBurst} 
                        onDisconnected={() => console.log("Disconnected!")}
                        onConnected={() => console.log("Connected!")}/>
            </div>
        )
    }
}

export default Canvas