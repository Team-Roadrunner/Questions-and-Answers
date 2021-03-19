const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());

server.listen(port, () => console.log(`Listening on port: ${port}`));
