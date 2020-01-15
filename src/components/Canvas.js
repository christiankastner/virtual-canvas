import React from 'react';
import BurstPlayer from './BurstPlayer'
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
                
            },
            disconnected: () => console.log("pictureChannel disconnected"),
            received: data => {
                if (!!data.type) {
                    this.props.dispatch(data)
                } else {
                    this.handleRecievedBurst(data)
                }
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

    stopBursts = () => {
        // ReactDOM.unmountComponentAtNode(this.myRef.current)
        this.props.dispatch({type: "REMOVE_CANVAS"})
    }

    handleRecievedBurst = response => {
       this.props.bursts[0].tune(response.tune).replay()
    }

    render() {
        return (
            <div id="canvas-container" onClick={this.handleClick} ref={this.myRef}>
                {/* <BurstPlayer /> */}
                <SketchWrapper />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bursts: state.canvasAnimations.map(animation => new mojs.Burst({
            left: 0, top: 0,
            radius:  { 0: 1 },
            count:   5,
            children: {
                shape: animation.shape,
                fill:       { 'cyan' : 'yellow' },
                radius:     20,
                angle:      { 360: 0 },
                duration:   3000
            }
        }))
    }
}

export default connect(mapStateToProps)(Canvas)

