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

server.get('/loaderio-e2c41af736b42e5f9d0f29f36d6773b4', (req, res) => {
  res.send("loaderio-e2c41af736b42e5f9d0f29f36d6773b4")
})

server.listen(port, () => console.log(`Listening on port: ${port}`));
