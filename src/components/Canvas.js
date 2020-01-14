import React from 'react';
import mojs from 'mo-js';
import { connect } from 'react-redux'
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
            connected: () => {
                console.log("pictureChannel connected")
                // this.timeline = new mojs.Timeline({
                //     repeat: 999
                // })
            },
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
        this.canvasChannel.send({
            canvas_id: this.props.paramsId,
            tune : {
                x: e.pageX,
                y: e.pageY,
            }
        }, this.props.paramsId)
    }

    handleRecievedBurst = response => {
        // burst.tune(response.tune).replay()
    }

    render() {
        return (
            <div id="canvas-container" onClick={this.handleClick}>
                <SketchWrapper />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        canvas_animations: state.canvasAnimations.map(animation => new mojs.Burst({
            radius:   { 0: 100 },
            count: 5,
            children: {
                shape: animation.shape,
                fill:       { 'cyan' : 'yellow' },
                radius:     20,
                angle:      { 360: 0 },
                duration:   2000
              }
        }))
    }
}

export default connect(mapStateToProps)(Canvas)

