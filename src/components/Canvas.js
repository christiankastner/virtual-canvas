import React from 'react';
import burst from "./Burst"
import { ActionCableConsumer, ActionCableController } from 'react-actioncable-provider';
import { API_WS_ROOT, API_ROOT, HEADERS } from '../constants/index'
const actioncable = require("actioncable")

class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bursts: [],
        }
    }

    componentDidMount() {
        this.cable = actioncable.createConsumer(API_WS_ROOT)
        this.canvasChannel = this.cable.subscriptions.create({
            channel: `PicturesChannel`, 
            id: this.props.paramsId
        },{
            connected: () => console.log("pictureChannel connected"),
            disconnected: () => console.log("pictureChannel disconnected"),
            received: data => {
            console.log(data)
            this.handleRecievedBurst(data)
            }
        }
        )

    }

    handleClick = e => {
        console.log("I clicked!")
        this.canvasChannel.send({
            canvas_id: this.props.paramsId,
            loc_x: e.pageX,
            loc_y: e.pageY
        })
        
        // fetch(`${API_ROOT}/animate_mos`, {
        //   method: "POST",
        //   headers: HEADERS,
        //   body: JSON.stringify({
        //     loc_x: e.pageX,
        //     loc_y: e.pageY,
        //     user_id: 1,
        //     picture_id: this.props.paramsId
        //   })
        // })
    }

    handleRecievedBurst = response => {
        console.log(response)
        const {loc_x, loc_y} = response
        burst.tune({x: parseInt(loc_x), y: parseInt(loc_y)})
            .replay()
    }

    render() {
        return (
            <div className="canvas" onClick={this.handleClick} >
            {/* <ActionCableConsumer
                        channel={{ 
                            channel: `PicturesChannel`, 
                            id: this.props.paramsId
                            }}
                        onReceived={this.handleRecievedBurst} 
                        onDisconnected={() => console.log("Disconnected!")}
                        onConnected={() => console.log("Connected!")}/> */}
            </div>
        )
    }
}

export default Canvas