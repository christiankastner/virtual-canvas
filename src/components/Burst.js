import mojs from 'mo-js'

const burst = new mojs.Burst({
  origin:       '50% 50%',
  radius:   { 0: 100 },
  count: 5,
  timeline: {repeat: 999},
  children: {
        shape: 'polygon',
        fill:       { 'cyan' : 'yellow' },
        radius:     20,
        angle:      { 360: 0 },
        duration:   2000
      }
});

// new mojs.Shape({
//   shape:        'polygon',
//   points:       5,
//   stroke:       '#A8CABA',
//   scale:        { 0 : 1.5 },
//   angle:        { 0 : 180 },
//   fill:         { '#721e5f' : '#a5efce' },
//   radius:       25,
  
//   duration:     1500,
//   delay:        300,
//   isYoyo:       true,
//   repeat:       999
// });


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