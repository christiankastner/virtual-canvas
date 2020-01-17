const p = require("p5")

class P5ReactAdapter {
    constructor() {}


    // Frequency takes in either 'treble', 'bass', or 'mid' as strings and the frequencyMapping parameter is supposed to be assigned the corresponding frequency mapping to sync with the music
    static readFrequencyShapes(array, frequency, frequencyMaping) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].frequency === frequency) {
                P5ReactAdapter.readJsonShape(array[i])
            }
        }
    }

    static readJsonShape(json, frequencyMapping) {
        p.push()
        if ('fill' in json) {
            p.fill(json.fill)
        } else {
            p.noFill()
        }

        if ('stroke' in json) {
            p.stroke(json.stroke)
        } else {
            p.noStroke()
        }

        if ('rotate' in json) {
            p.rotate()
        }

        switch (json.shape.name) {
            case "rect":
                const {width, height} = json.shape
                p.rect(frequencyMapping, frequencyMapping, width, height)
                break;
            default:
        }
        p.pop()
    }
}

export default P5ReactAdapter