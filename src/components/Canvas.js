import React from 'react';
import Sketch from './p5'
import Burst from './Burst'
import mojs from 'mo-js';
import { connect } from 'react-redux'
import { API_WS_ROOT } from '../constants/index'
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
                console.log("Connected!")
            },
            disconnected: () => console.log("pictureChannel disconnected"),
            received: data => {
                if (!!data.type) {
                    this.props.dispatch(data)
                } else {
                    this.handleRecievedBurst(data)
                } 
        }})
    }

    componentWillUnmount() {
        this.cable.disconnect()
        this.stopBursts()
    }

    handleClick = e => {
        // if (!!this.props.selectAnimation) {
            this.canvasChannel.send({
                canvas_id: this.props.paramsId,
                animation: {
                    id: this.props.selectAnimation.id,
                    tune : {
                        x: e.pageX,
                        y: e.pageY,
                    }
                }
            })
        // }
    }

    stopBursts = () => {
        // ReactDOM.unmountComponentAtNode(this.myRef.current)
        this.props.dispatch({type: "REMOVE_CANVAS"})
    }

    handleRecievedBurst = response => {
        const { id, tune } = response.animation
    
        this.props.bursts.find(animation => animation.id === id).burst.tune(tune).replay()
    }

    setup = (p5, canvasParentRef) => {
        p5.createCanvas(600, 600).parent(canvasParentRef);
        p5.noFill();
        p5.stroke(255);
    };

    mouseDragged = p5 => {
        this.canvasChannel.send({
          canvas_id: this.props.paramsId,
          draw: {
            x: p5.mouseX,
            y: p5.mouseY
          }
        })
      }

    draw = p5 => {
        p5.background(222);
        // var scl = p5.height/2;
        // var time = p5.frameCount * 0.1;
    
        // p5.beginShape();
        // for(var i = 0; i < p5.width; i++){
        // 	var y = p5.noise(i * 0.01, time*0.1) * scl*2 - scl;
        // 	p5.vertex(i, p5.height * 1/2 + y);	
        // }
      //   p5.endShape();
      };

    render() {
        return (
            <div id="canvas-container" onClick={this.handleClick}ref={this.myRef}>
                {/* <BurstPlayer /> */}
                <Sketch setup={this.setup} draw={this.draw} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectAnimation: state.selectAnimation,
        bursts: state.canvasAnimations.map(animation => {
            return {
                id: animation.id,
                burst: new mojs.Burst({
                    left: 0, top: 0,
                    count:   animation.count,
                    radius: {0: 100},
                    children: {
                        shape: animation.shape,
                        fill:       { 'red' : 'yellow' },
                        radius:     20,
                        angle:      { 360: 0 },
                        duration:   3000
                    }
                })
            }
        })
    }
}

export default connect(mapStateToProps)(Canvas)

