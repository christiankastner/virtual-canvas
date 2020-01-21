class P5ReactAdapter {

    // Frequency takes in either 'treble', 'bass', or 'mid' as strings and the frequencyMapping parameter is supposed to be assigned the corresponding frequency mapping to sync with the music
    static readFrequencyShapes(array, frequency, frequencyMapping, p5) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].frequency === frequency) {
                    P5ReactAdapter.readJsonShape(array[i], frequencyMapping, p5)
            }
        }
    }

    static readJsonShape(json, frequencyMapping, p) {
        p.push()

        p.fill(`rgb(1,33,23)`)
        console.log(json.stroke)
        p.stroke(`rgb(${json.stroke})`)

        const {width, height, amount, spin, orbit, shape} = json
        p.rotate(orbit * p.frameCount)
        switch (shape) {
            case "rect":
                //This will allow the shape to rotate around its own axis
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i)
                        p.push()
                            p.translate(frequencyMapping,frequencyMapping)
                            p.rotate(spin * p.frameCount)
                            p.rectMode(p.CENTER)
                            p.rect(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "ellipse":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i)
                        p.push()
                            p.translate(frequencyMapping,frequencyMapping)
                            p.rotate(spin * p.frameCount)
                            p.ellipseMode(p.CENTER)
                            p.ellipse(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "triangle":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i)
                        p.push()
                            const center = 2 * height/3
                            p.translate(frequencyMapping, frequencyMapping)
                            p.rotate(spin * p.frameCount)
                            p.triangle(0, -center, width, height, -width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "line":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i)
                        p.push()
                            p.translate(frequencyMapping, frequencyMapping)
                            p.rotate(spin * p.frameCount)
                            p.line(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            default:
        }
        p.pop()
    }
}

export default P5ReactAdapter