const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router.js')
const newRelic = require('newrelic');

const server = express();
const port = 3000;

server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());

server.use('/api', router)

server.get('/loaderio-971e0cd5e19f21dfabed1b3e64f52dfc', (req, res) => {
  res.send('loaderio-971e0cd5e19f21dfabed1b3e64f52dfc')
})

server.listen(port, () => console.log(`Listening on port: ${port}`));
