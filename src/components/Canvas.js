import React from 'react';
import ReactDOM from 'react-dom';
import mojs from 'mo-js';
import burst from './Burst'
import { connect } from 'react-redux'
import { API_WS_ROOT } from '../constants/index'
import SketchWrapper from './SketchWrapper';
const actioncable = require("actioncable")

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.cable = actioncable.createConsumer(API_WS_ROOT)
        this.canvasChannel = this.cable.subscriptions.create({
            channel: `PicturesChannel`, 
            id: this.props.paramsId
        },{
            connected: () => {
                console.log("pictureChannel connected")
                this.playBursts()
            },
            disconnected: () => console.log("pictureChannel disconnected"),
            received: data => {
                this.props.dispatch(data)
            }
        })
    }

    componentWillUnmount() {
        this.cable.disconnect()
        this.stopBursts()
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

    playBursts = () => {
        console.log(this.myRef.current)
        for (let i = 0; i < this.props.bursts.length; i++) {
            this.props.bursts[i].play()
        }
    }

    stopBursts = () => {
        // ReactDOM.unmountComponentAtNode(this.myRef.current)
        this.props.dispatch({type: "REMOVE_CANVAS"})
    }

    handleRecievedBurst = response => {
        this.playBursts()
    }

    render() {
        this.playBursts()
        return (
            <div id="canvas-container" onClick={this.handleClick} ref={this.myRef}>
                <SketchWrapper />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bursts: state.canvasAnimations.map(animation => new mojs.Burst({
            parent: document.getElementById("canvas-container"),
            origin:  '50% 50%',
            radius:  { 0: Math.floor(Math.random()*100) },
            count:   5,
            timeline: {repeat: 999},
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

