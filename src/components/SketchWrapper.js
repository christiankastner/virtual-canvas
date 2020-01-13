import React from 'react';
import Sketch from 'react-p5'
import Burst from './Burst'

class SketchWrapper extends React.Component {

  x = 50;
  y = 50;

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 600).parent(canvasParentRef);
    p5.noFill();
    p5.stroke(255);
  };

  draw = p5 => {
    p5.background(0,4);
	var scl = p5.height/2;
	var time = p5.frameCount * 0.1;

	p5.beginShape();
	for(var i = 0; i < p5.width; i++){
		var y = p5.noise(i * 0.01, time*0.1) * scl*2 - scl;
		p5.vertex(i, p5.height * 1/2 + y);	
	}
    p5.endShape();
  };

  render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} mouseClicked={this.props.mouseClicked} />
    )
  }
}

export default SketchWrapper