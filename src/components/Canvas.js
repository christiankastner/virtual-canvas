import React from 'react';
import mojs from 'mo-js';
import { connect } from 'react-redux'
import folds from '../folds.mp3'
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import P5ReactAdapter from '../constants/P5ReactAdapter'
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
        let fft, analyzer

        p.preload = () => {
            this.song = p.loadSound(folds)
        }
      
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
                    if ('type' in data) {
                        this.props.dispatch(data)
                    } else if ('draw' in data) {
                        p.newDrawing(data.draw.x, data.draw.y)
                    } else {
                        this.handleRecievedBurst(data)
                    } 
            }})
            analyzer = new p5.Amplitude();
            fft = new p5.FFT();
      
            p.angleMode(p.DEGREES)
        };

        p.newDrawing = (x,y) => {
            p.noStroke()
            p.fill(250)
            p.ellipse(x, y, 5,5);
        }
      
        p.uploaded = file => {
          this.uploadLoading = true;
          this.uploadedAudio = p.loadSound(file.data, p.uploadedAudioPlay);
        }

        p.mouseDragged = () => {
            if (this.props.selected === "paint") {
                this.canvasChannel.send({
                    canvas_id: this.props.paramsId,
                    draw: {
                        x: p.mouseX,
                        y: p.mouseY
                    }
                })
            }
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
      
        p.draw = () => {
    
            p.background(`rgb(${this.props.canvas.background})`);

            p.translate(p.width / 2, p.height / 2);

            p.level = analyzer.getLevel();
            fft.analyze();

            var bass = fft.getEnergy(100, 150);
            var treble = fft.getEnergy(150, 250);
            var mid = fft.getEnergy("mid");

            var mapMid = p.map(mid, 0, 255, -100, 200);
            var mapTreble = p.map(treble, 0, 255, 200, 350);
            var mapBass = p.map(bass, 0, 255, 50, 200);

            P5ReactAdapter.readFrequencyShapes( this.props.shapes, "treble", mapTreble, p)
            P5ReactAdapter.readFrequencyShapes( this.props.shapes, "mid", mapMid, p)
            P5ReactAdapter.readFrequencyShapes( this.props.shapes, "bass", mapBass, p)


        };
    }

    componentWillUnmount() {
        this.cable.disconnect()
        this.props.dispatch({type: "REMOVE_CANVAS"})
    }

    handleRecievedBurst = response => {
        const { id, tune } = response.animation
        this.props.bursts.find(animation => animation.id === id).burst.tune(tune).replay()
    }

    render() {
        return (
            <div id="canvas-container" onClick={this.handleClick} ref={this.myRef}>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        canvas: state.canvas,
        selected: state.selected,
        shapes: state.canvasShapes,
        bursts: state.canvasBursts > 0 ? state.canvasBursts.map(animation => {
            return {
                id: animation.id,
                burst: new mojs.Burst({
                    left: 0, top: 0,
                    count:   animation.count,
                    angle: {0: animation.angle},
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
        }) : []
    }
}

export default connect(mapStateToProps)(Canvas)

