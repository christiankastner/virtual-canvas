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

        p.fill(`rgb(${json.fill})`)
        p.stroke(`rgb(${json.stroke})`)

        const { width, height, amount, spin, orbit, shape, stagger_radius, stagger_place } = json
        const radius = frequencyMapping + stagger_radius
        p.rotate(orbit * p.frameCount/10)
        switch (shape) {
            case "rect":
                //This will allow the shape to rotate around its own axis
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount) * i + stagger_place)
                        p.push()
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
                            p.rectMode(p.CENTER)
                            p.rect(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "ellipse":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i + stagger_place)
                        p.push()
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
                            p.ellipseMode(p.CENTER)
                            p.ellipse(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "triangle":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i + stagger_place)
                        p.push()
                            const center = 2 * height/3
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
                            p.triangle(0, -center, width, height, -width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "line":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i + stagger_place)
                        p.push()
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
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