
let interval = 100;
const fetch = require('node-fetch');
const Chance = require('chance');
const chance = new Chance();

setInterval(() => {
  console.log('paaaf')
  const period = chance.floating({ min: 0, max: 10 })
  const epoch = Math.floor(new Date() / 1000);
  fetch('http://server:6000/temperature', {
    method: 'POST',
    body: JSON.stringify({
      temperature: 20 * Math.sin(epoch * period) + 20,
    }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => console.log(res.status))
  .catch(err => console.error(err));
}, interval);