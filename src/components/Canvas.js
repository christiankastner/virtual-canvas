import React from 'react';
import burst from "./Burst"
import { API_WS_ROOT, API_ROOT, HEADERS } from '../constants/index'
import SketchWrapper from './SketchWrapper';
const actioncable = require("actioncable")

class Canvas extends React.Component {

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
        })
    }

    componentWillUnmount() {
        this.cable.disconnect()
    }

    handleClick = e => {
        console.log("I clicked!")
        this.canvasChannel.send({
            canvas_id: this.props.paramsId,
            tune : {
                x: e.pageX,
                y: e.pageY,
            }
        }, this.props.paramsId)
    }

    handleRecievedBurst = response => {
        burst.tune(response.tune).replay()
    }

    render() {
        return (
            <div id="canvas-container" onClick={this.handleClick}>
                <SketchWrapper />
            </div>
        )
    }
}

export default Canvas