import mojs from 'mo-js'

const burst = new mojs.Burst({
    left: 0, top: 0,
    radius:   { 4: 19 },
    angle:    45,
    children: {
      shape:        'line',
      radius:       5,
      scale:        2,
      stroke:       '#FD7932',
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '100%' },
      duration:     1000,
       easing:       'quad.out',
    }
});

export default burst