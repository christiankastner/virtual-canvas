import React from 'react';
import { connect } from 'react-redux'
import folds from "../../assets/Folds.mp3"
import {ReactComponent as Play} from "../../assets/play.svg"
import {ReactComponent as Pause} from "../../assets/pause.svg"
import p5 from 'p5';
import "./Canvas.scss"
import "p5/lib/addons/p5.sound";
import P5ReactAdapter from '../../constants/P5ReactAdapter'
import { API_WS_ROOT } from '../../constants/index'
const actioncable = require("actioncable")

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            connected: false,
            playing: false
        }
    }

    toggleConnection = () => {
        this.setState({connected: !this.state.connected})
    }

    componentDidMount() {
        this.cable = actioncable.createConsumer(API_WS_ROOT)
        this.myP5 = new p5 (this.sketch, this.myRef.current)
    }

    sketch = (p) => {
        let fft, analyzer;
        let extraCanvas;

        p.preload = () => {
            this.song = p.loadSound(folds)
        }
      
        p.setup = () => {
            p.createCanvas(this.myRef.current.offsetWidth, this.myRef.current.offsetHeight);

            extraCanvas = p.createGraphics(this.myRef.current.offsetWidth, this.myRef.current.offsetHeight);

            extraCanvas.clear();

            this.canvasChannel = this.cable.subscriptions.create({
                channel: `PicturesChannel`, 
                id: this.props.paramsId
            },{
                connected: () => {
                    console.log("connected!")
                    this.toggleConnection()
                },
                disconnected: () => this.toggleConnection(),
                received: data => {
                    if ('type' in data) {
                        this.props.dispatch(data)
                    } else if ('draw' in data) {
                        const {xOne, yOne, xTwo, yTwo} = data.draw
                        console.log(data.draw)
                        p.newDrawing(xOne, yOne,xTwo,yTwo)
                    }
            }})
            analyzer = new p5.Amplitude();
            fft = new p5.FFT();
      
            p.angleMode(p.DEGREES)
        };
        
        p.clearDrawing = () => {
            extraCanvas.clear()
        }

        p.newDrawing = (xOne,yOne,xTwo,yTwo) => {
            if (this.props.myBrush) {
                const {red, green, blue, weight} = this.props.myBrush
                extraCanvas.strokeWeight(weight)
                extraCanvas.stroke(`rgb(${red},${green},${blue})`)
                extraCanvas.line(xOne, yOne, xTwo, yTwo);
            }
        }

        p.windowResized = () => {
            if (this.myRef.current) {
                p.resizeCanvas(this.myRef.current.offsetWidth, this.myRef.current.offsetHeight); 
            }
        }
      

        p.mouseDragged = () => {
            if (this.props.selected === "paint") {
                p.newDrawing(p.pmouseX,p.pmouseY,p.mouseX,p.mouseY)
                this.canvasChannel.send({
                    canvas_id: this.props.paramsId,
                    draw: {
                        xOne: p.pmouseX,
                        yOne: p.pmouseY,
                        xTwo: p.mouseX,
                        yTwo: p.mouseY
                    }
                })
            }
        }

        p.loadSong = (song) => {
            this.uploadedAudio = p.loadSound(song, p.uploadedAudioPlay);
        }
      
        p.uploadedAudioPlay = (file) => {
            this.uploading = false;
        
            if (this.song.isPlaying()) {
                this.song.pause()
            }
            
            this.song = file

            this.song.play() 
            this.setState({playing: true})
        }
      
        p.toggleAudio = () => {
            if (this.song.isPlaying()) {
                if (this.song) {
                    this.song.pause();
                    this.setState({playing: false})
                }
            } else {
                this.song.play();
                this.setState({playing: true})
            }
        }
      
        p.draw = () => {
            const { background, mid_mapping_1, mid_mapping_2, treble_mapping_1, treble_mapping_2, bass_mapping_1, bass_mapping_2} = this.props.canvas
    
            p.background(`rgb(${background})`);

            p.image(extraCanvas, 0, 0)

            p.translate(p.width / 2, p.height / 2);

            p.level = analyzer.getLevel();
            fft.analyze();

            var bass = fft.getEnergy('bass');
            var treble = fft.getEnergy('treble');
            var mid = fft.getEnergy("mid");

            var mapMid = p.map(mid, 0, 255, mid_mapping_1, mid_mapping_2);
            var mapTreble = p.map(treble, 0, 255, treble_mapping_1, treble_mapping_2);
            var mapBass = p.map(bass, 0, 255, bass_mapping_1, bass_mapping_2);

            P5ReactAdapter.readFrequencyShapes( this.props.shapes, "treble", mapTreble, p)
            P5ReactAdapter.readFrequencyShapes( this.props.shapes, "mid", mapMid, p)
            P5ReactAdapter.readFrequencyShapes( this.props.shapes, "bass", mapBass, p)
        };
    }

    renderControls = () => {
        if (this.myP5) {
            return (
                    <div className="controls">
                        <h3>{this.props.loadedSong.name || "Folds.mp3"}</h3>
                        <button className="play-btn" onClick={this.myP5.toggleAudio} >
                            <Play className={this.state.playing ? "seen" : ""}/>
                            <Pause className={this.state.playing ? "" : "seen"} />
                        </button>
                        <button className="clear-btn btn-secondary" onClick={this.myP5.clearDrawing}>
                            Clear Drawing
                        </button>
                    </div>
                )
        } else {
            return ""
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loadedSong !== this.props.loadedSong) {
            this.myP5.loadSong(this.props.loadedSong.url)
        }
    }

    componentWillUnmount() {
        this.cable.disconnect()
        if (this.song && this.song.isPlaying()) {
            this.song.pause()
        }
        URL.revokeObjectURL(this.props.loadedSong)
        this.props.dispatch({type: "REMOVE_CANVAS"})
    }

    render() { 
        return (
            <div className="container">
                <div id="canvas" className="canvas" ref={this.myRef}/>
                {this.renderControls()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.user_id,
        canvas: state.canvas,
        selected: state.selected,
        loadedSong: state.loadedSong,
        shapes: state.canvasShapes,
        myBrush: state.myBrush
    }
}

export default connect(mapStateToProps)(Canvas)

