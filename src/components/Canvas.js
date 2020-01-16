import React from 'react';
// import Sketch from './p5'
import mojs from 'mo-js';
import { connect } from 'react-redux'
import folds from '../folds.mp3'
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import { API_WS_ROOT } from '../constants/index'
const actioncable = require("actioncable")

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.myP5 = new p5 (this.sketch, this.myRef.current)
        this.cable = actioncable.createConsumer(API_WS_ROOT)
    }

    sketch = (p) => {
        let x = 100; 
        let y = 100;
      
        p.setup = () => {
          p.createCanvas(600, 600);
      
          this.toggleBtn = p.createButton("Play / Pause")
      
          this.uploadBtn = p.createFileInput(p.uploaded)
      
          this.uploadBtn.addClass("upload-btn")
      
          this.toggleBtn.addClass("toggle-btn");
      
          this.toggleBtn.mousePressed(p.toggleAudio);

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
                    } else if (!!data.draw) {
                        p.newDrawing(data.draw.x, data.draw.y)
                    } else {
                        this.handleRecievedBurst(data)
                    } 
            }})

        };

        p.newDrawing = (x,y) => {
            p.noStroke()
            p.fill(244)
            p.rect(x, y,50,50);
        }
      
        p.uploaded = file => {
          this.uploadLoading = true;
          this.uploadedAudio = p.loadSound(file.data, p.uploadedAudioPlay);
        }

        p.mouseDragged = () => {
            this.canvasChannel.send({
                canvas_id: this.props.paramsId,
                draw: {
                    x: p.mouseX,
                    y: p.mouseY
                }
            })
        }
      
        p.uploadedAudioPlay = (file) => {
          this.uploading = false;
      
          if (this.song.isPlaying()) {
            this.song.pause()
          }
      
          this.song = file
          this.song.play() 
        }
      
      p.toggleAudio = () => {
        if (this.song.isPlaying()) {
          this.song.pause();
        } else {
          this.song.play();
        }
      }
      
        p.draw = function() {
            p.noStroke()
            p.fill(255);
            p.rect(x,y,50,50);
        };
      }

    componentWillUnmount() {
        this.cable.disconnect()
        this.props.dispatch({type: "REMOVE_CANVAS"})
    }

    handleClick = e => {
        if (!!this.props.selectAnimation) {
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
        }
    }

    handleRecievedBurst = response => {
        const { id, tune } = response.animation
    
        this.props.bursts.find(animation => animation.id === id).burst.tune(tune).replay()
    }

    // setup = (p5, canvasParentRef) => {
    //     p5.createCanvas(600, 600).parent(canvasParentRef);
    //     p5.noFill();
    //     p5.stroke(255);
    // };

    // mouseDragged = p5 => {
    //     this.canvasChannel.send({
    //       canvas_id: this.props.paramsId,
    //       draw: {
    //         x: p5.mouseX,
    //         y: p5.mouseY
    //       }
    //     })
    //   }

    // draw = p5 => {
    //     p5.background(222);
    //     // var scl = p5.height/2;
    //     // var time = p5.frameCount * 0.1;
    
    //     // p5.beginShape();
    //     // for(var i = 0; i < p5.width; i++){
    //     // 	var y = p5.noise(i * 0.01, time*0.1) * scl*2 - scl;
    //     // 	p5.vertex(i, p5.height * 1/2 + y);	
    //     // }
    //   //   p5.endShape();
    //   };

    render() {
        return (
            <div id="canvas-container" onClick={this.handleClick} ref={this.myRef}>
                {/* <Sketch setup={this.setup} draw={this.draw} /> */}
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
                    angle: {0: animation.angle},
                    radius: {0: 100},
                    radius: {[animation.radius_1]: animation.radius_2},
                    children: {
                        shape: animation.shape,
                        fill:    animation.color,
                        radius:     20,
                        strokeWidth: animation.stroke_width,
                        duration:   animation.duration || 2000
                    }
                })
            }
        })
    }
}

export default connect(mapStateToProps)(Canvas)

