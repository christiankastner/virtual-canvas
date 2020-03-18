import React from 'react'
import p5 from 'p5'
import P5ReactAdapter from "../../constants/P5ReactAdapter"

class CanvasImg extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    sketch = (p) => {
        const { background, mid_mapping_1, mid_mapping_2, treble_mapping_1, treble_mapping_2, bass_mapping_1, bass_mapping_2, p5_shapes} = this.props.canvas
        p.setup = () => {
            p.angleMode(p.DEGREES)
            p.createCanvas(400,200)
            p.background(`rgb(${background})`)
            p.translate(p.width / 2, p.height / 2);
            // const mapMid = p.map(0, 0, 255, mid_mapping_1, mid_mapping_2);
            // const mapTreble = p.map(0, 0, 255, treble_mapping_1, treble_mapping_2);
            // const mapBass = p.map(bass, 0, 255, bass_mapping_1, bass_mapping_2);

            P5ReactAdapter.readFrequencyShapes(p5_shapes, "treble", treble_mapping_1, p)
            P5ReactAdapter.readFrequencyShapes(p5_shapes, "mid", mid_mapping_1, p)
            P5ReactAdapter.readFrequencyShapes(p5_shapes, "bass", bass_mapping_1, p)
        }
    }

    componentDidMount() {
        this.myP5 = new p5 (this.sketch, this.myRef.current)
    }

    render() {
        return (
        <div ref={this.myRef}>
        </div>
        )
    }
}

export default CanvasImg