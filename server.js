const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const expressStatsd = require('express-statsd');

const Chance = require('chance');
const chance = new Chance();

const SDC = require('statsd-client');
const sdc = new SDC({host: 'graphite' });

app.use(expressStatsd({
  client: sdc,
}));

const port = 6000

app.use(bodyParser.json());

function statsd (path) {
  return function (req, res, next) {
    var method = req.method || 'unknown_method';
    req.statsdKey = ['http', method.toLowerCase(), path].join('.');
    next();
  };
}

app.post('/temperature', statsd('workshop'), (req, res) => {
  sdc.increment('numberOfRequests');
  const shouldICrash = chance.bool({ likelihood: 40 });

  if (shouldICrash) {
    res.status(500);
    res.end();
    return;
  }
  sdc.gauge('temperature', req.body.temperature);
  console.log(req.body.temperature)
  res.status(201);
  res.end();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))