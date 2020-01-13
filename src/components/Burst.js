import mojs from 'mo-js'

const burst = new mojs.Burst({
    left: 0, top: 0,
    radius:   { 0: 100 },
    count: 5,
    children: {
          shape:      'polygon',
          fill:       { 'cyan' : 'yellow' },
          radius:     20,
          angle:      { 360: 0 },
          duration:   2000
        }
});

// const burst = new mojs.Burst({
//   radius:   { 0: 100 },
//   count:    5,
//   children: {
//     shape:      'polygon',
//     fill:       { 'cyan' : 'yellow' },
//     radius:     20,
//     angle:      { 360: 0 },
//     duration:   2000
//   }
// });
export default burst