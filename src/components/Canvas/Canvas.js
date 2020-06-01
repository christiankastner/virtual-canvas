import React from 'react';
import { connect } from 'react-redux'
import folds from "../../assets/Folds.mp3"
import {ReactComponent as Play} from "../../assets/play.svg"
import p5 from 'p5';
import "./Canvas.scss"
import "p5/lib/addons/p5.sound";
import P5ReactAdapter from '../../constants/P5ReactAdapter'
import { API_WS_ROOT } from '../../constants/index'
import firebase from '../../constants/firebase'
const actioncable = require("actioncable")

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            connected: false
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

            this.uploadBtn = p.createFileInput(p.uploaded)

            this.uploadBtn.addClass("p5-upload")

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
            // console.log(xOne,yOne,xTwo,yTwo)
            const {red, green, blue, weight} = this.props.myBrush
            extraCanvas.strokeWeight(weight)
            extraCanvas.stroke(`rgb(${red},${green},${blue})`)
            extraCanvas.line(xOne, yOne, xTwo, yTwo);
        }

        p.windowResized = () => {
            if (this.myRef.current) {
                p.resizeCanvas(this.myRef.current.offsetWidth, this.myRef.current.offsetHeight); 
            }
        }
      
        p.uploaded = file => {
            this.uploadLoading = true;

            const musicRef = firebase.storage().ref(`/music/canvas-${this.props.canvas.id}/${file.file.name}`)

            musicRef.put(file.file).then(() => {
                const storageRef = firebase.storage().ref(`/music/canvas-${this.props.canvas.id}`)
                storageRef.child(file.file.name).getDownloadURL()
                    .then((url) => {
                        const databaseRef = firebase.database().ref(`canvas-${this.props.canvas.id}`)
                        databaseRef.push({
                            songName: file.name,
                            url: url
                            })
                    })
                })
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
        }
      
        p.toggleAudio = () => {
            if (this.song.isPlaying()) {
                if (this.song) this.song.pause();
            } else {
            this.song.play();
            }
        }
      
        p.draw = () => {
            console.log(this.uploadBtn)
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
                        <button className="upload-btn btn-primary" onClick={this.myP5.uploaded} >
                            Upload a Song
                        </button>
                        <button className="play-btn" onClick={this.myP5.toggleAudio} >
                            <Play />
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
            this.myP5.loadSong(this.props.loadedSong)
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

